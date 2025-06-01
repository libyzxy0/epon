import {
  useSQLiteContext
} from "expo-sqlite";
import {
  useCoinStore
} from "@/store/useCoinStore";
import { now } from '@/utils/getDeviceTime'

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
          $name: "Save coin",
          $description: `Saves ${currency}${amount} amount of money at ${new Date(now()).toLocaleDateString('en-US', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
          })}`,
          $transaction_type: "save",
          $amount: amount,
          $created_at: now()
        });
        await statement.finalizeAsync();

        return {
          success: true,
          error: null
        }
      } catch (error) {
        return {
          success: false,
          error: error?.message || "Failed to create transaction."
        }
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

    await db.runAsync(
      `UPDATE coins SET amount = ?, last_update = ?`,
      newAmount,
      now()
    ); /* Safe? probably not (: */


    const stmt = await db.prepareAsync(
      "INSERT INTO transactions (name, description, transaction_type, amount, created_at) VALUES ($name, $description, $transaction_type, $amount, $created_at)"
    );

    try {
      let result = await stmt.executeAsync({
        $name: "Use coin",
        $description: note ? note : `Use ${currency}${amount} coin.`,
        $transaction_type: "use",
        $amount: amount,
        $created_at: now()
      });
      await stmt.finalizeAsync();
      return {
        success: true,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Failed to create transaction."
      }
    } finally {
      setCoins({
        coins: newAmount, last_update: now()
      })
    }
  };

  return {
    fetchCoins,
    saveCoin,
    useCoin
  };
}