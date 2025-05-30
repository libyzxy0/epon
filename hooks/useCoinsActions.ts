import {
  useSQLiteContext
} from "expo-sqlite";
import {
  useCoinStore
} from "@/store/useCoinStore";

export function useCoinActions() {
  const db = useSQLiteContext();
  const {
    coins,
    currency,
    setCoins
  } = useCoinStore();

  const fetchCoins = async () => {
    const coin = await db.getFirstAsync("SELECT * FROM coins;");
    setCoins({
      coins: coin.amount,
      currency: coin.currency,
      short_currency: coin.short_currency,
      started_at: coin.started_at,
      last_update: coin.last_update
    });
  };

  const saveCoin = async (amount: number) => {
    const newAmount = coins + amount;
    const now = () => new Date().toLocaleString('sv-SE').replace(' ', 'T') + '.' + String(new Date().getMilliseconds()).padStart(3, '0');

    if (typeof amount == "number") {
      await db.runAsync(
        `UPDATE coins SET amount = ?, last_update = ?`,
        newAmount,
        now()
      );

      setCoins({
        coins: newAmount, last_update: now
      });

      const statement = await db.prepareAsync(
        "INSERT INTO transactions (name, description, transaction_type, amount, created_at) VALUES ($name, $description, $transaction_type, $amount, $created_at)"
      );

      try {
        let result = await statement.executeAsync({
          $name: "Save money",
          $description: `Saves ${currency}${amount} amount of money at ${new Date(now()).toLocaleDateString('en-US', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
          })}`,
          $transaction_type: "save",
          $amount: amount,
          $created_at: now()
        });
        await statement.finalizeAsync();

        console.log(result)
      } catch (error) {
        console.log("Failed to create transaction:", error)
      }

    }
  };

  const useCoin = async (amount: number, note: string) => {
    if (coins < amount) {
      return {
        success: false,
        error: "Insufficient coins"
      };
    }

    const newAmount = coins - amount;
    const now = new Date().toISOString();

    await db.runAsync(
      `UPDATE coins SET amount = ?, last_update = ? WHERE id = 1;`,
      newAmount,
      now
    ); /* Safe? probably not (: */


    const statement = await db.prepareAsync(
      "INSERT INTO transactions (name, description, transaction_type, amount, created_at) VALUES ($name, $description, $transaction_type, $amount, $created_at)"
    );

    try {
      let result = await statement.executeAsync({
        $name: "Use money",
        $description: `Uses ${currency}${amount} amount of money at ${new Date(now()).toLocaleDateString('en-US', {
          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        })} NOTE: ${note}`,
        $transaction_type: "use",
        $amount: amount,
        $created_at: now()
      });
      await statement.finalizeAsync();
    } catch (error) {
      console.log("Failed to create transaction:", error)
    }

    setCoins({
      coins: newAmount, last_update: now
    });

    return {
      success: true,
      error: null
    };
  };

  return {
    fetchCoins,
    saveCoin,
    useCoin
  };
}