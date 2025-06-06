import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import Feather from '@expo/vector-icons/Feather';
import {
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  useCoinStore
} from "@/store/useCoinStore";
import {
  useState,
  useEffect
} from 'react'
import {
  useSQLiteContext
} from "expo-sqlite";
import dayjs from 'dayjs';
import { useRouter } from 'expo-router'

type Transaction = {
  id: string;
  name: string;
  description: string;
  amount: number;
  transaction_type: 'save' | 'use';
  created_at: string;
}

export function RecentTransactions() {
  const colors = Colors[(useColorScheme() ?? "light")];
  const router = useRouter()
  const {
    coins,
    short_currency
  } = useCoinStore();
  const db = useSQLiteContext();

  const [transactions,
    setTransactions] = useState();
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const transacs = await db.getAllAsync('SELECT * FROM transactions ORDER BY created_at DESC LIMIT 5;');
        const formattedTransacs = transacs.map(t => ({
          ...t,
          created_at: t.created_at ? dayjs(t.created_at).fromNow(): 'Unknown date'
        }))
        setTransactions(formattedTransacs);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };
    loadTransactions();
  }, [coins]);

  const renderTransaction = (transaction: Transaction, index: number) => (
    <TouchableOpacity
      key={transaction.id}
      style={ {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: index != transactions.length - 1 ? colors.border + 'AA': 'transparent'
      }}
      activeOpacity={0.7}
      >

      <View style={ { flex: 1 }} transparent>
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 14,
            color: colors.text,
            marginBottom: 2
          }}
          >
          {transaction.name}
        </Text>
        <Text
          style={ {
            fontFamily: "Poppins",
            fontSize: 12,
            color: colors.textSecondary
          }}
          >
          {transaction.description} • {transaction.created_at}
        </Text>
      </View>

      <View transparent>
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 14,
            color: transaction.transaction_type === 'save' ? colors.primary.default: colors.red.default
          }}
          >
          {`${transaction.transaction_type === 'save' ? '+': '-'}${short_currency}${Math.abs(transaction.amount).toFixed(2)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
    {
      transactions && transactions.length !== 0 && (
        <View style={ {
          marginTop: 20,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 9,
          backgroundColor: colors.card
        }}>
          <View transparent
            style={ {
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
              marginBottom: 10
            }}
            activeOpacity={0.7}
            >
            <View transparent>
              <Text
                style={ {
                  fontFamily: "PoppinsBold",
                  fontSize: 16,
                  color: colors.text
                }}
                >
                Recent Transactions
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/transactions')} avtiveOpacity={0.7} transparent>
              <Feather name="external-link" size={21} color={colors.primary.default} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {transactions && transactions.map((t, i) => renderTransaction(t, i))}
          </ScrollView>
        </View>
      )}
        </>
  );
}