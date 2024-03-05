function createNewVisitor(event) {
  event.preventDefault();

  const addvVisitorForm = document.getElementById("create-visitor-form");

  // const visitors = JSON.parse(localStorage.getItem("visitors"));

  if (localStorage.getItem("visitors")) {
    const stringifiedVisitors = localStorage.getItem("visitors");
    visitors = JSON.parse(stringifiedVisitors);
  } else {
    visitors = [];
  }

  addvVisitorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("visitor-name");
    const emailInput = document.getElementById("email");

    if (!nameInput || !emailInput) {
      // error flow
      alert("something went wrong");
      return;
    }

    if (!nameInput.value || !emailInput.value) {
      // validate there is a text in the inputs
      alert("you must provide visitor inputs");
      // nameInput.value = "";
      // emailInput.value = "";
      return;
    }

    const visitor = {
      name: nameInput.value,
      email: emailInput.value,
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtIDhyILJzbIKtGprPHzRQnsB6-Mq4J716FA&usqp=CAU",
      coins: 50,
    };

    const visitorForView = visitors.find(
      (visitor) =>
        visitor.email.toLowerCase() === emailInput.value.toLowerCase()
    );

    if (visitorForView) {
      // Visitor with the same email already exists
      alert("This email already exists!");
      nameInput.value = "";
      emailInput.value = "";

      return;
    }

    visitors.push(visitor);

    const stringifiedVisitors = JSON.stringify(visitors);

    localStorage.setItem("visitors", stringifiedVisitors);

    nameInput.value = "";
    emailInput.value = "";
    window.location.href = "login.html";
  });
}

/**
  צרו אורח חדש כאן 👇
  ניתן לפצל את הלוגיקה למספר בלתי מוגבל של פונקציות.
  כמו שיותר מפוצל וטהור - פונקציות עם מטרה יחידה ושם משמעותי שמסביר מה הפונקציה עושה ומחזירה
  דוגמא:

 

  const visitorExists = (name) => {
    מקבל שם ומחזיר תשובה האם השם האורח קיים
  }

  const makeVisitor = (name) => {
    מקבל שם, בודק שאין אותו כבר במערך האורחים ומחזיר אובייקט אורח
  }
  **/

/**************************************
  מימשתי עבורכם את ההאזנה לאירוע שליחת טופס
  שימו לב כי האיידי של createForm
  זהה לאיידי של הטופס בעמוד signup.html
  אין לשנות אותו */
const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
