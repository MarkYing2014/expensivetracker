'use server';

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function getIncomeExpense() {
    try {
        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return { income: 0, expense: 0 };
        }

        const transactions = await db.transaction.findMany({
            where: { userId }
        });

        const income = transactions
            .filter(transaction => transaction.amount > 0)
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const expense = transactions
            .filter(transaction => transaction.amount < 0)
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        return { income, expense };
    } catch (error) {
        console.error('Error fetching income/expense:', error);
        return { income: 0, expense: 0 };
    }
}
