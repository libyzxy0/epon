import { create } from "zustand";

type WishlistType = {
    id: string;
    name: string;
    description: string;
    price: number;
    is_bought: boolean;
    created_at: string;
};

type WishlistStoreType = {
    wishlist: WishlistType[];
    setWishlist: (data: Partial<WishlistType>) => void;
};

export const useWishlistStore = create<WishlistStoreType>(set => ({
    wishlist: [],
    setWishlist: data => set(() => ({ wishlist: data }))
}));
