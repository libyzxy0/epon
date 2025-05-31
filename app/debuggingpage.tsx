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
  const {
    coins
  } = useCoinStore();

  const [version,
    setVersion] = useState("");
  const [data,
    setData] = useState();
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync < {
        "sqlite_version()": string;
      } > ("SELECT sqlite_version()");
      setVersion(result["sqlite_version()"]);
      const allRows = await db.getAllAsync('SELECT * FROM transactions;');
      setData(allRows)
    }
    setup();
  }, []);
  const handleButtonClick = async () => {};
  return (
    <View
      style={ {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
      >
      <ScrollView>
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 23
          }}
          >
          Simple Test Data
        </Text>

        <Text
          style={ {
            paddingVertical: 20,
            color: colors.red['default']
          }}
          >
          {"Version: " + version}
          {"\nData:" + (JSON.stringify(data, null, 2) + "\n")}
          {"\nCoins:" + coins}
        </Text>

        <Pressable
          onPress={handleButtonClick}
          style={ {
            borderWidth: 2,
            borderColor: colors["blue"]['lowOpacity'],
            backgroundColor: colors["blue"][50],
            borderRadius: 9,
            paddingHorizontal: 18,
            paddingVertical: 6,
            margin: 5,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10
          }}
          >
          <Text
            style={ {
              fontSize: 16,
              color: colors["blue"]['default'],
              paddingRight: 2,
              paddingTop: 1.5,
              fontFamily: "PoppinsBold"
            }}
            >
            Click Me
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}