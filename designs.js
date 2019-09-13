// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

const heightPicker = document.querySelector("#inputHeight");
// console.log(heightPicker)

let heightPickerValue = heightPicker.value;
// Reuse of heightPicker is the same as: let heightPickerValue = document.querySelector('#inputHeight').value;

//EVENT LISTENER hinzufügen HEIGHT
heightPicker.addEventListener("change", function(event) {
  heightPickerValue = document.querySelector("#inputHeight").value;
});

//Neue const & let WIDTH
const widthPicker = document.querySelector("#inputWidth");

let widthPickerValue = widthPicker.value;

//EVENT LISTENER hinzufügen WIDTH
widthPicker.addEventListener("change", function() {
  widthPickerValue = document.querySelector("#inputHeight").value;
});
// add an Event Listener to the widthPicker variable (not widthPickerValue -> this comes one line later)

//COLOR PICKER
const colorPicker = document.querySelector("#colorPicker");

let colorPickerValue = colorPicker.value;

//Add EVENT LISTENER Color

colorPicker.addEventListener("change", function() {
  colorPickerValue = document.querySelector("#colorPicker").value;
});

// EVENT LISTENER For COLOURING
const table = document.querySelector("#pixelCanvas");

table.addEventListener("click", function(event) {
  console.log(event);
  event.target.style.backgroundColor = colorPickerValue;
});

const submitButton = document.querySelector("input[type=submit]");

function makeGrid() {
  // for each heightPickerValue
  const pixelCanvas = document.querySelector("#pixelCanvas");
  pixelCanvas.innerHTML = "";
  for (var i = 0; i < heightPickerValue; i++) {
    // add tr
    const tr = document.createElement("tr");
    pixelCanvas.appendChild(tr);
    // for each widthPickerValue
    for (var n = 0; n < widthPickerValue; n++) {
      // add td
      const td = document.createElement("td");
      td.style.backgroundColor = "#FFF";
      pixelCanvas.getElementsByTagName("tr")[i].appendChild(td);
    }
  }
}

submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  makeGrid();
});
