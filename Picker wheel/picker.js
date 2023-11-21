const generateButton = document.getElementById("generateButton");
const randomButton = document.getElementById("randomButton");
const resultDiv = document.getElementById("result");
const inputItems = document.getElementById("inputItems");
document.getElementById("howToUseButton").addEventListener("click", function() {

    window.location.href = "how_to_use_page.html";
  });
  

let items = [];

generateButton.addEventListener("click", () => {
  const enteredItems = inputItems.value.split(",").map(item => item.trim());
  items = enteredItems.filter(item => item !== "");
  randomButton.disabled = false;
});

randomButton.addEventListener("click", () => {
  if (items.length > 0) {
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomIndex];
    resultDiv.textContent = `Random Item: ${randomItem}`;
  } else {
    resultDiv.textContent = 'No items to randomize! :(';
  }
});
