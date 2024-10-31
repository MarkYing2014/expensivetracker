import Guest from "@/components/Guest";
import { auth, currentUser } from "@clerk/nextjs";
import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import IncomeExpense from "@/components/IncomeExpense";
import TransactionList from "@/components/TransactionList";

export default async function Home() {
  const authResult = await auth();
  const { userId } = authResult ?? {};
  const user = await currentUser();
  if (!userId) return <Guest />;

  return (
    <main className="bg-white min-h-screen p-4">
      <h1 className="text-4xl font-bold text-center mb-4">Expense Tracker</h1>
      <div className="text-center mb-4">Welcome {user?.firstName}</div>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </main>
  );
}
