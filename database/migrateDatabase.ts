import {
  type SQLiteDatabase
} from "expo-sqlite";
import {
  migrations
} from "@/database/migrations";
import {
  DATABASE_NAME
} from "@/database/config";
import {
  now
} from '@/utils/getDeviceTime'

export const migrateDB = async (db: SQLiteDatabase) => {
  if (db) {
    const {
      create_coin_table,
      create_transactions_table,
      create_wishlist_table
    } = migrations;
    await db.execAsync(create_coin_table);
    await db.execAsync(create_transactions_table);
    await db.execAsync(create_wishlist_table);

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
  }
}