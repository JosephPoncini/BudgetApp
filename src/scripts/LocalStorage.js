const updateBudgetToLocalStorage = (budget) => {
    localStorage.setItem("Budget", JSON.stringify(budget));
}

const getBudgetlocalStorage = () => {

    let localStorageData = localStorage.getItem("Budget");

    if (localStorageData == null) {
        return [];
    }

    return  parseFloat(JSON.parse(localStorageData));

}

//-----------------------------------------------------------------------------------------------------

const saveExpenseToLocalStorage = (expense) => {

    let expenses = getExpenselocalStorage();

    if (!expenses.includes(expense)) {
        expenses.push(expense);
    }

    localStorage.setItem("Expenses", JSON.stringify(expenses));
}

const getExpenselocalStorage = () => {

    let localStorageData = localStorage.getItem("Expenses");

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);

}

const removeExpenseFromLocalStorage = (expense) => {

    let expenses = getExpenselocalStorage();

    let namedIndex = expenses.indexOf(expense);

    expenses.splice(namedIndex, 1);

    localStorage.setItem("Expenses", JSON.stringify(expenses))

}

export {updateBudgetToLocalStorage, getBudgetlocalStorage, saveExpenseToLocalStorage, getExpenselocalStorage, removeExpenseFromLocalStorage}