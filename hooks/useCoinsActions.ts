import { useSQLiteContext } from "expo-sqlite";
import { useCoinStore } from "@/store/useCoinStore";

export function useCoinActions() {
    const db = useSQLiteContext();
    const { coins, setCoins } = useCoinStore();

    const fetchCoins = async () => {
        const coin = await db.getFirstAsync("SELECT * FROM coins;");
        setCoins({
            coins: coin.amount,
            currency: coin.currency,
            short_currency: coin.short_currency,
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
        }

        setCoins({ coins: newAmount, last_update: now });
    };

    const useCoin = async (amount: number, note: string) => {
        if (coins < amount) {
            return { success: false, error: "Insufficient coins" };
        }

        const newAmount = coins - amount;
        const now = new Date().toISOString();

        await db.runAsync(
            `UPDATE coins SET amount = ?, last_update = ? WHERE id = 1;`,
            newAmount,
            now
        );

        setCoins({ coins: newAmount, last_update: now });

        return { success: true, error: null };
    };

    return { fetchCoins, saveCoin, useCoin };
}
