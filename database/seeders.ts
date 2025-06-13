import { type SQLiteDatabase } from "expo-sqlite";
import { now } from "@/utils/getDeviceTime";

export const seedCoins = async (db: SQLiteDatabase) => {
    const coin = await db.getFirstAsync("SELECT * FROM coins;");
    if (coin === null) {
        await db.runAsync(
            `INSERT INTO coins (amount, currency, short_currency, started_at, last_update) VALUES (?, ?, ?, ?, ?)`,
            0,
            "PHP",
            "₱",
            now(),
            now()
        );
        console.log("Coin initialized!");
    }
};
