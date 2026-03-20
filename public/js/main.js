async function confirmationModal(context, categoryTF) {
  let modalActive = false;
  if (!modalActive) {
    modalActive = true;

    let popup = document.createElement("div");
    let heading = document.createElement("h1");
    heading.textContent = "Delete Confirmation";
    popup.appendChild(heading);
    let disclaimer = document.createElement("p");
    disclaimer.textContent = `Are you sure you want to delete ${context}`;
    if (categoryTF === true) {
      disclaimer.textContent += ", and all of its items";
    }
    popup.appendChild(disclaimer);
    let decisionButtons = document.createElement("div");
    let confirmButton = document.createElement("button");
    confirmButton.type = "button";
    confirmButton.textContent = "Confirm";
    let cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    decisionButtons.appendChild(confirmButton);
    decisionButtons.appendChild(cancelButton);
    popup.appendChild(decisionButtons);

    confirmButton.addEventListener("click", () => {
      (popup.remove(), Promise.resolve(true));
    });
    cancelButton.addEventListener("click", () => {
      (popup.remove(), Promise.resolve(false));
    });
    //so these will return a promise with a value of true or false, and so you can check if true then delete, else don't
    document.querySelector("body").appendChild(popup);

    popup.style.position = "absolute";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.border = "1px solid black";
    popup.style.backgroundColor = "grey";
    popup.style.padding = "1%";
  }
}
