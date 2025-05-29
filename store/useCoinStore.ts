import { create } from 'zustand'

type Wishes = {
  name: string;
  price: number;
  description: string;
  currency: string;
  short_currency: string;
  image: string | null;
}

type CoinStore = {
  coins: number;
  currency: string;
  short_currency: string;
  useCoin: (amount: number, note: string) => void;
  saveCoin: (amount: number) => void;
}

export const useCoinStore = create<CoinStore>((set) => ({
  coins: 0,
  currency: "PHP",
  short_currency: "₱",
  useCoin: (amount: number, note: number) => {
    set((state) => ({ coins: state.coins - amount}));
  },
  saveCoin: (amount: number) => {
    set((state) => ({ coins: state.coins + amount}));
  }
}))