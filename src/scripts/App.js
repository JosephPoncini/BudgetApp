import {updateManagingStatusToLocalStorage, getManagingStatuslocalStorage, updateBudgetToLocalStorage, getBudgetlocalStorage, saveExpenseToLocalStorage, getExpenselocalStorage, removeExpenseFromLocalStorage } from "./LocalStorage.js";
// import { createExpenseElement, createEditExpenseElement } from "./functions.js";

let expensesGoHere = document.getElementById("expensesGoHere");

let addDescriptionInput = document.getElementById("addDescriptionInput");
let addCostInput = document.getElementById("addCostInput");

let editDescriptionInput = document.getElementById("editDescriptionInput");
let editCostInput = document.getElementById("editCostInput");

let budgetAmountInput = document.getElementById("budgetAmountInput");

let budgetDiv = document.getElementById("budgetDiv");
let expenseDiv = document.getElementById("expenseDiv");
let balanceDiv = document.getElementById("balanceDiv");

let updateBudgetBtn = document.getElementById("updateBudgetBtn");
let addBtnExpense = document.getElementById("addBtnExpense")
let changeBtnEdit = document.getElementById("changeBtnEdit");

let updateBudgetModal = document.getElementById("updateBudgetModal");
let addExpenseModal = document.getElementById("addExpenseModal");

let manageExpensesBtn = document.getElementById("manageExpensesBtn");

let key = 0;

let managing = getManagingStatuslocalStorage();

if(managing != true){
    managing = false;
}
if (managing) {
    manageExpensesBtn.innerText = "Stop Managing";
} else {
    manageExpensesBtn.innerText = "Edit Expenses";
}

let budget = getBudgetlocalStorage();
if (!isNaN(parseFloat(budget))) {
    budgetDiv.innerText = `$${parseFloat(budget).toFixed(2)}`
} else {
    budget = 0;
}
class Expense {
    constructor(description, amount) {
        this.description = description;
        this.amount = amount;
    }
}

updateBudgetBtn.addEventListener("click", () => {
    if (!isNaN(budgetAmountInput.value) && budgetAmountInput.value) {
        updateBudgetToLocalStorage(budgetAmountInput.value);
        const backdrop = document.querySelector('[modal-backdrop]');
        updateBudgetModal.classList.add('hidden');
        backdrop.hidden = true;

        budget = getBudgetlocalStorage();
        budgetDiv.innerText = `$${parseFloat(budget).toFixed(2)}`;
        location.reload();
    }
})


addBtnExpense.addEventListener("click", () => {
    if (addDescriptionInput.value && addCostInput.value) {
        if (!isNaN(addCostInput.value)) {
            let newExpense = new Expense(addDescriptionInput.value, addCostInput.value);
            saveExpenseToLocalStorage(newExpense);
            const backdrop = document.querySelector('[modal-backdrop]');
            addExpenseModal.classList.add('hidden');
            backdrop.hidden = true;
        }
        location.reload();
    }
})



manageExpensesBtn.addEventListener("click", () => {
    if (managing) {
        updateManagingStatusToLocalStorage(false)
    } else {
        updateManagingStatusToLocalStorage(true)
    }
    location.reload();
})


const loadExpenses = () => {
    expensesGoHere.innerHTML = "";
    let expenses = getExpenselocalStorage();
    let expenseSum = 0;
    if (expenses) {
        let counter = 0;
        expenses.forEach(expense => {
            expensesGoHere.appendChild(createExpenseElement(expense, counter))
            expenseSum += parseFloat(expense.amount);
            counter++;
        })
        // console.log(expenseSum); 
        expenseDiv.innerText = `$${parseFloat(expenseSum).toFixed(2)}`;

        balanceDiv.innerText = `$${(parseFloat(budget).toFixed(2) - parseFloat(expenseSum).toFixed(2)).toFixed(2)}`
    }
}

changeBtnEdit.addEventListener("click", () => {
    if (editDescriptionInput.value && editCostInput.value) {
        if (!isNaN(editCostInput.value)) {
            removeExpenseFromLocalStorage(key);
            let newExpense = new Expense(editDescriptionInput.value, editCostInput.value);
            saveExpenseToLocalStorage(newExpense);
            const backdrop = document.querySelector('[modal-backdrop]');
            addExpenseModal.classList.add('hidden');
            backdrop.hidden = true;
        }
        location.reload();
    }
})


function createExpenseElement(expense, index) {
    // Create the main container div
    const container = document.createElement('div');
    container.classList.add('border-gray-500', 'border-b', 'w-full', 'flex', 'flex-row', 'justify-between');

    // Create the left container div
    const leftContainer = document.createElement('div');

    // Create and append the "Expense" text
    const expenseText = document.createElement('div');
    expenseText.classList.add('text-lg');
    expenseText.textContent = expense.description;
    leftContainer.appendChild(expenseText);

    // Create and append the expense amount text
    const expenseAmount = document.createElement('div');
    expenseAmount.classList.add('text-base', 'text-red-600');
    expenseAmount.textContent = "-$" + parseFloat(expense.amount).toFixed(2);
    leftContainer.appendChild(expenseAmount);

    // Append the left container to the main container
    container.appendChild(leftContainer);

    // Create the right container div
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('flex', 'flex-row', 'space-x-5');

    // Create and append the edit icon
    const editIcon = document.createElement('img');
    editIcon.setAttribute('data-modal-target', 'editExpenseModal');
    editIcon.setAttribute('data-modal-toggle', 'editExpenseModal');
    managing ? editIcon.classList.add('object-contain') : editIcon.classList.add('object-contain', 'hidden');
    editIcon.src = './assets/Pencil.png';
    editIcon.alt = 'edit pencil';
    editIcon.addEventListener("click", () => {
        key = index;
        editDescriptionInput.value = expense.description;
        editCostInput.value = expense.amount;
    })
    rightContainer.appendChild(editIcon);

    // Create and append the delete icon
    const deleteIcon = document.createElement('img');
    managing ? deleteIcon.classList.add('object-contain') : deleteIcon.classList.add('object-contain', 'hidden');
    deleteIcon.src = './assets/MinusCircle.png';
    deleteIcon.alt = 'purple minus circle';
    deleteIcon.addEventListener("click", () => {
        removeExpenseFromLocalStorage(index);
        location.reload();
    })
    rightContainer.appendChild(deleteIcon);

    // Append the right container to the main container
    container.appendChild(rightContainer);

    return container;
}

loadExpenses();