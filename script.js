let users = {
    "30362040": { password: "yahusain",tasks: [], completedTasks: [] },
    "30362041": { password: "yahusain",tasks: [], completedTasks: [] },
    "30362042": { password: "yahusain",tasks: [], completedTasks: [] },
    "30362043": { password: "yahusain",tasks: [], completedTasks: [] },
    "20323313": { password: "yahusain",tasks: [], completedTasks: [] },
   
  };
  let currentUser = null;
  
  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "admin" && password === "admin123") {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("admin-dashboard").style.display = "block";
    } else if (username in users) {
      currentUser = username;
      document.getElementById("login-section").style.display = "none";
      document.getElementById("user-dashboard").style.display = "block";
      loadUserTasks();
    } else {
      alert("Invalid credentials");
    }
  }
  
  function loadUserTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    const userTasks = [
      { task: "Dua kamil", completed: false },
      { task: "Dua Joshan", completed: false },
      { task: "Innafathana", completed: false },
      { task: "Quran Majeed Tilawat", completed: false },
      { task: "Tasbeeh Yali", completed: false },
      { task: "Tasbeeh Yahussain", completed: false },
      { task: "Tasbeeh Iyyakanabodo", completed: false }
    ];
    users[currentUser].tasks = userTasks;
  
    userTasks.forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.task}</td>
        <td><input type="checkbox" id="task-${index}"></td>
      `;
      taskList.appendChild(row);
    });
  }
  
  function submitTasks() {
    const completedTasks = [];
    users[currentUser].tasks.forEach((task, index) => {
      const checkbox = document.getElementById(`task-${index}`);
      if (checkbox.checked) {
        completedTasks.push({
          task: task.task,
          date: new Date().toLocaleDateString()
        });
      }
    });
    users[currentUser].completedTasks = completedTasks;
    alert("Tasks submitted successfully!");
  
    // Show Home Button after submit
    document.getElementById("home-button").style.display = "block";
  }
  
  function goHome() {
    // Redirect user to login page
    document.getElementById("user-dashboard").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("home-button").style.display = "none";
  }
  
  function viewUserTasks() {
    const selectedUser = document.getElementById("user-select").value;
    const adminTaskList = document.getElementById("adminTaskList");
    adminTaskList.innerHTML = "";
  
    if (selectedUser && users[selectedUser].completedTasks.length > 0) {
      users[selectedUser].completedTasks.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${task.task}</td>
          <td>${task.date}</td>
        `;
        adminTaskList.appendChild(row);
      });
    } else {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="2">No completed tasks</td>`;
      adminTaskList.appendChild(row);
    }
  }
  