import { Text, View } from '@/components/Themed'
import { useTransactionsStore } from '@/store/useTransactionsStore'

export default function About() {
  const { transactions } = useTransactionsStore();
  return (
    <View>
      <Text>{transactions ? JSON.stringify(transactions) : "Loading..."}</Text>
    </View>
  )
}