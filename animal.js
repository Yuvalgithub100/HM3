//המטבעות מתעדכנים בלוקל סטורג אבל לא הצלחנו להציג אותם בnavbar

function renderAnimal() {
  window.addEventListener("load", function () {
    const storedAnimalInfo = localStorage.getItem("selectedanimal");

    if (storedAnimalInfo) {
      const selectedAnimal = JSON.parse(storedAnimalInfo);
      document.getElementById(
        "image"
      ).innerHTML = `<img id="img" src="${selectedAnimal.picture}" alt="Animal Image"/>`;

      const foundAnimal = animals.find(
        (animal) => animal.name === selectedAnimal.name
      );

      if (foundAnimal) {
        document.getElementById("name").innerHTML = foundAnimal.name;
        document.getElementById("weight").innerHTML = foundAnimal.weight;
        document.getElementById("height").innerHTML = foundAnimal.height;
        document.getElementById("color").innerHTML = foundAnimal.color;
        document.getElementById("habitat").innerHTML = foundAnimal.habitat;
        document.getElementById("isPredator").innerHTML =
          foundAnimal.isPredator;
      }
      localStorage.setItem("selectedanimal", JSON.stringify(foundAnimal));
    }
  });
}

renderAnimal();

const getAnimalHTMLCard = (animal) => {
  const template = `<div id="cards" class="card">
  <div id="${animal.name}"> ${animal.name}</div>
  <div><img class="picture" src="${animal.picture}" /></div>
  
  </div>`;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = template;
  return wrapper;
};

const renderHabitatAnimels = () => {
  const foundAnimal = JSON.parse(localStorage.getItem("selectedanimal"));
  const animelCards = animals.filter(
    (animal) =>
      animal.habitat === foundAnimal.habitat && animal.name !== foundAnimal.name
  );
  const animalPlaceholder = document.getElementById("related-animals");
  animalPlaceholder.innerHTML = " ";

  animelCards.forEach((animal) => {
    const card = getAnimalHTMLCard(animal);
    animalPlaceholder.appendChild(card);
  });
};

window.addEventListener("load", renderHabitatAnimels);

function renderRelatedAnimals() {
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
  // רנדרו אותן לתוך הדיב שמיועד להן עם האיידי related-animals
  // ממשו את אותה לוגיקה של כרטיסיית חיה כמו בכרטיסיות בעמוד zoo.html
}

function feedAnimal() {
  const dialogElem = document.getElementById("dialog");
  const feedBtn = document.querySelector("#feed-animal");
  const closeBtn = document.querySelector(".close");

  feedBtn.addEventListener("click", () => {
    const selectedAnimal = JSON.parse(localStorage.getItem("selectedanimal"));

    if (selectedAnimal) {
      const fedAnimals = JSON.parse(localStorage.getItem("fedAnimals")) || [];

      fedAnimals.push(selectedAnimal);

      localStorage.setItem("fedAnimals", JSON.stringify(fedAnimals));
    }

    const storedVisitorInfo = localStorage.getItem("selectedVisitor");
    const selectedVisitor = JSON.parse(storedVisitorInfo);
    const foundVisitor = visitors.find(
      (visitor) => visitor.name === selectedVisitor.name
    );

    console.log(foundVisitor);

    localStorage.setItem("selectedVisitor", JSON.stringify(foundVisitor));
    foundVisitor.coins -= 2;
    localStorage.setItem("selectedVisitor", JSON.stringify(foundVisitor));

    // const AnimalInfo = JSON.parse(localStorage.getItem("selectedanimal"));

    if (foundVisitor.coins >= 0) {
      dialogElem.showModal();
    }

    if (foundVisitor.coins < 0 && AnimalInfo.isPredator === true) {
      let NewVisitorsList = JSON.parse(localStorage.getItem("visitors"));

      NewVisitorsList = NewVisitorsList.filter(
        (visitor) => visitor.name !== foundVisitor.name
      );

      localStorage.setItem("visitors", JSON.stringify(NewVisitorsList));

      const eatDialog = document.getElementById("eatDialog");
      const eatMessage = document.getElementById("eatMessage");
      const eatOkButton = document.getElementById("eatOkButton");

      eatMessage.innerHTML = `The  ${foundVisitor.name} have eaten !!`;
      eatDialog.showModal();

      eatOkButton.addEventListener("click", () => {
        eatDialog.close();
        window.location.href = "login.html";
      });
    }

    if (foundVisitor.coins < 0 && AnimalInfo.isPredator !== true) {
      let NewAnimalList = JSON.parse(localStorage.getItem("animals"));

      NewAnimalList = NewAnimalList.filter(
        (animal) => animal.name !== AnimalInfo.name
      );

      localStorage.setItem("animals", JSON.stringify(NewAnimalList));

      const escapeDialog = document.getElementById("escapeDialog");
      const escapeMessage = document.getElementById("escapeMessage");
      const okButton = document.getElementById("okButton");

      escapeMessage.innerHTML = `The  ${AnimalInfo.name} escape from the zoo !!`;
      escapeDialog.showModal();

      okButton.addEventListener("click", () => {
        escapeDialog.close();
        window.location.href = "zoo.html";
      });
    }
  });
  closeBtn.addEventListener("click", () => {
    dialogElem.close();
  });
}

feedAnimal();

// ממשו את הלוגיקה של האכלת חיה
// במידה ואין מספיק מטבעות, טפלו בהתאם להנחיות במטלה
// }

function visitorGotEaten() {
  // ממשו את הלוגיקה של חיה שטורפת אורח
}

function animalEscaped() {}
//ממשו את הלוגיקה של חיה שבורחת מגן החיות
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

window.addEventListener("load", ChangeVisitor);
