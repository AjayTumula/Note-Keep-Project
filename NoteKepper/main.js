

let noteRootElement = document.querySelector(".noteList");
let viewNoteRootElement = document.querySelector(".viewNote");
let noteDescriptionRoot = document.querySelector(".noteDescription");
let notes = [];

function renderNoteElementsToScreen() {
    if(localStorage.getItem('notes')){
        notes = JSON.parse(localStorage.getItem('notes'))
        notes.forEach(note => {
            renderNoteToList(note, note.uniqueID)
        })
    }
}


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
})

document.querySelector("#createNoteButton").addEventListener("click", ()=> {
     
    let uniqueID = 'note' + Math.floor(Math.random() * 1000);

    let note = {
        title: document.querySelector("#createNoteTitle").value,
        content: document.querySelector("#createNoteContent").value
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
    note = {...note, uniqueID};

    notes.push(note);
    
    localStorage.setItem('notes', JSON.stringify(notes))
}

renderNoteElementsToScreen()


for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const noteElement = document.querySelector(`.note.${note.uniqueID}`);
    noteElement.addEventListener("click", () => {
        console.log("clicked the id:", note.uniqueID);
        noteCreation.style.display = "none";
        viewNoteTitle.style.display = "block";
        renderViewNote(note);
        
        renderNoteDescription(note)
        noteDescription.style.display = "block";
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

    let deleteNoteButton = document.createElement('button');
    deleteNoteButton.innerText = 'DELETE NOTE';
    deleteNoteButton.id = 'deleteNoteButton';

    viewNoteDiv.appendChild(viewNoteTitle);
    viewNoteDiv.appendChild(newTaskButton);
    viewNoteDiv.appendChild(deleteNoteButton);
}

let noteDescriptionDiv;

function renderNoteDescription(note) {
    if(noteDescriptionDiv){
        noteDescriptionDiv.innerHTML = ' ';
    } else {
        noteDescriptionDiv = document.createElement('div');
        noteDescriptionDiv.classList.add('noteDescription');
        noteDescriptionRoot.appendChild(noteDescriptionDiv);
    }
    

    let noteDescriptionContent = document.createElement('p');
    noteDescriptionContent.innerText = note.content;
    noteDescriptionContent.id = 'noteContent'

    noteDescriptionDiv.appendChild(noteDescriptionContent);
}

