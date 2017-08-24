let todoList = {
    todos: [],
    displayTodos: function () {
        if (this.todos.length === 0) {
            console.log("todos is empty");
        } else {
            console.log(`My Todos:`)
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].completed == true) {
                    console.log(`(x), ${this.todos[i].todoText}`);
                } else {
                    console.log(`( ) , ${this.todos[i].todoText}`);
                }

            }
        }

    },
    addTodo: function (todoText, complete) {
        this.todos.unshift({
            todoText: todoText,
            completed: false

        });
        this.displayTodos();
    },
    changeTodo: function (position, newTodoText) {
        this.todos[position].todoText = newTodoText;
        todoList.displayTodos();

    },
    toggleCompleted: function (position) {
        let todo = this.todos[position];
        todo.completed = !todo.completed;

        this.displayTodos();
    },
    toggleAll: function () {
        let totalTodos = this.todos.length;
        let completedTodos = 0;

        // Get number of completed todos
        for (let i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed == true) {
                completedTodos++;
            }
        }

        // Case 1: if everything true turn it to false
        if (completedTodos === totalTodos) {
            for (let i = 0; i < totalTodos; i++) {
                this.todos[i].completed = false;
            }
        } else {
            for (let i = 0; i < totalTodos; i++) {
                this.todos[i].completed = true;
            }
        }
    },
    removeTodo: function (position) {
        this.todos.splice(position, 1);
        this.displayTodos()
    }
}


let handlers = {
    displayTodos: function () {
        todoList.displayTodos()
    },
    toggleAll: function () {
        todoList.toggleAll();
    },
    addTodo: function () {
        let addInput = document.querySelector(".addInput");
        if (addInput.value != "") {
            todoList.addTodo(addInput.value);
            addInput.value = "";
        }
    },
    editTodo:function(){
        let todoPosition = document.querySelector(".todoPosition");
        let todotext = document.querySelector(".todoText");
        todoList.changeTodo(todoPosition.value,todotext.value)
        todoPosition.value = "";
        todotext.value = ""
        
    }
}

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
