"use client";

import { useToast } from "@/hooks/use-toast";
import addTransaction from "@/app/actions/addTransaction";
import { useRef } from "react";

export default function AddTransaction() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const clientAction = async (formData: FormData) => {
        const payload = {
            text: formData.get('text')?.toString() || '',
            amountStr: formData.get('amount')?.toString() || ''
        };
        
        const { error } = await addTransaction(payload);
        
        if (error) {
            toast({
                title: "Error",
                description: error,
                variant: "destructive",
                className: "bg-red-500 text-white",
            });
        } else {
            toast({
                title: "Success",
                description: "Transaction added successfully",
                variant: "default",
                className: "bg-green-500 text-white",
            });
            
            // Reset the form
            formRef.current?.reset();
            
            // Dispatch custom event to trigger balance update
            window.dispatchEvent(new Event('transactionAdded'));
        }
    }

    return (
        <>
            <h3 className="text-2xl font-bold mb-4">Add Transaction</h3>
            <form ref={formRef} action={clientAction}>
                <div className="form-control">   
                    <label htmlFor="text">Description</label>
                    <input type="text" name="text" id="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br/> (negative - expense, positive - income)</label>
                    <input type="number" name="amount" id="amount" placeholder="Enter amount..." step="0.01" />
                </div>
                <button className="btn btn-primary">Add Transaction</button>
            </form>
        </>
    );
}