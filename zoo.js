// function renderAvailableAnimals() {

const animalListStringify = localStorage.getItem("animals");
animals = JSON.parse(animalListStringify);

let filterForview = [...animals];

aminalsForView = [...animals];

const getAnimalHTMLCard = (animal) => {
  console.log(animal);
  const template = `<div id="cards" class="card">
  <div id="${animal.name}"> ${animal.name}</div>
  <div><img  class="picture" src="${animal.picture}" /></div>
  
  </div>`;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template;
  return wrapper;
};

const getSearchBox = () => {
  const queryInput = document.createElement("input");
  queryInput.id = "query-input";
  queryInput.placeholder = "Search animals";
  queryInput.className = "form-control_my-4";
  queryInput.oninput = (e) => {
    const query = e.target.value.toLowerCase(); // Convert search query to lowercase
    aminalsForView = animals.filter((animal) =>
      animal.name.toLowerCase().includes(query)
    );

    renderAnimels();
  };

  return queryInput;
};

const renderAnimels = () => {
  const animelCards = aminalsForView.map(getAnimalHTMLCard);
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.innerHTML = " ";

  if (!animelCards.lenghth) {
    // alert("No results");
  }
  animalPlaceholder.append(...animelCards);
};
document.body.insertAdjacentElement("afterbegin", getSearchBox());
window.addEventListener("load", renderAnimels);

const renderFilteredAnimels = () => {
  const animelCards = filterForview.map(getAnimalHTMLCard);
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.innerHTML = " ";

  if (!animelCards.lenghth) {
    // alert("No results");
  }
  animalPlaceholder.append(...animelCards);
};

window.addEventListener("load", renderFilteredAnimels);

// ממשו את הלוגיקה שמרנדרת את החיות לתוך הדיב עם האיידי animal-cards
// וודאו שאתם מציגים אך ורק את החיות שעומדות בפילטורים הנוכחיים
// במידה ואין פילטרים מסומנים, הציגו את כל החיות

// }

window.addEventListener("load", function () {
  const chooseAnimal = document.querySelectorAll("#cards");
  chooseAnimal.forEach((card) => {
    card.addEventListener("click", function (event) {
      event.preventDefault();
      const animalName = card.querySelector("div[id]").id;
      alert(animalName);

      localStorage.setItem(
        "selectedanimal",
        JSON.stringify({ name: animalName })
      );

      if (localStorage.getItem("visitingAnimal")) {
        const stringifiedvisitingAnimal =
          localStorage.getItem("visitingAnimal");
        visitingAnimal = JSON.parse(stringifiedvisitingAnimal);
      } else {
        visitingAnimal = [];
      }

      const visitingAnimalName = { name: animalName };

      visitingAnimal.push(visitingAnimalName);

      const stringifiedvisitingAnimal = JSON.stringify(visitingAnimal);

      localStorage.setItem("visitingAnimal", stringifiedvisitingAnimal);

      window.location.href = "animal.html";
    });
  });
});

// function setFilter(filterKey, filterValue) {}
const checkboxPraditor = document.getElementById("isPredator");
checkboxPraditor.addEventListener("change", function (event) {
  if (event.target.checked) {
    filterForview = filterForview.filter(
      (animal) => animal.isPredator === true
    );
    localStorage.setItem("filterdAnimals", JSON.stringify(filterForview));

    renderFilteredAnimels();
  } else {
    renderAnimels();
  }
});

document.querySelectorAll('[name="habitat"]').forEach((radio) => {
  radio.addEventListener("change", function (event) {
    if (event.target.value === "land") {
      filterForview = filterForview.filter(
        (animal) => animal.habitat === "land"
      );

      localStorage.setItem("filterdAnimals", JSON.stringify(filterForview));
      renderFilteredAnimels();
    } else {
      filterForview = filterForview.filter(
        (animal) => animal.habitat === "sea"
      );
      localStorage.setItem("filterdAnimals", JSON.stringify(filterForview));
      renderFilteredAnimels();
    }
  });
});

const weightInput = document.getElementById("weightFilter");

weightInput.oninput = (e) => {
  const query = e.target.value; // Convert search query to lowercase
  filterForview = filterForview.filter((animal) => animal.weight == query);
  localStorage.setItem("filterdAnimals", JSON.stringify(filterForview));
  renderFilteredAnimels();
};

const heightInput = document.getElementById("heightFilter");

heightInput.oninput = (e) => {
  const query = e.target.value; // Convert search query to lowercase
  filterForview = filterForview.filter((animal) => animal.height == query);
  localStorage.setItem("filterdAnimals", JSON.stringify(filterForview));
  renderFilteredAnimels();
};

const colorSelect = document.getElementById("colorFilter");

colorSelect.addEventListener("change", function (event) {
  const selectedColor = colorSelect.value;
  filterForview = filterForview.filter(
    (animal) => animal.color === selectedColor
  );
  localStorage.setItem("filterdAnimals", JSON.stringify(filterForview));
  renderFilteredAnimels();
});

/**
 * ממשו את הלוגיקה של השמת פילטר
 * הפילטרים הקיימים הם
 * isPredator: true | false
 * habitat: "land" | "sea"
 * weight: value > user selected weight
 * height: value > user selected height
 * color: dropdown of all available colors
 */
// ודאו כי אתם שומרים את הפילטרים שהיוזר בחר בלוקל סטורג׳ וטוענים אותם בהתאם
// רנדרו רק את החיות שעומדות בתנאים של הפילטרים
function renderNavBar() {
  const nav = document.createElement("nav");
  nav.classList.add("bar");
  const storedVisitorInfo = localStorage.getItem("selectedVisitor");
  const selectedVisitor = JSON.parse(storedVisitorInfo);
  const foundVisitor = visitors.find(
    (visitor) => visitor.name === selectedVisitor.name
  );

  nav.innerHTML = `
  
  <ul>
  <li id="liName"> Visitor: ${selectedVisitor.name}   </li>
  <li id="liCoins">Coins: ${foundVisitor.coins}💰  </li>
  <li >Change Visitor: <select class="dropdown-content" id="guestDropdown"></select></li>
  <li><button id="cleanBtn">Reset</button></li>
  <li><button><a href="dashboard.html">Dashboard</a></button></li>
  <li><button id="LogoutBtn">Logout</button></li>
 
  </ul>

  
  
  `;

  document.body.insertAdjacentElement("afterbegin", nav);
  visitorsOption(selectedVisitor.name);

  const cleanBtn = document.getElementById("cleanBtn");
  cleanBtn.addEventListener("click", cleanApplication);
  const LogoutBtn = document.getElementById("LogoutBtn");
  LogoutBtn.addEventListener("click", disconnectVisitor);
}

function disconnectVisitor() {
  alert(`You have logout, now you can choose new visitor`);
  localStorage.removeItem("selectedVisitor");

  // Reload the page
  window.location.href = "login.html";
}

function cleanApplication() {
  // Clear local storage
  localStorage.clear();
  // Reload the page
  window.location.reload();
}

function visitorsOption(selectedVisitorName) {
  const visitors = JSON.parse(localStorage.getItem("visitors"));

  const dropdown = document.getElementById("guestDropdown");
  dropdown.innerHTML = "";

  visitors.forEach((visitor) => {
    const option = document.createElement("option");
    option.textContent = visitor.name;
    dropdown.appendChild(option);

    if (visitor.name === selectedVisitorName) {
      option.selected = true; // Set the selected attribute to true
    }
  });
}

renderNavBar();

function ChangeVisitor() {
  const dropdown = document.getElementById("guestDropdown");
  const visitorNameLi = document.getElementById("liName");
  const visitorCoinsLi = document.getElementById("liCoins");
  const storedVisitorInfo = localStorage.getItem("selectedVisitor");
  const selectedVisitor = JSON.parse(storedVisitorInfo);

  dropdown.addEventListener("change", () => {
    const selectedVisitorName = dropdown.value;

    // Get the visitor object from local storage

    // Find the visitor with the selected name
    const selectedVisitor = visitors.find(
      (visitor) => visitor.name === selectedVisitorName
    );

    // const selectedVisitorCoins = visitors.find(
    //   (visitor) => visitor.name === selectedVisitorName
    // );

    // Check if a visitor with the selected name exists
    if (selectedVisitor) {
      // Update the selected visitor in local storage
      localStorage.setItem("selectedVisitor", JSON.stringify(selectedVisitor));

      // Update the <li> element with the new name
      visitorNameLi.textContent = `Visitor: ${selectedVisitor.name}`;
      visitorCoinsLi.textContent = `Coins: ${selectedVisitor.coins}💰`;
    }
  });
}

ChangeVisitor();
