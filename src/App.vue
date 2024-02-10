<template>
  <div id="app">
    <task v-bind:tasks="tasks"></task>
  </div>
</template>

<script>
import Task from "./components/Task";

export default {
  name: "App",
  components: {
    Task,
  },
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    // Retrieve tasks from local storage when the component is created
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px; /* Limit maximum width to 1200px */
  margin: 0 auto; /* Center the container horizontally */
  padding: 0 20px; /* Add padding on the sides for better readability */
}
</style>