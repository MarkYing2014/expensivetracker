'use server'

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function deleteTransaction(id: string) {
    try {
        const session = await auth();
        const userId = session?.userId;

        if (!userId) {
            return { error: "Unauthorized" };
        }

        await db.transaction.delete({
            where: {
                id,
                userId // Make sure user can only delete their own transactions
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return { error: "Failed to delete transaction" };
    }
}
