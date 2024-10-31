import getTransactions from "@/app/actions/getTransactions";
import TransactionItem from "./TransactionItem";

export default async function TransactionList() {
    const { transactions = [] } = await getTransactions() ?? {};

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">History</h3>
            <ul className="list">     
                {transactions && transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <TransactionItem 
                            key={transaction.id}
                            id={transaction.id}
                            text={transaction.text}
                            amount={transaction.amount}
                        />
                    ))
                ) : (
                    <li className="text-gray-500">No transactions found</li>
                )}
            </ul>
        </div>
    );
}