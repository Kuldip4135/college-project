const alertBox = document.querySelector(".alertBox");

//If you want to copyText from Element
function copyTextFromElement(elementID) {
  let element = document.getElementById(elementID); //select the element
  let elementText = element.textContent; //get the text content from the element
  copyText(elementText); //use the copyText function below
  alertBox.textContent = `Copied : ${elementText}`;
  alertBox.classList.add("active");

  setTimeout(() => {
    alertBox.classList.remove("active");
  }, 3000);
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}
