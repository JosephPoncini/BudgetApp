import { updateBudgetToLocalStorage, getBudgetlocalStorage, saveExpenseToLocalStorage, getExpenselocalStorage, removeExpenseFromLocalStorage } from "./LocalStorage.js";


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
        
    })


    rightContainer.appendChild(editIcon);

    // Create and append the delete icon
    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('object-contain');
    deleteIcon.src = './assets/MinusCircle.png';
    deleteIcon.alt = 'purple minus circle';
    rightContainer.appendChild(deleteIcon);

    // Append the right container to the main container
    container.appendChild(rightContainer);

    return container;
}


export {createExpenseElement, createEditExpenseElement}