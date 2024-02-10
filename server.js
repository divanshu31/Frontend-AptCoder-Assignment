const fs = require("fs");

// Function to retrieve data from local storage and update db.json
function updateDbFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  const tasks = storedTasks ? JSON.parse(storedTasks) : [];

  fs.writeFile("db.json", JSON.stringify({ tasks }), (err) => {
    if (err) {
      console.error("Error writing to db.json:", err);
    } else {
      console.log("Data written to db.json successfully.");
    }
  });
}

// Function to periodically update db.json
function updateDbPeriodically() {
  updateDbFromLocalStorage();
  // Set the interval for updating db.json (e.g., every 5 minutes)
  setInterval(updateDbFromLocalStorage, 5 * 60 * 1000); // 5 minutes in milliseconds
}

// Start updating db.json periodically
updateDbPeriodically();
