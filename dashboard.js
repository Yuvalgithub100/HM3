function showVisitedAnimals() {
  const visitedAnimalstStringify = localStorage.getItem("visitingAnimal");
  visitedAnimals = JSON.parse(visitedAnimalstStringify);
  const visitedAnimalsContainer = document.getElementById("visited-animals");
  const renderedAnimalNames = [];

  visitedAnimals.forEach((animal) => {
    if (!renderedAnimalNames.includes(animal.name)) {
      const template = `<div id="cards" >
      <div>${animal.name}</div>
    </div>`;
      visitedAnimalsContainer.innerHTML += template;
      renderedAnimalNames.push(animal.name);
    }
  });
}

showVisitedAnimals();

function showFeededAnimals() {
  const animalIfeedstringify = localStorage.getItem("fedAnimals");
  fedAnimals = JSON.parse(animalIfeedstringify);
  const fedAnimalContainer = document.getElementById("feeded-animals");
  const renderedAnimalNames = [];

  fedAnimals.forEach((animal) => {
    if (!renderedAnimalNames.includes(animal.name)) {
      const template = `<div id="cards" ">
      <div>${animal.name}</div>
    </div>`;
      fedAnimalContainer.innerHTML += template;
      renderedAnimalNames.push(animal.name);
    }
  });

  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי האכיל אותן
}

showFeededAnimals();

function showFavoriteAnimal() {
  const visitingAnimalStringify = localStorage.getItem("visitingAnimal");
  let visitingAnimal = JSON.parse(visitingAnimalStringify) || [];

  const animalVisitCount = {};
  console.log(animalVisitCount);
  visitingAnimal.forEach((animal) => {
    animalVisitCount[animal.name] = (animalVisitCount[animal.name] || 0) + 1;
  });

  let mostVisitedAnimal = null;
  let mostVisits = 0;
  for (const animal in animalVisitCount) {
    if (animalVisitCount[animal] > mostVisits) {
      mostVisitedAnimal = animal;
      mostVisits = animalVisitCount[animal];
    }
  }

  return mostVisitedAnimal;

  //ממשו את הלוגיקה שמציגה את החיה שהאורח ביקר הכי הרבה פעמים אצלה
}
showFavoriteAnimal();

function renderFavoriteAnimal() {
  const favoriteAnimal = showFavoriteAnimal();
  const favoriteAnimalsContainer = document.getElementById("favorite-animal");

  if (favoriteAnimalsContainer) {
    favoriteAnimalsContainer.textContent = ` ${favoriteAnimal}`;
  }
}
window.addEventListener("load", renderFavoriteAnimal);

function renderNavBar() {
  const nav = document.createElement("nav");
  nav.classList.add("bar");
  const storedVisitorInfo = localStorage.getItem("selectedVisitor");
  const selectedVisitor = JSON.parse(storedVisitorInfo);
  const foundVisitor = visitors.find(
    (visitor) => visitor.name === selectedVisitor.name
  );

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("resetBtn");
  const dashboard = document.createElement("button");
  dashboard.classList.add("dashboard");
  const logoutBtn = document.createElement("button");
  dashboard.classList.add("logoutBtn");

  dashboard.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  resetBtn.addEventListener("click", () => {
    localStorage.clear();
  });

  logoutBtn.addEventListener("click", logout);
  nav.innerHTML = `
  
  <ul>
  <li> Visitor: ${selectedVisitor.name}   </li>
  <li>Coins: ${foundVisitor.coins}💰  </li>
  <li >Change Visitor: <select class="dropdown-content" id="guestDropdown"></select></li>
  <button id="reset">${resetBtn.innerHTML}Reset</button>
  <button id="dashborad">${dashboard.innerHTML}My dashboard</button>
  <button id="logoutBtn">${logoutBtn.innerHTML}LogOut</button>
  </ul>

  
  
  `;
  document.body.insertAdjacentElement("afterbegin", nav);
}

function visitorsOption() {
  const visitors = JSON.parse(localStorage.getItem("visitors"));
  console.log(visitors);

  const dropdown = document.getElementById("guestDropdown");
  dropdown.innerHTML = "";

  visitors.forEach((visitor) => {
    const option = document.createElement("option");
    option.textContent = visitor.name;
    dropdown.appendChild(option);
  });
}

// function changeVisitor{

// }

renderNavBar();
visitorsOption();
