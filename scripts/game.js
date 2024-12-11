window.onload = function () {
    // Uppdatera klockan och datumet
    updateClock();
    setInterval(updateClock, 1000); // Uppdatera varje sekund

    // Speltidens timer
    const startButton = document.getElementById("start-timer");
    if (startButton) {
        startButton.addEventListener("click", startGameTimer);
    }

    // Skapa responsiv navigationsmeny
    createNavbar();
    setupHamburgerMenu(); // Funktion för hamburgermenyn
};

function updateClock() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
    const statusElement = document.getElementById("status");
    const countdownSection = document.getElementById("countdown");
    const countdownTimer = document.getElementById("countdown-timer");

    if (timeElement && dateElement && statusElement && countdownSection && countdownTimer) {
        const now = new Date();

        // Uppdatera tid och datum
        timeElement.textContent = now.toLocaleTimeString();
        dateElement.textContent = now.toLocaleDateString();

        const currentDay = now.getDay();
        const isWeekend = currentDay === 6 || currentDay === 0; // Om det är lördag eller söndag

        if (isWeekend) {
            // Helg: "Casino är stängt" och nedräkning
            statusElement.textContent = "Casino är stängt för tillfället";
            countdownSection.style.display = "block";

            // Beräkna nedräkning till måndag kl. 00:00
            const nextMonday = new Date(now);
            if (currentDay === 0) {
                nextMonday.setDate(now.getDate() + 1); // Söndag, nästa dag är måndag
            } else if (currentDay === 6) {
                nextMonday.setDate(now.getDate() + 2); // Lördag, 2 dagar framåt
            }
            nextMonday.setHours(0, 0, 0, 0); // Måndag kl. 00:00

            const timeDiff = nextMonday - now;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            countdownTimer.textContent = `Casino öppnar om ${hours} timmar, ${minutes} minuter och ${seconds} sekunder.`;
        } else {
            // Vardagar: "Casino är öppet" och ingen nedräkning
            statusElement.textContent = "Casino är öppet!";
            countdownSection.style.display = "none";
        }
    }
}

// Nedräkning för speltid
function startGameTimer() {
    const playtimeSelect = document.getElementById("playtime");
    const selectedTime = parseInt(playtimeSelect.value, 10);
    const endTime = new Date(Date.now() + selectedTime * 60 * 1000);

    document.getElementById("end-time").textContent = `Din speltid slutar ${endTime.toLocaleTimeString()}`;

    const timerElement = document.getElementById("timer-remaining");
    const interval = setInterval(() => {
        const now = new Date();
        const timeDiff = endTime - now;

        if (timeDiff <= 0) {
            clearInterval(interval);
            timerElement.textContent = "Spelsessionen är över!";
            alert("Din spelsession är över!");
        } else {
            const minutes = Math.floor(timeDiff / 1000 / 60);
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            timerElement.textContent = `Återstående tid: ${minutes} minuter, ${seconds} sekunder.`;
        }
    }, 1000);
}
