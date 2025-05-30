import { create } from "zustand";

type CoinState = {
    coins: number;
    currency: string;
    short_currency: string;
    last_update: string;
    started_at: string;
    setCoins: (data: Partial<CoinState>) => void;
};

export const useCoinStore = create<CoinState>((set) => ({
    coins: 0,
    currency: "",
    short_currency: "",
    last_update: "",
    started_at: "",
    setCoins: (data) => set((state) => ({ ...state, ...data }))
}));
