//-----Managing----------------------------------------------------------------------------------------
const updateManagingStatusToLocalStorage = (managingStatus) => {
    localStorage.setItem("Managing Status", JSON.stringify(managingStatus));
}

const getManagingStatuslocalStorage = () => {

    let localStorageData = localStorage.getItem("Managing Status");

    if (localStorageData == null) {
        return [];
    }

    return  JSON.parse(localStorageData);

}


//-----Budget----------------------------------------------------------------------------------------
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

//-----Expenses---------------------------------------------------------------------------------------

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

const removeExpenseFromLocalStorage = (index) => {

    let expenses = getExpenselocalStorage();

    expenses.splice(index, 1);

    localStorage.setItem("Expenses", JSON.stringify(expenses))

}

export {updateManagingStatusToLocalStorage, getManagingStatuslocalStorage, updateBudgetToLocalStorage, getBudgetlocalStorage, saveExpenseToLocalStorage, getExpenselocalStorage, removeExpenseFromLocalStorage}