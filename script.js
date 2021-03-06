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
        let addBtn = document.querySelector(".addTodo");
        let addInput = document.querySelector(".addInput");

        function checkEmpty() {
            if (addInput.value != "") {
                todoList.addTodo(addInput.value);
                addInput.value = "";
            };
            view.displayTodos()
        }

        addBtn.addEventListener('click', checkEmpty);
        addInput.addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                checkEmpty();
            }
        })



    },
    //    editTodo: function () {
    //        let todoPosition = document.querySelector(".todoPosition");
    //        let todotext = document.querySelector(".todoText");
    //        todoList.changeTodo(todoPosition.valueAsNumber, todotext.value)
    //        todoPosition.value = "";
    //        todotext.value = "";
    //        view.displayTodos();
    //
    //    },
    removeTodo: function (position) {
        todoList.removeTodo(position);
        view.displayTodos();
    },
    //    toggleCompleted: function () {
    //        let togglePosition = document.querySelector(".togglePosition");
    //        todoList.toggleCompleted(togglePosition.valueAsNumber);
    //        view.displayTodos();
    //    }
}

let view = {
    displayTodos: function () {
        let list = document.querySelector("ul");
        list.innerHTML = '';
        let itemsIdCounter = 0;

        todoList.todos.forEach(function (todo, counter) {
            let listItems = document.createElement('li');
            if (todo.completed == true) {
                listItems.innerHTML = `<div class="line todoItem"><p>${todo.todoText}</p></div>`;
                list.appendChild(listItems);
            } else {
                listItems.innerHTML = `<div class="todoItem"><p>${todo.todoText}</p></div>`;
                list.appendChild(listItems);
            }
            listItems.id = counter
            listItems.appendChild(this.createRemoveBtn());
            listItems.appendChild(this.createChangeButton());
            listItems.appendChild(this.createEditInput());
            listItems.appendChild(this.createCompletedBtn());
        }, this);

    },
    createRemoveBtn: function () {
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
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
    },
    createChangeButton: function () {
        let changeBtn = document.createElement("button");
        changeBtn.textContent = "✎";
        changeBtn.className = "editBtn";
        return changeBtn;
    },
    createEditInput: function () {
        let editInput = document.createElement('input');
        editInput.className = "editInput";
        editInput.value = "edit todo";
        editInput.addEventListener('focus',function(){
            this.value = '';
        })
        return editInput;
    },
    editListener: function () {
        let list = document.querySelector("ul");
        list.addEventListener('click', function (event) {
            let clickedElement = event.target;
            if (clickedElement.className === 'editBtn') {
             todoList.changeTodo(clickedElement.parentElement.id, clickedElement.nextElementSibling.value);
                view.displayTodos();
            }
        })
    },
    createCompletedBtn: function () {
        let completedUncompleted = document.createElement('button');
        completedUncompleted.textContent = "☑|☒";
        completedUncompleted.className = 'completedUncompleted';
        return completedUncompleted;
    },
    completeListener: function () {
        let list = document.querySelector("ul");
        list.addEventListener('click', function (event) {
            let clickedElement = event.target;
            if (clickedElement.className === 'completedUncompleted') {
                todoList.toggleCompleted(clickedElement.parentElement.id);
                view.displayTodos();
            }
        })
    }
}

view.removeListenerSetUp();
view.createChangeButton();
view.editListener();
view.completeListener();
handlers.addTodo();






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
