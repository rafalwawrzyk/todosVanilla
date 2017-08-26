let todoList = {
    todos: [],
    addTodo: function (todoText, complete) {
        this.todos.unshift({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (position, newTodoText) {
        this.todos[position].todoText = newTodoText;
    },
    toggleCompleted: function (position) {
        let todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function () {
        let totalTodos = this.todos.length;
        let completedTodos = 0;

        // Get number of completed todos
        this.todos.forEach(function (todo) {
            if (todo.completed == true) {
                completedTodos++;
            }
        })

        // Case 1: if everything true turn it to false
        this.todos.forEach(function (todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false
            } else {
                todo.completed = true
            }
        })
    },
    removeTodo: function (position) {
        this.todos.splice(position, 1);
    }
}


let handlers = {
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo: function () {
        let addInput = document.querySelector(".addInput");
        if (addInput.value != "") {
            todoList.addTodo(addInput.value);
            addInput.value = "";
        };
        view.displayTodos()
    },
    editTodo: function () {
        let todoPosition = document.querySelector(".todoPosition");
        let todotext = document.querySelector(".todoText");
        todoList.changeTodo(todoPosition.valueAsNumber, todotext.value)
        todoPosition.value = "";
        todotext.value = "";
        view.displayTodos();

    },
    removeTodo: function (position) {
        todoList.removeTodo(position);
        view.displayTodos();
    },
    toggleCompleted: function () {
        let togglePosition = document.querySelector(".togglePosition");
        todoList.toggleCompleted(togglePosition.valueAsNumber);
        view.displayTodos();
    }
}

let view = {
    displayTodos: function () {
        let list = document.querySelector("ul");
        list.innerHTML = '';
        let itemsIdCounter = 0;

        todoList.todos.forEach(function (todo, counter) {
            let listItems = document.createElement('li');
            if (todo.completed == true) {
                listItems.textContent = todo.todoText + " (x)";
                list.appendChild(listItems);
            } else {
                listItems.textContent = todo.todoText + " ( )";
                list.appendChild(listItems);
            }
            listItems.id = counter
            listItems.appendChild(this.createRemoveBtn());
        }, this)
    },
    createRemoveBtn: function () {
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.className = 'deleteBtn';
        return deleteBtn;
    },
    removeListenerSetUp: function () {
        let list = document.querySelector("ul");
        list.addEventListener('click', function (event) {
            //get elements that clicked
            let clickedElement = event.target;
            // check if we clicked delete
            if (clickedElement.className === 'deleteBtn') {
                // run handler deleting todo
                handlers.removeTodo(parseInt(clickedElement.parentNode.id))

            }
        })
    }
}

view.removeListenerSetUp();



// buttons variables - event.listener method
//var buttons = document.querySelectorAll("button");
//for (let i = 0; i < buttons.length; i++) {
//    buttons[i].addEventListener('click', function (event) {
//        if (event.target.classList.contains("showTodos")) {
//            todoList.displayTodos();
//        } else if (event.target.classList.contains("toggleTodos")) {
//            todoList.toggleAll();
//        }
//    })
//}
