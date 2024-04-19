

let noteRootElement = document.querySelector(".noteList");
let viewNoteRootElement = document.querySelector(".viewNote");
let notes = [];
let viewNotes = [];


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

let noteDescription = document.querySelector("#noteDescription");
noteDescription.style.display = "none";

let newTask = document.querySelector(".newTask");
newTask.style.display = "none";

document.querySelector(".newNote").addEventListener("click", ()=> {
    noteCreation.style.display = "block";
   
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
    notediv.classList.add('note',  uniqueID);

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



document.querySelector('.note').addEventListener('click', ()=> {
    let uniqueID = 'note' + Math.floor(Math.random() * 1000);
    viewNoteTitle.style.display = "block";

    if(localStorage.getItem('notes')) {
        viewNotes = JSON.parse(localStorage.getItem('notes'));
        viewNotes.forEach(note => {
            renderViewNote(note, uniqueID)
            console.log('.' + uniqueID)
        })
    }
})



function renderViewNote(viewNote, uniqueID){
    let viewNoteDiv = document.createElement('div')
    viewNoteDiv.classList.add('viewNote', uniqueID);

    let viewNoteTitle = document.createElement('h5');
    viewNoteTitle.innerText = viewNote.title;

    let newTaskButton = document.createElement('button');
    newTaskButton.innerText = 'NEW TASK';

    let deleteNoteButton = document.createElement('button');
    deleteNoteButton.innerText = 'DELETE NOTE';

    viewNoteDiv.appendChild(viewNoteTitle);
    viewNoteDiv.appendChild(newTaskButton);
    viewNoteDiv.appendChild(deleteNoteButton);

    viewNoteRootElement.appendChild(viewNoteDiv)

}