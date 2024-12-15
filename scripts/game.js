window.onload = function () {
    // Päivitä kello ja päivämäärä
    // Uppdatera klockan och datumet
    updateClock();
    setInterval(updateClock, 1000); // Päivitä joka sekunti / Uppdatera varje sekund

    // Spelin ajanajastin
    // Speltidens timer
    const startButton = document.getElementById("start-timer");
    if (startButton) {
        startButton.addEventListener("click", startGameTimer); // Lisää tapahtumankuuntelija "start-timer" -painikkeelle / Lägg till eventlyssnare för knappen "start-timer"
    }

    // Luo responsiivinen navigointivalikko
    // Skapa responsiv navigationsmeny
    createNavbar(); // Luo navigointivalikko / Skapa navigationsmeny
    setupHamburgerMenu(); // Funktion för hamburgermenyn / Funktio hamburgermenun asettamiseksi
};

function updateClock() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
    const statusElement = document.getElementById("status");
    const countdownSection = document.getElementById("countdown");
    const countdownTimer = document.getElementById("countdown-timer");

    if (timeElement && dateElement && statusElement && countdownSection && countdownTimer) {
        const now = new Date();

        // Päivitä aika ja päivämäärä
        // Uppdatera tid och datum
        timeElement.textContent = now.toLocaleTimeString(); // Aika / Tid
        dateElement.textContent = now.toLocaleDateString(); // Päivämäärä / Datum

        const currentDay = now.getDay();
        const isWeekend = currentDay === 6 || currentDay === 0; // Jos on lauantai tai sunnuntai / Om det är lördag eller söndag

        if (isWeekend) {
            // Viikonloppu: "Casino on suljettu" ja laskenta
            // Helg: "Casino är stängt" och nedräkning
            statusElement.textContent = "Casino är stängt för tillfället"; // Näytetään ilmoitus, että casino on suljettu / Visa meddelande att casinot är stängt
            countdownSection.style.display = "block"; // Näytetään laskenta / Visa nedräkningen

            // Laske laskenta maanantaille klo 00:00
            // Beräkna nedräkning till måndag kl. 00:00
            const nextMonday = new Date(now);
            if (currentDay === 0) {
                nextMonday.setDate(now.getDate() + 1); // Sunnuntai, seuraava päivä on maanantai / Söndag, nästa dag är måndag
            } else if (currentDay === 6) {
                nextMonday.setDate(now.getDate() + 2); // Lauantai, 2 päivää eteenpäin / Lördag, 2 dagar framåt
            }
            nextMonday.setHours(0, 0, 0, 0); // Maanantai klo 00:00 / Måndag kl. 00:00

            const timeDiff = nextMonday - now; // Laske ero nykyhetken ja seuraavan maanantain välillä / Beräkna skillnaden mellan nuvarande tid och nästa måndag
            const hours = Math.floor(timeDiff / (1000 * 60 * 60)); // Tunnit / Timmar
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Minuutit / Minuter
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); // Sekunnit / Sekunder

            countdownTimer.textContent = `Casino öppnar om ${hours} timmar, ${minutes} minuter och ${seconds} sekunder.`; // Aika, jolloin kasino avautuu / Tid tills casinot öppnar
        } else {
            // Arkipäivät: "Casino on avoinna" eikä laskentaa
            // Vardagar: "Casino är öppet" och ingen nedräkning
            statusElement.textContent = "Casino är öppet!"; // Näytetään ilmoitus, että casino on avoinna / Visa meddelande att casinot är öppet
            countdownSection.style.display = "none"; // Piilotetaan laskenta / Dölj nedräkningen
        }
    }
}

// Spelin ajanlaskenta
// Nedräkning för speltid
function startGameTimer() {
    const playtimeSelect = document.getElementById("playtime");
    const selectedTime = parseInt(playtimeSelect.value, 10); // Valittu aika minuutteina / Vald tid i minuter
    const endTime = new Date(Date.now() + selectedTime * 60 * 1000); // Lasketaan päättymisaika / Beräkna sluttid

    document.getElementById("end-time").textContent = `Din speltid slutar ${endTime.toLocaleTimeString()}`; // Näytetään peliajan päättymisaika / Visa slutid för speltiden

    const timerElement = document.getElementById("timer-remaining");
    const interval = setInterval(() => {
        const now = new Date();
        const timeDiff = endTime - now; // Lasketaan jäljellä oleva aika / Beräkna återstående tid

        if (timeDiff <= 0) {
            clearInterval(interval); // Poistetaan ajastin, kun aika on kulunut loppuun / Rensa interval när tiden är slut
            timerElement.textContent = "Spelsessionen är över!"; // Näytetään ilmoitus pelisessionin päättymisestä / Visa meddelande om spelpasset är över
            alert("Din spelsession är över!"); // Ilmoitetaan käyttäjälle / Meddela användaren
        } else {
            const minutes = Math.floor(timeDiff / 1000 / 60); // Jäljellä olevat minuutit / Återstående minuter
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); // Jäljellä olevat sekunnit / Återstående sekunder
            timerElement.textContent = `Återstående tid: ${minutes} minuter, ${seconds} sekunder.`; // Näytetään jäljellä oleva aika / Visa återstående tid
        }
    }, 1000); // Päivitetään ajastinta joka sekunti / Uppdatera timer varje sekund
}
