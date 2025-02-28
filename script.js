import { emojiList } from "./emojiList.js";

const displayDiv = document.querySelector("#display");
const input = document.querySelector("input");
const buttons = document.querySelectorAll("button");

// Load all emojis when the page loads
window.addEventListener("load", () => displayEmoji(emojiList));

// Handle input search with the correct event reference
input.addEventListener("keyup", (e) => searchEmoji(e, input.value));

// Define a named function for button click events
function handleButtonClick(e) {
  searchEmoji(e, e.target.value);
}

// Attach event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

// Function to search and filter emojis
function searchEmoji(e, value) {
  e.preventDefault();
  const inputValue = value.toLowerCase();
  let filteredEmojis;
  // Filter emojiList based on user input
  if (value === "all") {
    filteredEmojis = emojiList;
  } else {
    filteredEmojis = emojiList.filter((emojiObj) => {
      return (
        emojiObj.description.includes(inputValue) ||
        emojiObj.aliases.toString().includes(inputValue) ||
        emojiObj.tags.toString().includes(inputValue)
      );
    });
  }

  // Display the filtered emojis
  displayEmoji(filteredEmojis);
}

// Function to display emojis
function displayEmoji(arr) {
  displayDiv.innerHTML = "";
  const fragment = document.createDocumentFragment();

  arr.forEach((obj) => {
    const parent = document.createElement("span");
    parent.classList.add("parent");
    parent.innerText = obj.emoji;
    fragment.append(parent);
  });

  displayDiv.append(fragment);
}
