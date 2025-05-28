import { db } from "@/db/sqllite";
import { create } from "zustand";

type TransactionType = {
    id: string;
    name: string;
    description: string;
    amount: string;
    type: string;
    coin_type: string;
    created_at: string;
};

type TransactionStoreType = {
    transactions: TransactionType[];
    fetchAllTransactions: () => Promise<void>;
    createTransaction: () => Promise<{ success: boolean; id: string; }>;
};
export const useTransactionsStore = create<TransactionStoreType>(set => ({
    transactions: [],
    fetchAllTransactions: async () => {
        const result = await db.execAsync("SELECT * FROM transactions;");
        set(() => ({ transactions: result }));
    },
    createTransaction: async ({
        name,
        type,
        coin_type,
        amount,
        created_at,
        description
    }) => {
        const statement = await db.prepareAsync(`
    CREATE TABLE IF NOT EXIST transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, type TEXT, coin_type TEXT, amount INTEGER, created_at TEXT, description TEXT);
    INSERT INTO transactions (name, type, coin_type, amount, created_at, description) VALUES ($name, $type, $coin_type, $amount, $created_at, $description)
    `);

        const result = await statement.executeAsync({
            $name: name,
            $type: type,
            $coin_type: coin_type,
            $amount: amount,
            $created_at: created_at,
            $description: description
        });
        console.log("Inserted:", result.lastInsertRowId, result.changes);
        return {
          success: result ? true : false,
          id: result.lastInsertRowId
        }
    }
}));
