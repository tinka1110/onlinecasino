// Hämta den sparade färgtemat när sidan laddas
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("background-color");
    const savedTextColor = localStorage.getItem("text-color");

    if (savedTheme) {
        document.body.style.backgroundColor = savedTheme;
    }
    if (savedTextColor) {
        document.body.style.color = savedTextColor;
        document.getElementById("text-color").value = savedTextColor;
    }
});

// Dropdown: ändra bakgrundsfärg
document.getElementById("theme-select").addEventListener("change", (event) => {
    const selectedColor = event.target.value;
    document.body.style.backgroundColor = selectedColor;

    // Spara valet i localStorage
    localStorage.setItem("background-color", selectedColor);
});

// Skjutreglage: koppla ihop färger och ändra bakgrundsfärg
const redSlider = document.getElementById("red-slider");
const greenSlider = document.getElementById("green-slider");
const blueSlider = document.getElementById("blue-slider");

const updateBackgroundColor = () => {
    const red = redSlider.value;
    const green = greenSlider.value;
    const blue = blueSlider.value;

    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    document.body.style.backgroundColor = rgbColor;

    // Spara i localStorage
    localStorage.setItem("background-color", rgbColor);
};

// Lägg till event-lyssnare för skjutreglagen
redSlider.addEventListener("input", updateBackgroundColor);
greenSlider.addEventListener("input", updateBackgroundColor);
blueSlider.addEventListener("input", updateBackgroundColor);

// Ändra textfärg
document.getElementById("text-color").addEventListener("input", (event) => {
    const selectedTextColor = event.target.value;
    document.body.style.color = selectedTextColor;

    // Spara textfärgen i localStorage
    localStorage.setItem("text-color", selectedTextColor);
});
