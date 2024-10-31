"use server";

import {auth} from "@clerk/nextjs/server";  
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionPayload {
    text: string;
    amountStr: string;
}


interface TransactionResult {
    success: boolean;
    error?: string;
}

export default async function addTransaction(payload: TransactionPayload | null): Promise<TransactionResult> {
    try {
        // Early return if payload is null
        if (!payload) {
            return {
                success: false,
                error: 'Payload is required'
            };
        }

        // Type guard to ensure payload is TransactionPayload
        const isValidPayload = (p: unknown): p is TransactionPayload => {
            return Boolean(
                p && 
                typeof p === 'object' && 
                p !== null &&
                'text' in p && 
                'amountStr' in p
            );
        };
        
        if (!isValidPayload(payload)) {
            return {
                success: false,
                error: 'Invalid payload structure'
            };
        }

        const { text, amountStr } = payload;
        
        // Validate inputs first
        if (!text || !amountStr) {
            return {
                success: false,
                error: "Invalid input"
            };
        }

        const amount = parseFloat(amountStr);
        if (isNaN(amount)) {
            return {
                success: false,
                error: "Invalid amount"
            };
        }

        const { userId } = auth() ?? {};
        
        if (!userId) {
            return {
                success: false,
                error: "User not authenticated"
            };
        }

        await db.transaction.create({
            data: {
                text,
                amount,
                userId
            }
        });

        revalidatePath("/");

        return {
            success: true,
        };

    } catch (error) {
        console.error("Error adding transaction:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}   

