import { updateBudgetToLocalStorage, getBudgetlocalStorage, saveExpenseToLocalStorage, getExpenselocalStorage, removeExpenseFromLocalStorage } from "./LocalStorage.js";
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
let editExpenseModal = document.getElementById("editExpenseModal");

let manageExpensesBtn = document.getElementById("manageExpensesBtn");

let budget = getBudgetlocalStorage();
if (!isNaN(parseFloat(budget))) {
    budgetDiv.innerText = `$${parseFloat(budget).toFixed(2)}`
}else{
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
        if(managing){
            loadEditableExpenses();
        }else{
            loadExpenses();
        }
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

            loadExpenses();
        }
    }
})

let managing = false;

manageExpensesBtn.addEventListener("click", () => {
    if (managing) {
        loadExpenses();
        managing = false;
        manageExpensesBtn.innerText = "Manage Expenses";
    } else {
        loadEditableExpenses();
        managing = true;
        manageExpensesBtn.innerText = "Stop Managing";
    }

})




const loadExpenses = () => {
    expensesGoHere.innerHTML = "";
    let expenses = getExpenselocalStorage();
    let expenseSum = 0;
    if (expenses) {
        expenses.forEach(expense => {
            expensesGoHere.appendChild(createExpenseElement(expense))
            expenseSum += parseFloat(expense.amount);
        })
        // console.log(expenseSum); 
        expenseDiv.innerText = `$${parseFloat(expenseSum).toFixed(2)}`;

        balanceDiv.innerText = `$${parseFloat(budget).toFixed(2) - parseFloat(expenseSum).toFixed(2)}`
    }

}

const loadEditableExpenses = () => {
    expensesGoHere.innerHTML = "";
    let expenses = getExpenselocalStorage();
    let expenseSum = 0;
    if (expenses) {
        expenses.forEach(expense => {
            expensesGoHere.appendChild(createEditExpenseElement(expense))
            expenseSum += parseFloat(expense.amount);
        })
        // console.log(expenseSum); 
        expenseDiv.innerText = `$${parseFloat(expenseSum).toFixed(2)}`;
    }

}

function toggleEditExpenseModal() {
    if (editExpenseModal.classList.contains('hidden')) {
        editExpenseModal.classList.remove('hidden');
        // Add any other actions you want to perform when the modal is shown
    } else {
        editExpenseModal.classList.add('hidden');
        // Add any other actions you want to perform when the modal is hidden
    }
}




function createExpenseElement(expense) {
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
    expenseAmount.textContent = "-$" + expense.amount;
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
    editIcon.classList.add('object-contain', 'hidden');
    editIcon.src = './assets/Pencil.png';
    editIcon.alt = 'edit pencil';
    rightContainer.appendChild(editIcon);

    // Create and append the delete icon
    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('object-contain', 'hidden');
    deleteIcon.src = './assets/MinusCircle.png';
    deleteIcon.alt = 'purple minus circle';
    rightContainer.appendChild(deleteIcon);

    // Append the right container to the main container
    container.appendChild(rightContainer);

    return container;
}

function createEditExpenseElement(expense) {
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
    expenseAmount.textContent = "-$"+ expense.amount;
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
    editIcon.classList.add('object-contain');
    editIcon.src = './assets/Pencil.png';
    editIcon.alt = 'edit pencil';
    editIcon.addEventListener("click", () => {
        toggleEditExpenseModal();
    })


    rightContainer.appendChild(editIcon);

    // Create and append the delete icon
    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('object-contain');
    deleteIcon.src = './assets/MinusCircle.png';
    deleteIcon.alt = 'purple minus circle';
    deleteIcon.addEventListener("click", () => {

        removeExpenseFromLocalStorage(expense);
        loadEditableExpenses();

    })

    rightContainer.appendChild(deleteIcon);

    // Append the right container to the main container
    container.appendChild(rightContainer);

    return container;
}

loadExpenses();