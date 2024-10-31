'use server'

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export default async function getTransactions() {
    try {
        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return { transactions: [] };
        }

        const transactions = await db.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });

        return { transactions };
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return { transactions: [] };
    }
}
