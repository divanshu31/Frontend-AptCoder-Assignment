<template>
  <div class="container">
    <div class="task">
      <div class="title">
        <h1> {TO DO LIST 📃} </h1>
      </div>
      <div class="inp">
        <div class="form">
          <input
            type="text"
            placeholder="What needs to be done?"
            v-model="newTask"
            @keyup.enter="addTask"
            class="task-input"
          />
        </div>
        <div class="btn">
          <button @click="addTask" class="add-button">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div class="taskItems">
        <ul>
          <TaskItem
            v-bind:task="task"
            v-for="(task, index) in tasks"
            :key="task.id"
            :selectedTaskId="selectedTaskId"
            @remove="removeTask(index)"
            @complete="completeTask(task)"
            @update="handleUpdate"
            @save-to-local-storage="saveTasksToLocalStorage"
          ></TaskItem>
        </ul>
      </div>
      <div class="clearBtns">
        <button @click="clearCompleted">Task done</button>
        <button @click="clearAll">All Clear</button>
      </div>
      <div class="pendingTasks">
        <span>Pending Tasks: {{ incomplete }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./Task-item";

export default {
  name: "TaskList",
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [],
      newTask: "",
      selectedTaskId: null,
    };
  },
  computed: {
    incomplete() {
      return this.tasks.filter((task) => !task.completed).length;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        const newTaskData = {
          id: this.tasks.length + 1, // Generate a unique ID
          title: this.newTask,
          completed: false,
          createdAt: new Date().toISOString().split("T")[0],
        };

        // axios.post('http://localhost:3001/tasks', newTaskData)
        //   .then(response => {
        //     this.tasks.push(response.data); // Update local tasks array
        //     this.newTask = "";
        //     this.saveTasksToLocalStorage(); // Save tasks to local storage
        //   })
        //   .catch(error => {
        //     console.error('Error adding task:', error);
        //   });
        this.tasks.push(newTaskData);
        this.saveTasksToLocalStorage();
        this.newTask = "";
      }
    },
    completeTask(task) {
      task.completed = !task.completed;
      this.saveTasksToLocalStorage();
    },
    // completeTask(task) {
    //   task.completed = !task.completed;

    //   axios.put(`http://localhost:3001/tasks/${task.id}`, task)
    //     .then(() => {
    //       this.saveTasksToLocalStorage(); // Save tasks to local storage
    //     })
    //     .catch(error => {
    //       console.error('Error updating task:', error);
    //     });
    // },
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
    },
    clearCompleted() {
      this.tasks = this.tasks.filter((task) => !task.completed);
      this.saveTasksToLocalStorage();
    },
    // clearCompleted() {
    //   const completedTasks = this.tasks.filter(task => task.completed);

    //   axios.delete('http://localhost:3001/tasks', { data: completedTasks })
    //     .then(() => {
    //       this.tasks = this.tasks.filter(task => !task.completed); // Update local tasks array
    //       this.saveTasksToLocalStorage(); // Save tasks to local storage
    //     })
    //     .catch(error => {
    //       console.error('Error clearing completed tasks:', error);
    //     });
    // },
    clearAll() {
      this.tasks = [];
      this.saveTasksToLocalStorage();
    },
    // clearAll() {
    //   axios.delete('http://localhost:3001/tasks')
    //     .then(() => {
    //       this.tasks = []; // Update local tasks array
    //       this.saveTasksToLocalStorage(); // Save tasks to local storage
    //     })
    //     .catch(error => {
    //       console.error('Error clearing all tasks:', error);
    //     });
    // },
    handleUpdate(event) {
      const taskIndex = this.tasks.findIndex((task) => task.id === event.id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].title = event.title;
        this.saveTasksToLocalStorage();
      }
    },
    saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
  created() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    } else {
      this.tasks = []; // Initialize tasks as an empty array if no tasks are stored
    }
  },
};
</script>

<style scoped>
.container {
  width: 75%;
}

.task {
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.form {
  display: flex;
  margin-bottom: 10px;
  width: 90%;
  overflow: auto;
}

.inp {
  display: flex;
  flex-direction: row;
}

.task-input {
  flex: 1;
  min-height: 40px;
  height: auto;
}

.add-button {
  background-color: #142915;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 48%;
  padding: 10px 15px;
  margin-left: 10px;
}

.add-button i {
  font-size: 18px;
}

.taskItems {
  margin-bottom: 10px;
}

.clearBtns {
  margin-bottom: 10px;
}

.pendingTasks {
  font-weight: bold;
}

.pendingTasks span {
  color: rgb(6, 0, 0);
}
/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .task {
    padding: 15px;
  }

  .task-input {
    min-height: 30px;
  }
}
</style>