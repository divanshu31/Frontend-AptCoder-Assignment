<template>
  <li :class="{ 'selected-task': task.id === selectedTaskId }">
    <input class="checkbox" type="checkbox" v-model="task.completed" @change="toggleCompletion">
    <div :class="containerClasses" @click="selectTask">
      <div class="task-info">
        <div class="task-title" v-if="!editing">{{ task.title }}</div>
        <input v-else class="task-input" type="text" v-model="taskTitle" @blur="updateTask" @keyup.enter="updateTask">
        <div class="created-time" style="color: black;">{{ formatDate(task.createdAt) }}</div>
      </div>
    </div>
    <div class="button">
    <button class="update-button" @click="selectTaskForEdit"><i class="fas fa-pencil-alt"></i></button>
    <button class="delete-button" @click="removeTask"><i class="far fa-trash-alt"></i></button>
    </div>
  </li>
</template>

<script>
export default {
  name: "TaskItem",
  props: ["task", "selectedTaskId"],
  data() {
    return {
      taskTitle: "",
      editing: false // Track if the task is being edited
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    toggleCompletion() {
      this.task.completed = !this.task.completed;
      this.$emit("complete", this.task.id);
    },
    removeTask() {
      this.$emit("remove", this.task.id);
    },
    selectTask() {
      this.$emit("select", this.task.id);
    },
    selectTaskForEdit() {
      this.taskTitle = this.task.title;
      this.editing = true;
    },
    updateTask() {
      this.editing = false;
      this.task.title = this.taskTitle; // Update task title
      this.$emit("update", { id: this.task.id, title: this.task.title });
      this.$emit("save-to-local-storage"); // Emit event to save tasks to local storage
    },
  },
  computed: {
    containerClasses() {
      return {
        'task-item-container': true,
        'completed-task': this.task.completed
      };
    }
  },
  watch: {
    selectedTaskId(newValue) {
      // Enter edit mode automatically if this task is selected
      this.editing = this.task.id === newValue;
    }
  }
};
</script>


<style scoped>
.checkbox {
  width: 20px;
  margin-right: 20px;
}

.task-item-container {
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid #2e2e2e; /* Dark gray */
  border-radius: 8px;
  padding: 10px;
  overflow: auto;
  background-color: #f3f3f3; /* Light gray (adjusted to match previous color) */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.completed-task {
  background-color: #90ee90; /* Light green */
}

.task-info {
  flex: 1;
  cursor: pointer;
}

.task-title {
  font-weight: bold;
  color: rgb(82, 81, 81);
}

.task-input {
  border: none;
  outline: none;
  font-weight: bold;
  color: rgb(82, 81, 81);
}

.created-time {
  margin-top: 4px;
}

.button{
  margin-left: 8px;
}

.update-button,
.delete-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin: auto 8%;
}

.add-button {
  background-color: #4ec5c1; /* Updated to match previous color scheme */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 50%; /* Adjusted border radius */
  padding: 10px 15px;
  margin-left: 10px;
}


/* Responsive Styles */
@media only screen and (max-width: 600px) {
  .task-item-container {
    flex-direction: column; /* Stack elements vertically */
    align-items: flex-start; /* Align items to the start */
    padding: 10px; /* Increase padding for better spacing */
  }

  .checkbox {
    margin-right: 0; /* Remove margin for checkbox */
    margin-bottom: 10px; /* Add margin at bottom for better spacing */
  }

  .task-info {
    width: 100%; /* Full width for task info */
    margin-top: 10px; /* Add margin at top for better spacing */
  }

  .task-title {
    font-size: 18px; /* Decrease font size for better readability */
  }

  .task-input {
    width: 100%; /* Full width for task input */
  }

  .update-button,
  .delete-button {
    margin: 10px 0; /* Add margin for better spacing */
  }
}
</style>