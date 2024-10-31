'use server';

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";


export default async function getUserBalance(): Promise<{
    balance?: number;
    error?: string;
}> 

{
    const session = await auth();
    const userId = session?.userId;

    if (!userId) {
        return {
            error: "User not authenticated"
        };      
    }
try {
    const transactions = await db.transaction.findMany({
        where: {userId}
    });
    const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
        return { balance };
    } catch{
        return {
            error: "Failed to fetch user balance"
        };
    }   
}
