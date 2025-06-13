import {
  type SQLiteDatabase
} from "expo-sqlite";
import {
  migrations
} from "@/database/migrations";
import {
  seedCoins
} from "@/database/seeders";
import {
  DATABASE_NAME
} from "@/database/config";

export const migrateDB = async (db: SQLiteDatabase) => {
  if (db) {
    for(let i = 0;i < migrations.length;i++) {
      await db.execAsync(migrations[i].sql);
      /* console.log(`Migration '${migrations[i].description}' executed!`) */
    }

    await seedCoins(db);
  }
}