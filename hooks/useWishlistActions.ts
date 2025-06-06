import {
  useSQLiteContext
} from "expo-sqlite";
import {
  useWishlistStore
} from "@/store/useWishlistStore";
import {
  now
} from '@/utils/getDeviceTime'
import {
  useCoinActions
} from "@/hooks/useCoinsActions";
import { useState } from 'react'

export function useWishlistActions() {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const {
    useCoin
  } = useCoinActions();
  const {
    setWishlist
  } = useWishlistStore();

  const fetchWishlist = async () => {
    setLoading(true);
    const wishlistData = await db.getAllAsync("SELECT * FROM wishlist;");

    const safe = wishlistData.map(w => ({
      ...w,
      is_bought: w.is_bought == 1
    }));
    setWishlist(safe);
    setLoading(false);
  };

  const removeWish = async (id) => {
    const stmt = await db.prepareAsync(
      "DELETE FROM wishlist WHERE id = $id"
    );
    try {
      let result = await stmt.executeAsync({
        $id: id
      });
      await stmt.finalizeAsync();
      fetchWishlist();
      console.log(result)
      return {
        success: true,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Failed to remove wish dude!"
      };
    }
  }

  const markAsBought = async (id: string, bought: boolean, price: number, name: string) => {
    try {
      await db.runAsync(
        `UPDATE wishlist SET is_bought = ? WHERE id = ?`,
        bought ? 1: 0,
        id
      );

      await useCoin(price, `Bought ${name}`);

      fetchWishlist();
      return {
        success: true,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Failed to remove wish dude!"
      };
    }
  }

  const makeAWish = async ({
    name,
    description,
    price
  }): Promise < {
    sucess: boolean; error: string
  } > => {
    const statement = await db.prepareAsync(
      "INSERT INTO wishlist (name, description, is_bought, price, created_at) VALUES ($name, $description, $is_bought, $price, $created_at)"
    );
    try {
      let result = await statement.executeAsync({
        $name: name,
        $description: description,
        $is_bought: 0,
        $price: price,
        $created_at: now()
      });
      await statement.finalizeAsync();
      fetchWishlist();
      return {
        success: true,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Failed to make a wish dude!"
      };
    }
  };

  return {
    fetchWishlist,
    makeAWish,
    removeWish,
    markAsBought,
    loading,
    setLoading
  };
}