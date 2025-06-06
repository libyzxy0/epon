import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import {
  useCoinStore
} from "@/store/useCoinStore";
import {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  useSQLiteContext
} from "expo-sqlite";
import dayjs from 'dayjs';
import Feather from '@expo/vector-icons/Feather';
import {
  useRouter
} from 'expo-router'

type Transaction = {
  id: string;
  name: string;
  description: string;
  amount: number;
  transaction_type: 'save' | 'use';
  created_at: string;
}

export default function Transactions() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const {
    coins,
    short_currency
  } = useCoinStore();
  const db = useSQLiteContext();

  const [transactions,
    setTransactions] = useState < Transaction[] > ([]);
  const [loading,
    setLoading] = useState(true);
  const [refreshing,
    setRefreshing] = useState(false);
  const router = useRouter();

  const loadTransactions = useCallback(async () => {
    try {
      const transacs = await db.getAllAsync('SELECT * FROM transactions ORDER BY created_at DESC;');
      const formattedTransacs = transacs.map(t => ({
        ...t,
        created_at: t.created_at ? dayjs(t.created_at).fromNow(): 'Unknown date'
      }));
      setTransactions(formattedTransacs);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [db]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions, coins]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTransactions();
  }, [loadTransactions]);

  const renderTransaction = ({
    item: transaction, index
  }: {
    item: Transaction, index: number
  }) => (
    <TouchableOpacity
      style={ {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: index !== transactions.length - 1 ? colors.border + 'AA': 'transparent',
        backgroundColor: colors.background
      }}
      activeOpacity={0.7}
      >
      <View style={ {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: transaction.transaction_type === 'save' ? colors.primary.default + '20': colors.red.default + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
      }} transparent>
        <Feather
          name={transaction.transaction_type === 'save' ? 'arrow-down': 'arrow-up'}
          size={18}
          color={transaction.transaction_type === 'save' ? colors.primary.default: colors.red.default}
          />
      </View>

      <View style={ { flex: 1 }} transparent>
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 16,
            color: colors.text,
            marginBottom: 4
          }}
          >
          {transaction.name}
        </Text>
        <Text
          style={ {
            fontFamily: "Poppins",
            fontSize: 13,
            color: colors.textSecondary,
            marginBottom: 2
          }}
          >
          {transaction.description}
        </Text>
        <Text
          style={ {
            fontFamily: "Poppins",
            fontSize: 12,
            color: colors.textSecondary
          }}
          >
          {transaction.created_at}
        </Text>
      </View>

      <View transparent>
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 16,
            color: transaction.transaction_type === 'save' ? colors.primary.default: colors.red.default
          }}
          >
          {`${transaction.transaction_type === 'save' ? '+': '-'}${short_currency}${Math.abs(transaction.amount).toFixed(2)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={ {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 100
    }} transparent>
      <Feather name="credit-card" size={48} color={colors.textSecondary} />
      <Text style={ {
        fontFamily: 'PoppinsBold',
        fontSize: 18,
        color: colors.text,
        marginTop: 16,
        marginBottom: 8
      }}>
        No Transactions Yet
      </Text>
      <Text style={ {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 40
      }}>
        Your transaction history will appear here once you start saving or using coins.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={ {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 16
    }} transparent>
      <Text style={ {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: colors.textSecondary
      }}>
        {transactions.length} {transactions.length === 1 ? 'transaction': 'transactions'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={ {
        flex: 1,
        backgroundColor: colors.background
      }}><View style={ {
          paddingHorizontal: 15,
          paddingVertical: 30,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8
        }}>
        <TouchableOpacity onPress={() => router.navigate('/')} activeOpacity={0.7}>
          <Feather name="chevron-left" size={30} color={colors.text} />
        </TouchableOpacity>
        <Text style={ {
          fontFamily: 'PoppinsBold',
          fontSize: 22,
          marginTop: 4,
          color: colors.text
        }}>All Transactions</Text>
      </View>

        <View style={ {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }} transparent>
          <ActivityIndicator size="large" color={colors.primary.default} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={ {
      flex: 1,
      backgroundColor: colors.background
    }}>
      <View style={ {
        paddingHorizontal: 15,
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
      }}>
        <TouchableOpacity onPress={() => router.navigate('/')} activeOpacity={0.7}>
          <Feather name="chevron-left" size={30} color={colors.text} />
        </TouchableOpacity>
        <Text style={ {
          fontFamily: 'PoppinsBold',
          fontSize: 22,
          marginTop: 4,
          color: colors.text
        }}>All Transactions</Text>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={transactions.length > 0 ? renderHeader: null}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary.default]}
          tintColor={colors.primary.default}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ {
          flexGrow: 1,
          paddingBottom: 20
        }}
        ItemSeparatorComponent={() => <View style={ { height: 1 }} />}
        />
    </SafeAreaView>
  );
}