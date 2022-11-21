/*
    Name: Mike Villeneuve
    Date: 11/05/2021


    Need to add Delete button
    Consider using the .remove() method
*/


// Captures the user entered task in the textbox
const captureTask = () => {

    return document.querySelector("#taskbox").value;

}


/* Delete to-do list items from database using delete method */
const deleteTask = () => {

    // const deleteIcon = `<input type="image" img src="images/trash.png" class="deleteTask" alt="delete icon" title="Delete">`;
    let xhr = new XMLHttpRequest();
    let method = "delete";
    let url = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks";
    let apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
    let studentID = "2979011";
    let taskDescription = document.querySelector("#taskbox").value;
    let parameters = {
        'StudentId': studentID,
        'Description': taskDescription // get using textContent from trashcan's parentNode
        };

    // Output values to console for logging
    console.log(`deleteTasks function details`);
    console.log(`Method: ${method}`);
    console.log(`Url: ${url}`);
    console.log(`API Key: ${apiKey}`);
    console.log(`Student ID: ${studentID}`);

    // Begin XHR request
    xhr.open(method, url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", apiKey);

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {

            // Delete existing task  // For UI specifically: trashcan.parentNode.parentNode then call removeChild at the UL level, target with trashcan.parentNode
            let list = document.querySelector("#outputDiv");
            list.removeChild(list.childNodes.this);

            // Log preliminary console output
            console.log("...");
            console.log("A task is in the process of being deleted");
            console.log("...");

            //Log deleted task to console
            console.log(`The task: ${deletedTask} has been deleted`);

            //Start task list or append new task to existing list 
            // let output = `${deleteIcon}  ${newTask}<br />`;
            // document.getElementById("outputDiv").innerHTML += output;

        }
    };

    xhr.send(JSON.stringify(parameters));


}


/* Add a task to the to-do list using post method */
const addTask = () => {

    const deleteIcon = `<img src="images/trash.png" class="deleteTask" alt="delete icon" title="Delete">`;
    let xhr = new XMLHttpRequest();
    let method = "post";
    let url = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks";
    let apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
    let studentID = "2979011";
    let taskDescription = document.querySelector("#taskbox").value;
    let parameters = {
        'StudentId': studentID,
        'Description': taskDescription
        };

    // Output values to console for logging
    console.log(`addTasks function details`);
    console.log(`Method: ${method}`);
    console.log(`Url: ${url}`);
    console.log(`API Key: ${apiKey}`);
    console.log(`Student ID: ${studentID}`);

    // Begin XHR request
    xhr.open(method, url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", apiKey);

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {

            // Capture new task
            newTask = captureTask();

            // Log preliminary console output
            console.log("...");
            console.log("New tasks will now be displayed");
            console.log("...");

            //Log new task to console
            console.log(`New task added: ${newTask}`);

            //Start task list or append new task to existing list 
            let output = `<li>${deleteIcon}  ${newTask}</li><br />`;
            document.querySelector("#outputDiv").innerHTML += output;

            // Add event listener to trash can delete button
            document.querySelectorAll(".deleteTask").addEventListener("click", deleteTask); // incorporate into loop
        }
    };

    xhr.send(JSON.stringify(parameters));

}


/* Retrieve to-do list items from database using get method */
const getTasks = () => {

    const deleteIcon = `<img src="images/trash.png" class="deleteTask" alt="delete icon" title="Delete">`;
    let xhr = new XMLHttpRequest();
    let method = "get";
    let url = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/";
    let apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
    let studentID = "2979011";
    let urlWithparameters = `${url}${studentID}`;

    // Output values to console for logging
    console.log(`getTasks function details`);
    console.log(`Method: ${method}`);
    console.log(`Url: ${url}`);
    console.log(`API Key: ${apiKey}`);
    console.log(`Student ID: ${studentID}`);
    console.log(`Url w/ Parameters: ${urlWithparameters}`);


    // Begin XHR request
    xhr.open(method, urlWithparameters);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", apiKey);

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {

            // JSON parsing (comment this section out for hardcoded testing)
            let data = JSON.parse(xhr.responseText);
            let tasks = data.Items;

            // Log preliminary console output
            console.log("...");
            console.log("Tasks will now be displayed");
            console.log("...");

            // Display all tasks contained within the database
            for (let i = 0; i < tasks.length; i++) {

                // Log task to console
                console.log(`${tasks[i].Description}`);

                // Display tasks on web page
                let output = `<li>${deleteIcon}  ${tasks[i].Description}</li><br />`;
                document.querySelector("#outputDiv").innerHTML += output;

                // Add event listener to trash can delete buttons
                document.querySelectorAll(".deleteTask").addEventListener("click", deleteTask); // incorporate into loop
            }

        }

    }

    xhr.send(null);

}


/* Controller function */
const init = () => {

    // Output placeholder for testing
    // placeholder();

    // Add event listener to Add Task button
    document.querySelector("#submitTask").addEventListener("click", addTask);

    // Retrieve existing to-do items from database
    getTasks();

}


// Initialize page
window.onload = init;