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


// Const
const pixelCanvas = document.querySelector("#pixelCanvas");
const canvas = document.createElement("canvas");
const context = canvas.getContext('2d');
const drawing = new Image();

// Helper
const getPixel = (x, y, { data }, width) => {
  const red = y * (width * 4) + x * 4; // rgba = 4 byte per pixel (reads byte as int = 0-256 = rgba)
  return `rgba(${[red, red + 1, red + 2, red + 3].map(i => data[i]).join(",")})`;
}

// Load file as picture
document.getElementById('picField').addEventListener("change", evt => {
  const tgt = evt.target || window.event.srcElement;
  const [file] = tgt.files;
  const fr = new FileReader();
  fr.addEventListener("load", () => {
    // Triggers drawing.onload ine 97
    drawing.src = fr.result;
  });
  fr.readAsDataURL(file);
});

drawing.addEventListener("load", async () => {
  const w = canvas.width = widthPicker.value;
  const h = canvas.height = heightPicker.value;
  context.drawImage(drawing, 0, 0, w, h);
  const imageData = context.getImageData(0, 0, w, h);
  pixelCanvas.innerHTML = "";
  for (let i = 0; i < h; i++) {
    // Let the browser draw each row individually for effect
    // Note: Without this the browser will freeze for bigger resolutions
    await new Promise(res => window.requestAnimationFrame(res));
    const tr = document.createElement("tr");
    for (let n = 0; n < w; n++) {
      // Use string + innerHTML for performance
      tr.innerHTML += `<td style="background-color: ${getPixel(n, i, imageData, w)};"></td>`;
    }
    pixelCanvas.appendChild(tr);
  }
});
