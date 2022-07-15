//<a class="navbar-brand" href="#">Smart Notes</a>

console.log("Welcome to smart note app.");
showNotes();

let addBtn = document.getElementById('addBtn');
let addTxt = document.getElementById("addTxt");
let addTitle = document.getElementById("addTitle");
addBtn.addEventListener("click", function (e) {
  

    if (addTitle.value=="" || addTxt.value == "") {
        return alert('Empty Note !! please "Add a Note" or a "Title" first. ')
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title:addTitle.value,
        text:addTxt.value
    }
    // notesObj.push(addTxt.value);
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value="";
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                 <h5 class="card-title text-dark">${element.title}</h5>
                    <p class="card-text ">${element.text}</p>
                    <div className="btnstyle d-flex ">
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-success text-light">Delete</button>
                    <button id="${index}" onclick="editNote(this.id)" class="btn btn-success text-light">Update</button>
                    </div>
                </div>
            </div>`;

    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = 'Nothing to show! Use "Add a Note" section above to add notes.'
    }
}

function deleteNote(index) {
    //console.log('I am deleting',index);
    let confirmDel = confirm('Are you sure ? you want to delete.');
   
    if(confirmDel==true){
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}
function editNote(index) {
   
    let notes = localStorage.getItem("notes");
    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert('Please "clear the form" first');
    }
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.findIndex((element, index) => {
        //addTxt.value = element;
        addTitle.value=element.title;
        addTxt.value=element.text;
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
   // .toLowerCase();

    //console.log('Input Event fired !',inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

