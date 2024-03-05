// function loginAsVisitor(visitorName) {}
const visitorListStringify = localStorage.getItem("visitors");
visitors = JSON.parse(visitorListStringify);
console.log(visitors);

// const visitors = JSON.parse(localStorage.getItem("visitors"));

function renderVisitors(visitors) {
  // define how animal card looks like
  const cards = [];
  visitors.forEach((visitor) => {
    const card = `<div id=css class="cards" >
    <img id="picture" class="card-img-top" src="${visitor.picture}" />
    <div class="card-body">
      <div id="${visitor.name}" class="card-text">${visitor.name}</div> 
      
      <div class="card-text">${visitor.email}</div>
      
      <div id="${visitor.coins}" class="card-text">coins: ${visitor.coins} ⭐</div>
    </div>
  </div>`;
    cards.push(card);
  });
  const visitorsWrapper = document.getElementById("visitor-list");
  visitorsWrapper.innerHTML = cards.join("");
}

renderVisitors(visitors);

function filterVisitors(visitorName) {
  const filteredVisitors =
    visitorName === "All"
      ? visitors
      : visitors.filter((visitor) => visitor.visitorName === visitorName);
  return filteredVisitors;
}

function handleSearch() {
  const searchText = document
    .getElementById("visitor_search")
    .value.toLowerCase();
  const filteredVisitors = visitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(searchText)
  );
  renderVisitors(filteredVisitors);
}

// Function to handle filter checkboxes
function handleFilters() {
  // Implement filter logic here
  // For simplicity, let's just alert the selected filters
  const filters = [];
  alert("Selected Filters: " + filters.join(", "));
}

// Add event listeners
// document.getElementById("tabs").addEventListener("click", handleTabClick);
document
  .getElementById("visitor_search")
  .addEventListener("input", handleSearch);
document
  .querySelectorAll("#filters input[type='checkbox']")
  .forEach((checkbox) => {
    checkbox.addEventListener("change", handleFilters);
  });

const VisitorList = document.getElementById("visitor-list");
const search = document.getElementById("visitor-search");

visitor_search.addEventListener("keyup", (e) => {
  const searchString = e.target.value.tolowercase();
  const filterVisitors = visitors.filter((visitor) => {
    return visitor.name.tolowercase().includes(searchString);
  });
});

window.addEventListener("load", function () {
  const chooseVisitor = document.querySelectorAll("#css");
  chooseVisitor.forEach((card) => {
    card.addEventListener("click", function (event) {
      event.preventDefault();
      const selectedVisitor = JSON.parse(
        localStorage.getItem("selectedVisitor")
      );
      const visitorName = card.querySelector("div[id]").id;
      if (selectedVisitor) {
        alert(
          `Are you sure you want to logout from this ${selectedVisitor.name}`
        );
      }
      alert(visitorName);

      localStorage.setItem(
        "selectedVisitor",
        JSON.stringify({ name: visitorName })
      );

      window.location.href = "zoo.html";
    });
  });
});
