'use client';

import { deleteTransaction } from "@/app/actions/deleteTransaction";
import { useRouter } from "next/navigation";

interface TransactionItemProps {
    id: string;
    text: string;
    amount: number;
}

export default function TransactionItem({ id, text, amount }: TransactionItemProps) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await deleteTransaction(id);
            if (result.success) {
                // Force a full refresh of all server components
                router.refresh();
            } else {
                console.error('Failed to delete:', result.error);
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    return (
        <li className={amount > 0 ? "plus" : "minus"}>
            <p>{text}</p>
            <div>
                <span>${Math.abs(amount).toFixed(2)}</span>
                <button 
                    onClick={handleDelete} 
                    className="delete-btn"
                >
                    x
                </button>
            </div>
        </li>
    );
} 