
//get todo list
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        console.log(todos);
        for (var i = todos.length - 1; i >= 0; i--) {
            var ul = document.getElementById("todo-list");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(todos[i].text));
            li.setAttribute("id", todos[i].id); // added line

            let todoID = todos[i].id
            let todoText = todos[i].text
            let checkStatus = todos[i].completed


            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.value = 1;
            checkbox.name = "todo" + todos[i].id;
            //check the checkbox 
            if (checkStatus) {
                checkbox.checked = true
            }
            else {
                checkbox.checked = false
            }
            checkbox.addEventListener("click", function (event) {
                console.log(checkStatus)
                if (checkStatus == false) {
                    checkStatus = true
                    checkTodo(todoID, checkStatus)
                }
                else {
                    checkStatus = false
                    checkTodo(todoID, checkStatus)

                }
            });
            //todos[i].completed = checkStatus



            //added delete button
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            //deletes from thelist
            deleteButton.addEventListener("click", function (event) {
                //delete the parent li
                this.parentNode.parentNode.removeChild(this.parentNode);
                deleteTodo(todoID, todoText)
            });

            li.appendChild(checkbox)
            li.appendChild(deleteButton);
            ul.appendChild(li);
        }
        //add an array
    }
};

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key", "8b8930-acc2e9-511974-b5061e-5ad11e");
xhttp.send();

//ajax calls
//https://stackoverflow.com/questions/20673959/how-to-add-new-li-to-ul-onclick-with-javascript
function todoAjax(id) {
    var value = document.getElementById(id).value;
    //alert(value);

    // Setting variable for form input (get from HTML form)
    var data = {
        text: value
    }

    //Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();

    // Response handler
    xhttp2.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var todo = JSON.parse(this.responseText);


            console.log(todo);
            var ul = document.getElementById("todo-list");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(todo.text));
            li.setAttribute("id", todo.id); // added line
            //added delete button
            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            let todoID = todo.id
            let todoText = todo.text
            let checkStatus = todo.completed


            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.value = 1;
            checkbox.name = "todo" + todo.id;
            //check the checkbox 
            if (checkStatus) {
                checkbox.checked = true
            }
            else {
                checkbox.checked = false
            }
            checkbox.addEventListener("click", function (event) {
                console.log(checkStatus)
                if (checkStatus == false) {
                    checkStatus = true
                    checkTodo(todoID, checkStatus)
                }
                else {
                    checkStatus = false
                    checkTodo(todoID, checkStatus)

                }
            });


            //deletes it from the list
            deleteButton.addEventListener("click", function (event) {
                //delete the parent li
                this.parentNode.parentNode.removeChild(this.parentNode);
                deleteTodo(todoID, todoText)
            });


            li.appendChild(checkbox)
            li.appendChild(deleteButton);

            //li.setAttribute("id", "element4");
            ul.appendChild(li);
            alert("Your message has been added.");


        } else if (this.readyState == 4) {

            // this.status !== 200, error from server
            console.log(this.responseText);

        }
    };

    xhttp2.open("POST", "https://cse204.work/todos", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "8b8930-acc2e9-511974-b5061e-5ad11e");
    xhttp2.send(JSON.stringify(data));
}


function checkTodo(checkId, checkStatus) {
    // Setting variable for form input (get from HTML form)
    console.log(checkStatus)
    var data = {
        completed: checkStatus
    }

    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();

    // Response handler
    xhttp2.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var todo = JSON.parse(this.responseText);

            console.log(todo);

        } else if (this.readyState == 4) {

            // this.status !== 200, error from server
            console.log(this.responseText);

        }
    };

    xhttp2.open("PUT", "https://cse204.work/todos/" + checkId, true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "8b8930-acc2e9-511974-b5061e-5ad11e");
    xhttp2.send(JSON.stringify(data));
}



function deleteTodo(deleteId, deleteTodo) {
    console.log("inside the delete todo function")
    // Setting variable for ToDo id

    var data = {
        text: deleteTodo
    }

    var id = deleteId;

    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();

    // Response handler
    xhttp2.onreadystatechange = function () {

        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {

            // parse JSON response
            var todo = JSON.parse(this.responseText);

            console.log(todo);

        } else if (this.readyState == 4) {

            // this.status !== 200, error from server
            console.log(this.responseText);

        }
    };

    xhttp2.open("DELETE", "https://cse204.work/todos/" + deleteId, true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.setRequestHeader("x-api-key", "8b8930-acc2e9-511974-b5061e-5ad11e");
    xhttp2.send(JSON.stringify(data));

}


