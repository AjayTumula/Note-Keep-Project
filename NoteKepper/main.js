

let noteRootElement = document.querySelector(".noteList");
let viewNoteRootElement = document.querySelector(".viewNote");
let noteDescriptionRoot = document.querySelector(".noteDescription");
let newTaskRootElement = document.querySelector(".newTask");
let notes = [];
// /let tasks =  [];

let fileInfo = document.querySelector(".fileInfo");
fileInfo.style.display = "none";

let noteCreation = document.querySelector(".noteCreation");
noteCreation.style.display = "none";

let viewNoteTitle = document.querySelector('.viewNote');
viewNoteTitle.style.display = "none";

let noteDescription = document.querySelector(".noteDescription");
noteDescription.style.display = "none";

let newTask = document.querySelector(".newTask");
newTask.style.display = "none";


document.querySelector(".newNote").addEventListener("click", ()=> {
    noteCreation.style.display = "block";
    viewNoteTitle.style.display = "none";
    noteDescription.style.display = "none";
    newTask.style.display = "none";
})

document.querySelector("#createNoteButton").addEventListener("click", ()=> {   
    
    let uniqueID = 'note' + Math.floor(Math.random() * 1000);

    let note = {
        title: document.querySelector("#createNoteTitle").value,
        content: document.querySelector("#createNoteContent").value,
        uniqueID: uniqueID,
        tasks: []
    }

    if(document.querySelector("#createNoteTitle").value == "" || document.querySelector("#createNoteContent").value == ""){
        alert("The fields are empty")
    } else {
        addNoteToLocalStorage(note, uniqueID);
        renderNoteToList(note, uniqueID);
        noteCreation.style.display = "none";
    } 
})


function renderNoteToList(note, uniqueID) {

    let notediv = document.createElement("div");
    notediv.classList.add('note', uniqueID);

    let noteTitle = document.createElement("h5");
    let noteContent = document.createElement("p");

    noteTitle.innerText = note.title;
    noteContent.innerText = note.content;

    notediv.appendChild(noteTitle);
    notediv.appendChild(noteContent);

    noteRootElement.appendChild(notediv);

    document.querySelector("#createNoteTitle").value = "";
    document.querySelector("#createNoteContent").value = "";
    
}

function addNoteToLocalStorage(note, uniqueID) {
    note = {...note, uniqueID,  tasks: []};
    notes.push(note);    
    localStorage.setItem('notes', JSON.stringify(notes))
}

function renderNoteElementsToScreen() {
   
    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'))
        notes.forEach(note => {
            renderNoteToList(note, note.uniqueID)
        })
    } 
}

renderNoteElementsToScreen()


for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const noteElement = document.querySelector(`.note.${note.uniqueID}`);

    console.log(`.note.${note.uniqueID}`)

    noteElement.addEventListener("click", () => {


        console.log(note.uniqueID)
        console.log(note.tasks)
        noteCreation.style.display = "none";
        newTask.style.display = "none";
        viewNoteTitle.style.display = "block";
        renderViewNote(note);    
        noteDescription.style.display = "block";  
        renderNoteTasksToDescription(note); 

    });
}

let viewNoteDiv; 


function renderViewNote(note) {
    if (viewNoteDiv) {
        viewNoteDiv.innerHTML = ''; 
    } else {
        viewNoteDiv = document.createElement('div');
        viewNoteDiv.classList.add('viewNote'); 
        viewNoteRootElement.appendChild(viewNoteDiv);
    }

    let viewNoteTitle = document.createElement('h5');
    viewNoteTitle.innerText = note.title;   

    let newTaskButton = document.createElement('button');
    newTaskButton.innerText = 'NEW TASK';
    newTaskButton.id = 'newTaskButton';

    newTaskButton.addEventListener("click", ()=> {
        newTaskRootElement.style.display = "block";
        BgToBlur()
        renderNewTask(note)
    })

    let deleteNoteButton = document.createElement('button');
    deleteNoteButton.innerText = 'DELETE NOTE';
    deleteNoteButton.id = 'deleteNoteButton';

    viewNoteDiv.appendChild(viewNoteTitle);
    viewNoteDiv.appendChild(newTaskButton);
    viewNoteDiv.appendChild(deleteNoteButton);
}



// let noteDescriptionDiv;

// function renderNoteDescription(note) {
//     if(noteDescriptionDiv){
//         noteDescriptionDiv.innerHTML = ' ';
//     } 
//     noteDescriptionDiv = document.createElement('div');

//     let noteDescriptionContent = document.createElement('p');
//     noteDescriptionContent.innerText = note.content;
  
//     noteDescriptionDiv.appendChild(noteDescriptionContent);
    
//     noteDescriptionRoot.appendChild(noteDescriptionDiv); 
//     renderNoteTasksToDescription(note)
 
// }


let newTaskDiv;

function renderNewTask(note){
 
    newTaskDiv = document.createElement('div');
    newTaskDiv.classList.add('newTask');
    newTaskRootElement.appendChild(newTaskDiv);

    let newTask = document.createElement('input');
    newTask.id = 'inputTask';

    let taskButton = document.createElement('button');
    taskButton.innerText = "CREATE TASK";
    taskButton.id = "createTaskButton";

    taskButton.addEventListener("click", ()=> {
        let uniqueID = 'task' + Math.floor(Math.random() * 1000);

        let task = newTask.value;

        if(task !== ""){
            addTasksToNoteLocalStorage(note, task);
           
            renderNoteTasksToDescription(note)
              
            newTask.value = ""; 
            BgBackToNormal();
            newTaskRootElement.style.display = "none";
        } else {
            alert("Task field is empty");
        }   
    })

    newTaskDiv.appendChild(newTask);
    newTaskDiv.appendChild(taskButton);
}


function addTasksToNoteLocalStorage(note, task) {
    let notes = JSON.parse(localStorage.getItem('notes'));
    note.tasks.push(task)
    // console.log(note.tasks)
    let index = notes.findIndex(item => item.uniqueID === note.uniqueID);
    console.log(index);


    if (index !== -1) {
        if (!notes[index].tasks) {  // Ensure note.tasks is initialized
            notes[index].tasks = [];
        }
        notes[index].tasks.push(task);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}


function renderNoteTasksToDescription(note) {
    
    let tasksDiv = document.createElement('div');
    tasksDiv.classList.add('tasksList');

    let taskUncheckDiv = document.createElement('div');
    taskUncheckDiv.classList.add("taskUncheck");

    let noteDescriptionContent = document.createElement('p');
    noteDescriptionContent.innerText = note.content;

    tasksDiv.appendChild(noteDescriptionContent);

    let noteTasks = note.tasks || []; 

    if (Array.isArray(noteTasks)) {
        noteTasks.forEach((task, index) => {
            let taskDiv = document.createElement('div');
            taskDiv.classList.add('task');

            let inputId = `taskInput_${note.uniqueID}_${index}`;
            let inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.id = inputId;
            inputElement.name = `taskInput_${note.uniqueID}`;

            let spanElement = document.createElement('span');
            spanElement.innerText = task;

            let labelElement = document.createElement('label');
            labelElement.setAttribute('for', inputId);
            labelElement.appendChild(inputElement);
            labelElement.appendChild(spanElement);

            taskDiv.appendChild(labelElement);
            taskUncheckDiv.appendChild(taskDiv);
        });
    }
  

    tasksDiv.appendChild(taskUncheckDiv);
  
    noteDescriptionRoot.innerHTML = '';
    noteDescriptionRoot.appendChild(tasksDiv);
     
}



function BgToBlur() {
        noteDescription.style.opacity = "0.1";
        viewNoteDiv.style.opacity = "0.1";
        noteRootElement.style.opacity = "0.1";
        document.querySelector('#noteListImage').style.opacity = '0.1';
        document.querySelector('#noteListButton').style.opacity = '0.1';
}

function BgBackToNormal() {
        noteDescription.style.opacity = "1";
        viewNoteDiv.style.opacity = "1";
        noteRootElement.style.opacity = "1";
        document.querySelector('#noteListImage').style.opacity = '1';
        document.querySelector('#noteListButton').style.opacity = '1';
}


