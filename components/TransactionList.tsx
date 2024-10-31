import { Transaction } from "@/types/transaction";
import getTransactions from "@/app/actions/getTransactions";

export default async function TransactionList() {
    const { transactions = [] } = await getTransactions() ?? {};

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">History</h3>
            <ul className="list">     
                {transactions && transactions.length > 0 ? (
                    transactions.map((transaction: Transaction) => (
                        <li 
                            key={transaction.id}
                            className={transaction.amount > 0 ? "plus" : "minus"}
                        >
                            <p>{transaction.text}</p>
                            <div>
                                <span>${Math.abs(transaction.amount).toFixed(2)}</span>
                                <button className="delete-btn">x</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No transactions found</li>
                )}
            </ul>
        </div>
    );
}