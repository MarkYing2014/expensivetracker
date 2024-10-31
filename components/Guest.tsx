"use client";
import { SignInButton } from "@clerk/nextjs";

export default function Guest() {
    return <div className="guest"> 
        <h1>Welcome to Expense Tracker</h1>
        <p>Please sign in to continue</p>
        <SignInButton />
    </div>;
}