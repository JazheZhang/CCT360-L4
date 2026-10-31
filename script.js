// ===== Study Break Check =====

// ----- Variables -----
// State that is remembered between visits (saved in localStorage)
let userName = localStorage.getItem("userName") || "";
let visits = Number(localStorage.getItem("visits")) || 0;
let checks = Number(localStorage.getItem("checks")) || 0;

// Get the elements from the page
const greeting = document.getElementById("greeting");
const form = document.getElementById("breakForm");
const nameInput = document.getElementById("nameInput");
const hoursInput = document.getElementById("hoursInput");
const energyInput = document.getElementById("energyInput");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const checkCount = document.getElementById("checkCount");
const resetButton = document.getElementById("resetButton");

// ----- Count this visit -----
visits = visits + 1;
localStorage.setItem("visits", visits);

// ----- Greeting: changes based on previous visits -----
function showGreeting() {
  if (userName === "") {
    greeting.textContent = "Hi there! Tell me how your studying is going.";
  } else if (visits === 1) {
    greeting.textContent = "Nice to meet you, " + userName + ".";
  } else if (visits < 5) {
    greeting.textContent = "Welcome back, " + userName + ". This is visit number " + visits + ".";
  } else {
    greeting.textContent = userName + ", you've been here " + visits + " times. Are you sure you're studying?";
  }
  nameInput.value = userName;
}

function showCheckCount() {
  if (checks === 0) {
    checkCount.textContent = "";
  } else if (checks === 1) {
    checkCount.textContent = "You have checked 1 time.";
  } else {
    checkCount.textContent = "You have checked " + checks + " times.";
  }
}

// ----- Decide the result: four possible outcomes -----
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const hours = Number(hoursInput.value);
  const energy = energyInput.value;

  // Make sure everything is filled in
  if (hoursInput.value === "" || energy === "") {
    resultTitle.textContent = "Missing info";
    resultText.textContent = "Please enter your hours and pick an energy level.";
    result.className = "outcome-missing";
    return;
  }

  // Remember the name for next time
  if (name !== "") {
    userName = name;
    localStorage.setItem("userName", userName);
  }

  // Outcome 1: studied a long time AND low energy
  if (hours >= 4 && energy === "low") {
    resultTitle.textContent = "Stop for today";
    resultText.textContent = "You've done " + hours + " hours and you're running on empty. Get some food and sleep. Start fresh tomorrow.";
    result.className = "outcome-stop";
  }
  // Outcome 2: studied a long time
  else if (hours >= 4) {
    resultTitle.textContent = "Take a long break";
    resultText.textContent = "That's " + hours + " hours already. Go for a 20 minute walk before you keep going.";
    result.className = "outcome-long";
  }
  // Outcome 3: low energy but not many hours
  else if (energy === "low") {
    resultTitle.textContent = "Quick recharge";
    resultText.textContent = "Grab some water and a snack, then try 25 more minutes.";
    result.className = "outcome-short";
  }
  // Outcome 4: everything else
  else {
    resultTitle.textContent = "Keep going";
    resultText.textContent = "You're doing well. Study for another 25 minutes, then check again.";
    result.className = "outcome-go";
  }

  // Count how many times the user has checked
  checks = checks + 1;
  localStorage.setItem("checks", checks);

  showGreeting();
  showCheckCount();
});

// ----- Forget me: clears the saved state -----
resetButton.addEventListener("click", function () {
  localStorage.clear();
  userName = "";
  visits = 0;
  checks = 0;
  form.reset();
  result.className = "hidden";
  showGreeting();
  showCheckCount();
});

// ----- Start -----
showGreeting();
showCheckCount();
