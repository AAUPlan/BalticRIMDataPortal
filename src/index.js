"use strict";



import { cases, panBalticCases } from "./public/js/data/cases";

import { map } from "./public/js/map";


map();
const token = localStorage.getItem("auth-token");

function populateUIWithCaseAreas(selection, cases) {
  // The goal of this function is to generate a accordion showing data from either of the two main categories Case Areas and Pan-Baltic
  const UI = selection;

  //Create a button for each top level Case area
  cases.map(topLevelArea => {
    const topLevelAccordionButton_ID = topLevelArea.name
      .toLowerCase()
      .replace(/ /g, "_");

    const topLevelAccordionButton = document.createElement("BUTTON");
    topLevelAccordionButton.innerHTML = topLevelArea.name;
    topLevelAccordionButton.classList = "waves-light btn accordion";
    topLevelAccordionButton.id = topLevelAccordionButton_ID;
    UI.appendChild(topLevelAccordionButton);

    const secondLevelContainer = document.createElement("div");
    secondLevelContainer.classList = "accordion-container level-two";
    secondLevelContainer.id = `${topLevelAccordionButton_ID}-container`;
    UI.appendChild(secondLevelContainer);

    topLevelArea.sites.map(secondLevelArea => {
      const secondLevelAccordionButton_ID = secondLevelArea.name
        .toLowerCase()
        .replace(/ /g, "_");

      const secondLevelAccordionButton = document.createElement("BUTTON");
      secondLevelAccordionButton.innerHTML = secondLevelArea.name;
      secondLevelAccordionButton.classList = "red btn accordion";
      secondLevelAccordionButton.id = `${topLevelAccordionButton_ID}-${secondLevelAccordionButton_ID}`;
      secondLevelContainer.appendChild(secondLevelAccordionButton);

      const thirdLevelContainer = document.createElement("div");
      thirdLevelContainer.classList = "accordion-container level-three";
      thirdLevelContainer.id = `${topLevelAccordionButton_ID}-${secondLevelAccordionButton_ID}-container`;
      secondLevelContainer.appendChild(thirdLevelContainer);

      //Areas with three levels of nesting
      if (secondLevelArea.sites) {
        secondLevelArea.sites.map(thirdLevelArea => {
          const thirdLevelAccordionButton = document.createElement("BUTTON");
          thirdLevelAccordionButton.innerHTML = thirdLevelArea.name;
          thirdLevelAccordionButton.classList = "blue btn accordion";
          thirdLevelAccordionButton.id = `${topLevelAccordionButton_ID}-${secondLevelAccordionButton_ID}-third`;
          thirdLevelContainer.appendChild(thirdLevelAccordionButton);

          const fourthLevelContainer = document.createElement("div");
          fourthLevelContainer.classList = "accordion-container level-four";
          fourthLevelContainer.id = `${topLevelAccordionButton_ID}-${secondLevelAccordionButton_ID}-third-container`;
          thirdLevelContainer.appendChild(fourthLevelContainer);
        });
      }
    });
  });
}

function accordionFunctionality() {
  const accordions = document.querySelectorAll(".accordion");

  for (let index = 0; index < accordions.length; index++) {
    accordions[index].addEventListener("click", event => {
      const target = `#${event.target.id}`;
      const content = document.querySelector(target).nextSibling; //Get the accordion content to toggle it below //IF THE ACCORDION IS DEEPER THIS NEEDS TO BE ADDED HERE

      //If max height = 0 (closed), then open.
      if (content.style.maxHeight) {
        //If open, close it.
        content.style.maxHeight = null;
        content.style.overflow = "hidden";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.overflow = "visible";
      }
    });
  }
}

function populateNavbar() {
  const navbar = document.querySelector("#nav-get-verified");

  // If the user has an authorized token in local storage, the UI will change
  if (!token) {
    const linkToLogin = document.createElement("a");
    linkToLogin.href = "/login.html";
    linkToLogin.innerHTML = "Log in";
    linkToLogin.classList = "waves-effect waves-light btn";

    const linkToRegister = document.createElement("a");
    linkToRegister.href = "register.html";
    linkToRegister.innerHTML = "Register";
    linkToRegister.classList = "waves-effect waves-light btn";

    navbar.appendChild(linkToLogin);
    navbar.appendChild(linkToRegister);
  } else {
    const logoutBtn = document.createElement("BUTTON");
    logoutBtn.innerHTML = "Log out";
    logoutBtn.classList = "waves-effect waves-light btn";
    navbar.appendChild(logoutBtn);

    logoutBtn.addEventListener("click", event => {
      localStorage.removeItem("auth-token");
      window.open("/index.html", "_self");
    });
  }
}

const localSelection = document.querySelector("#selectableContent");
const panSelection = document.querySelector("#selectableContentPan");
panSelection.style.display = "none";
populateNavbar();
populateUIWithCaseAreas(localSelection, cases); //Cases come from the global scope - js/data/cases.js
populateUIWithCaseAreas(panSelection, panBalticCases); //Cases come from the global scope - js/data/cases.js
accordionFunctionality();

//THE FOLLOWING FUNCTIONS ARE CALLED onClick - SEE index.html

const toggleLocalCases = document.querySelector("#display-local-cases");
const togglePanBalticCases = document.querySelector(
  "#display-pan-baltic-cases"
);

toggleLocalCases.addEventListener("click", displayLocalCases);
togglePanBalticCases.addEventListener("click", displayPanBalticCases);

function displayLocalCases() {
  const ActiveUI = document.querySelector("#selectableContent");
  ActiveUI.style.display = "flex";
  const UI = document.querySelector("#selectableContentPan");
  DESTROYCONTENT(UI);
}

function displayPanBalticCases() {
  const ActiveUI = document.querySelector("#selectableContentPan");
  ActiveUI.style.display = "flex";
  const deactiveUI = document.querySelector("#selectableContent");
  DESTROYCONTENT(deactiveUI);
}

function DESTROYCONTENT(selection) {
  selection.style.display = "none";
}














