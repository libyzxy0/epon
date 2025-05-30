import { useSQLiteContext } from "expo-sqlite";
import { useWishlistStore } from "@/store/useWishlistStore";

export function useWishlistActions() {
    const db = useSQLiteContext();
    const { setWishlist } = useWishlistStore();

    const fetchWishlist = async () => {
        const wishlistData = await db.getAllAsync("SELECT * FROM wishlist;");
        
        console.log(wishlistData)

        const safe = wishlistData.map(w => ({
            ...w,
            is_bought: w.is_bought == 1
        }));
        setWishlist(safe);
    };

    const makeAWish = async ({
        name,
        description,
        price
    }): Promise<{ sucess: boolean; error: string }> => {
        const now = () =>
            new Date().toLocaleString("sv-SE").replace(" ", "T") +
            "." +
            String(new Date().getMilliseconds()).padStart(3, "0");
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
            console.log(error);
            return {
                success: false,
                error: error?.message || "Failed to make a wish dude!"
            };
        }
    };

    return { fetchWishlist, makeAWish };
}
