import {
  Text,
  View
} from "@/components/Themed";
import {
  Pressable,
  Alert,
  ScrollView
} from "react-native";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import {
  useEffect,
  useState
} from "react";
import Colors from "@/constants/Colors";
import {
  useSQLiteContext,
  type SQLiteDatabase
} from "expo-sqlite";
import {
  useCoinStore
} from '@/store/useCoinStore'

export default function About() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const db = useSQLiteContext();
  const [version,
    setVersion] = useState("");
  const [transactions,
    setTransactions] = useState([]);
  const [coin,
    setCoin] = useState({});
  const [wishlist,
    setWishlist] = useState([]);
    
  useEffect(() => {
    async function setup() {
      const ver = await db.getFirstAsync < {
        "sqlite_version()": string;
      } > ("SELECT sqlite_version()");
      setVersion(ver["sqlite_version()"]);
      
      const coin = await db.getFirstAsync("SELECT * from coins;");
      setCoin(coin);
      
      const transactions = await db.getAllAsync('SELECT * FROM transactions;');
      setTransactions(transactions)
      const wishlist = await db.getAllAsync('SELECT * FROM wishlist;');
      setWishlist(wishlist)
    }
    setup();
  }, []);
  const handleButtonClick = async () => {};
  return (
    <View
      style={ {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
      }}
      >
      <ScrollView>
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 23,
            marginTop: 20
          }}
          >
          Database Data
        </Text>

        <Text
          style={ {
            paddingVertical: 20,
            color: colors.yellow['default'],
            fontFamily: 'PoppinsBold',
          }}
          >
           {"SQLite Version: " + version}
        </Text>
        <Text
          style={ {
            paddingVertical: 20,
            color: colors.red['default']
          }}
          >
          <Text style={{
            fontFamily: 'PoppinsBold',
            color: colors.red['default']
          }}>Transactions {" "}</Text>
          {(JSON.stringify(transactions, null, 2) + "\n")}
        </Text>
        <Text
          style={ {
            paddingVertical: 20,
            color: colors.blue['default']
          }}
          >
          <Text style={{
            fontFamily: 'PoppinsBold',
            color: colors.blue['default']
          }}>Wishlist {" "}</Text>
          {(JSON.stringify(wishlist, null, 2) + "\n")}
        </Text>
        <Text
          style={ {
            paddingVertical: 20,
            color: colors.primary['default']
          }}
          >
          <Text style={{
            fontFamily: 'PoppinsBold',
            color: colors.primary['default']
          }}>Coin {" "}</Text>
          {(JSON.stringify(coin, null, 2) + "\n")}
        </Text>
      </ScrollView>
    </View>
  );
}