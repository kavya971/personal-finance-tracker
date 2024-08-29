document.addEventListener('DOMContentLoaded', () => {
    const incomeForm = document.getElementById('incomeForm');
    const expenseForm = document.getElementById('expenseForm');
    const incomeList = document.getElementById('incomeList');
    const expenseList = document.getElementById('expenseList');
    const totalIncome = document.getElementById('totalIncome');
    const totalExpenses = document.getElementById('totalExpenses');
    const netBalance = document.getElementById('netBalance');

    function loadEntries() {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let incomeTotal = 0;
        let expenseTotal = 0;

        incomeList.innerHTML = '';
        expenseList.innerHTML = '';

        incomes.forEach((entry, index) => {
            incomeTotal += entry.amount;
            incomeList.innerHTML += `<div>Income ${index + 1}: ${entry.description} - $${entry.amount.toFixed(2)} <button onclick="removeIncome(${index})">Remove</button></div>`;
        });

        expenses.forEach((entry, index) => {
            expenseTotal += entry.amount;
            expenseList.innerHTML += `<div>Expense ${index + 1}: ${entry.description} - $${entry.amount.toFixed(2)} <button onclick="removeExpense(${index})">Remove</button></div>`;
        });

        totalIncome.textContent = incomeTotal.toFixed(2);
        totalExpenses.textContent = expenseTotal.toFixed(2);
        netBalance.textContent = (incomeTotal - expenseTotal).toFixed(2);
    }

    function addIncome(event) {
        event.preventDefault();
        const description = document.getElementById('incomeDescription').value;
        const amount = parseFloat(document.getElementById('incomeAmount').value);

        if (description && !isNaN(amount)) {
            const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
            incomes.push({ description, amount });
            localStorage.setItem('incomes', JSON.stringify(incomes));
            loadEntries();
            incomeForm.reset();
        }
    }

    function addExpense(event) {
        event.preventDefault();
        const description = document.getElementById('expenseDescription').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);

        if (description && !isNaN(amount)) {
            const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses.push({ description, amount });
            localStorage.setItem('expenses', JSON.stringify(expenses));
            loadEntries();
            expenseForm.reset();
        }
    }

    window.removeIncome = function(index) {
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        incomes.splice(index, 1);
        localStorage.setItem('incomes', JSON.stringify(incomes));
        loadEntries();
    }

    window.removeExpense = function(index) {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        loadEntries();
    }

    incomeForm.addEventListener('submit', addIncome);
    expenseForm.addEventListener('submit', addExpense);

    loadEntries();
});
