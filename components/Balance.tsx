"use client";
import { useEffect, useState } from "react";
import getUserBalance from "@/app/actions/getUserBalance";

export default function Balance() {
    const [balance, setBalance] = useState<number>(0);

    const fetchBalance = async () => {
        const { balance: newBalance, error } = await getUserBalance();
        if (!error && newBalance !== undefined) {
            setBalance(newBalance);
        }
    };

    useEffect(() => {
        fetchBalance();

        // Add event listener for transaction updates
        const handleTransactionAdded = () => {
            fetchBalance();
        };

        window.addEventListener('transactionAdded', handleTransactionAdded);

        // Cleanup
        return () => {
            window.removeEventListener('transactionAdded', handleTransactionAdded);
        };
    }, []);

    return(
        <>
            <h4 className="text-1xl font-bold mb-4">Your Balance</h4>
            <h1 className="text-2xl font-bold text-primary">${balance.toFixed(2)}</h1>
        </>
    )
}   