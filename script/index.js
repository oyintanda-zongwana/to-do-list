let todoList = [
    {
        id: 0,
        name: "Template",
        createdDate: new Date(),
        completed: false
    }
];

console.log(todoList);

let buttonAdd = document.getElementById('Add');
let buttonSort = document.getElementById('Sorting');

buttonAdd.addEventListener('click', function() {
    let itemInput = document.getElementById('itemInput');
    let itemName = itemInput.value.trim();

    // Constraints
    if (itemName && itemName.length > 3 && itemName[0] === itemName[0].toUpperCase()) {
        let newItem = {
            id: todoList.length,
            name: itemName,
            createdDate: new Date(),
            completed: false
        };
        todoList.push(newItem);
        console.log("Item added:", newItem);
        renderList(); // Function to render the list with checkboxes
        itemInput.value = ''; // Clear input field
    } else {
        alert("Item must not be empty, must have more than three characters, and the first character must be uppercase.");
    }
});

buttonSort.addEventListener('click', function() {
    todoList.sort((a, b) => a.name.localeCompare(b.name));
    renderList(); // Re-render the sorted list
});

function removeItem(id) {
    todoList = todoList.filter(item => item.id !== id);
    renderList();
}

function renderList() {
    let listContainer = document.getElementById('todoListContainer');
    listContainer.innerHTML = ''; // Clear existing list

    todoList.forEach(item => {
        // Skip the template item
        if (item.id === 0) return;

        let listItem = document.createElement('div');
        listItem.className = 'todo-item';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.addEventListener('change', function() {
            item.completed = !item.completed;
            renderList(); // Re-render list to update styles
        });

        let itemText = document.createElement('span');
        itemText.textContent = item.name;
        if (item.completed) {
            itemText.style.textDecoration = 'line-through';
        }

        let closeIcon = document.createElement('span');
        closeIcon.textContent = '✖';
        closeIcon.className = 'close';
        closeIcon.addEventListener('click', function() {
            removeItem(item.id);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(itemText);
        listItem.appendChild(closeIcon);
        listContainer.appendChild(listItem);
    });
}

// Initial render (should display nothing as the array is empty except the template)
renderList();