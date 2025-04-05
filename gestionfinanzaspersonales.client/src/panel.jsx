import React, { useState, useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import { useNavigate } from "react-router-dom";

function Panel() {
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError("User not logged in.");
            navigate('/panel');
            return;
        }

        // Fetch accounts
        fetch(`http://localhost:5148/api/Account/GetUserAccounts/${userId}`)
            .then(response => response.json())
            .then(data => setAccounts(data))
            .catch(() => setError("Failed to fetch accounts"));

        // Fetch categories
        fetch(`http://localhost:5148/api/Account/GetCategories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(() => setError("Failed to fetch categories"));

        // Fetch budgets
        fetch(`http://localhost:5148/api/Budget/GetUserBudgets/${userId}`)
            .then(response => response.json())
            .then(data => setBudgets(data))
            .catch(() => setError("Failed to fetch budgets"));

        // Fetch transactions
        fetch(`http://localhost:5148/api/Transaction/GetUserTransactions/${userId}`)
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(() => setError("Failed to fetch transactions"));
    }, [navigate]);

    return (
        <div>
            <Nav />
            <h1>General View</h1>
            {error && <p className="error">{error}</p>}
            <div className="container">
                <h2>Accounts</h2>
                <ul>
                    {accounts.map(account => (
                        <li key={account.idAccount}>
                            {account.nameAccount} - {account.typeAccount} - {account.initialBalance}
                        </li>
                    ))}
                </ul>

                <h2>Categories</h2>
                <ul>
                    {categories.map(category => (
                        <li key={category.idCategory}>
                            {category.nameCategory}
                        </li>
                    ))}
                </ul>

                <h2>Budgets</h2>
                <ul>
                    {budgets.map(budget => (
                        <li key={budget.idBudget}>
                            {budget.period} - {budget.amount}
                        </li>
                    ))}
                </ul>

                <h2>Transactions</h2>
                <ul>
                    {transactions.map(transaction => (
                        <li key={transaction.idTransaction}>
                            {transaction.dateTransaction} - {transaction.amount} - {transaction.descriptionTran}
                        </li>
                    ))}
                </ul>

            </div>
            <Footer />
        </div>
    );
}

export default Panel;