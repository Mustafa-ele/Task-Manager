let users = {
    "30362040": { password: "yahusain", tasks: [], completedTasks: [] },
    "30362041": { password: "yahusain", tasks: [], completedTasks: [] },
    "30362042": { password: "yahusain", tasks: [], completedTasks: [] },
    "30362043": { password: "yahusain", tasks: [], completedTasks: [] },
    "20323313": { password: "yahusain", tasks: [], completedTasks: [] },
};
let currentUser = null;

// Initialize user task history in localStorage if not already present
if (!localStorage.getItem("userTaskHistory")) {
    localStorage.setItem("userTaskHistory", JSON.stringify({}));
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("admin-dashboard").style.display = "block";
    } else if (username in users && users[username].password === password) {
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

    // Store daily task completion in task history
    let userTaskHistory = JSON.parse(localStorage.getItem("userTaskHistory"));
    if (!userTaskHistory[currentUser]) {
        userTaskHistory[currentUser] = [];
    }
    userTaskHistory[currentUser].push({
        date: new Date().toLocaleDateString(),
        completedTasks: completedTasks
    });
    localStorage.setItem("userTaskHistory", JSON.stringify(userTaskHistory));

    alert("Tasks submitted successfully!");
    document.getElementById("home-button").style.display = "block";
}

function goHome() {
    document.getElementById("user-dashboard").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("home-button").style.display = "none";
}

function viewUserTasks() {
    const selectedUser = document.getElementById("user-select").value;
    const adminTaskList = document.getElementById("adminTaskList");
    adminTaskList.innerHTML = "";

    let userTaskHistory = JSON.parse(localStorage.getItem("userTaskHistory"));

    if (selectedUser && userTaskHistory[selectedUser]) {
        userTaskHistory[selectedUser].forEach((entry) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.completedTasks.map(task => task.task).join(", ")}</td>
            `;
            adminTaskList.appendChild(row);
        });
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="2">No completed tasks</td>`;
        adminTaskList.appendChild(row);
    }
}

function exportToExcel() {
    let userTaskHistory = JSON.parse(localStorage.getItem("userTaskHistory"));
    let selectedUser = document.getElementById("user-select").value;

    if (selectedUser && userTaskHistory[selectedUser]) {
        let tableData = [["Date", "Completed Tasks"]];

        userTaskHistory[selectedUser].forEach((entry) => {
            tableData.push([entry.date, entry.completedTasks.map(task => task.task).join(", ")]);
        });

        let csvContent = "data:text/csv;charset=utf-8,"
            + tableData.map(row => row.join(",")).join("\n");

        let link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", `${selectedUser}_task_history.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("No data available to export.");
    }
}
