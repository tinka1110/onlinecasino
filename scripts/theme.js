// Hae tallennettu väriteema, kun sivu ladataan
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

// Dropdown-valikko: vaihda taustaväriä
// Dropdown: ändra bakgrundsfärg
document.getElementById("theme-select").addEventListener("change", (event) => {
    const selectedColor = event.target.value;
    document.body.style.backgroundColor = selectedColor;

    // Tallenna valinta localStorageen
    // Spara valet i localStorage
    localStorage.setItem("background-color", selectedColor);
});

// Liukusäätimet: yhdistä värit ja muuta taustaväriä
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

    // Tallenna taustaväri localStorageen
    // Spara i localStorage
    localStorage.setItem("background-color", rgbColor);
};

// Lisää tapahtumakuuntelijat liukusäätimille
// Lägg till event-lyssnare för skjutreglagen
redSlider.addEventListener("input", updateBackgroundColor);
greenSlider.addEventListener("input", updateBackgroundColor);
blueSlider.addEventListener("input", updateBackgroundColor);

// Vaihda tekstin väriä
// Ändra textfärg
document.getElementById("text-color").addEventListener("input", (event) => {
    const selectedTextColor = event.target.value;
    document.body.style.color = selectedTextColor;

    // Tallenna tekstin väri localStorageen
    // Spara textfärgen i localStorage
    localStorage.setItem("text-color", selectedTextColor);
});
//Detta ändrar inte alla textfärger på hela webbplatsen eftersom de är definierade i CSS.