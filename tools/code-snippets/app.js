//Selectors
const snippetInput = document.getElementById("input");
const snippetButton = document.getElementById("addSnippet");
const snippetsContainer = document.querySelector(".snippets__container");

//Event Listeners
document.addEventListener("DOMContentLoaded", getLocalSnippets);
snippetButton.addEventListener("click", addSnippet);
snippetsContainer.addEventListener("click", Delete);

//Function To Add Snippet
function addSnippet(event) {
  event.preventDefault();

  const snippetDiv = document.createElement("div");
  snippetDiv.classList.add("snippet");

  //create our deleteText button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("deleteBtn");
  snippetDiv.appendChild(deleteButton);

  //create para for snippet
  const snippetPara = document.createElement("p");
  snippetPara.innerText = snippetInput.value;
  snippetPara.classList.add("snippetCode");
  snippetDiv.appendChild(snippetPara);

  //add to local storage
  saveLocalSnippets(snippetInput.value);

  //append everything to our container
  snippetsContainer.appendChild(snippetDiv);

  //clear input value
  snippetInput.value = "";
}

function Delete(e) {
  const item = e.target;

  //delete snippet
  if (item.classList[0] === "deleteBtn") {
    const itemSnippet = item.parentElement;
    //animation
    removeLocalSnippet(itemSnippet);
    itemSnippet.classList.add("deleted");
    itemSnippet.addEventListener("transitionend", () => itemSnippet.remove());
  }
}

function saveLocalSnippets(snippet) {
  //check we have alredy or not
  let snippets;
  if (localStorage.getItem("snippets") === null) snippets = [];
  else snippets = JSON.parse(localStorage.getItem("snippets"));

  snippets.push(snippet);

  localStorage.setItem("snippets", JSON.stringify(snippets));
}

function getLocalSnippets() {
  let snippets;
  if (localStorage.getItem("snippets") === null) snippets = [];
  else snippets = JSON.parse(localStorage.getItem("snippets"));

  snippets.forEach(function (snippet) {
    //create div
    const snippetDiv = document.createElement("div");
    snippetDiv.classList.add("snippet");

    //create our deleteText button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("deleteBtn");
    snippetDiv.appendChild(deleteButton);

    //create para for snippet
    const snippetPara = document.createElement("p");
    snippetPara.innerText = snippet;
    snippetPara.classList.add("snippetCode");
    snippetDiv.appendChild(snippetPara);

    //append everything to our container
    snippetsContainer.appendChild(snippetDiv);
  });
}

function removeLocalSnippet(snippet) {
  let snippets;
  if (localStorage.getItem("snippets") === null) snippets = [];
  else snippets = JSON.parse(localStorage.getItem("snippets"));

  //   const todoIndex = todo.children[0].innerText;
  //   todos.splice(todos.indexOf(todoIndex), 1);
  //   localStorage.setItem("todos", JSON.stringify(todos));

  const snippetIndex = snippet.children[0].innerText;
  snippets.splice(snippets.indexOf(snippetIndex), 1);
  localStorage.setItem("snippets", JSON.stringify(snippets));
}
