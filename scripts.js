class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(element) {
        this.items.push(element);
    }
    dequeue() {
        if(this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length == 0;
    }
    front() {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }
    printQueue() {
        return this.items.join(", ");
    }
}

class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length == 0;
    }
    printStack() {
        return this.items.join(", ");
    }
}

const taskQueue = new Queue();
const undoStack = new Stack();

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (task) {
        taskQueue.enqueue(task);
        updateTaskList();
        taskInput.value = "";
    }
}

function removeTask() {
    if (!taskQueue.isEmpty()) {
        const removedTask = taskQueue.dequeue();
        undoStack.push(removedTask);
        updateTaskList();
    }
}

function undoTask() {
    if (!undoStack.isEmpty()) {
        const taskToRedo = undoStack.pop();
        taskQueue.enqueue(taskToRedo);
        updateTaskList();
    }
}

function updateTaskList() {
    const taskQueueElement = document.getElementById("taskQueue");
    taskQueueElement.innerHTML = "";
    taskQueue.items.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        taskQueueElement.appendChild(li);
    });

    const undoStackElement = document.getElementById("undoStack");
    undoStackElement.innerHTML = "";
    undoStack.items.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        undoStackElement.appendChild(li);
    });
}
