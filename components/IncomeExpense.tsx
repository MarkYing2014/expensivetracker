import { getIncomeExpense } from "@/app/actions/getIncomeExpense";

export default async function IncomeExpense() {
    const { income = 0, expense = 0 } = await getIncomeExpense();

    const formattedIncome = Math.abs(income).toFixed(2);
    const formattedExpense = Math.abs(expense).toFixed(2);

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p id="money-plus" className="money plus">
                    ${formattedIncome}
                </p>
            </div>
            <div>
                <h4>Expense</h4>
                <p id="money-minus" className="money minus">
                    ${formattedExpense}
                </p>
            </div>
        </div>
    );
}