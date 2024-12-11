document.addEventListener("DOMContentLoaded", () => {
    const balanceElement = document.getElementById("balance");
    const betInput = document.getElementById("bet");
    const choicesContainer = document.getElementById("choices");
    const messageElement = document.getElementById("message");
    const winCountElement = document.getElementById("win-count");
    const lossCountElement = document.getElementById("loss-count");
    const winPercentageElement = document.getElementById("win-percentage");

    // Hämta saldo från localStorage eller sätt startvärdet till 100
    let balance = parseFloat(localStorage.getItem("startingBalance")) || 100;
    let wins = 0;      // Antal vinster
    let losses = 0;    // Antal förluster

    // Vapen-objekt
    const weapons = [
        { name: "Sten", winsAgainst: "Sax" },
        { name: "Sax", winsAgainst: "Papper" },
        { name: "Papper", winsAgainst: "Sten" }
    ];

    // Uppdatera saldopanelen
    function updateBalance(amount) {
        balanceElement.textContent = amount + " €";
        balanceElement.style.transform = "scale(1.2)";
        setTimeout(() => balanceElement.style.transform = "scale(1)", 300);
    }

    // Uppdatera statistikpanelen
    function updateStats(result) {
        if (result === "win") {
            wins++;
        } else if (result === "lose") {
            losses++;
        }

        const totalGames = wins + losses;
        const winPercentage = totalGames ? ((wins / totalGames) * 100).toFixed(2) : 0;

        winCountElement.textContent = wins;
        lossCountElement.textContent = losses;
        winPercentageElement.textContent = winPercentage + " %";
    }

    // Skapa knappar för vapnen
    weapons.forEach(weapon => {
        const button = document.createElement("button");
        button.textContent = weapon.name;
        button.addEventListener("click", () => playRound(weapon.name));
        choicesContainer.appendChild(button);
    });

    // Spelets logik
    function playRound(playerChoice) {
        const bet = parseInt(betInput.value);

        if (bet > balance || bet <= 0) {
            alert("Insatsen kan inte överstiga ditt saldo eller vara noll.");
            return;
        }

        // Datorn väljer ett slumpmässigt vapen
        const computerChoice = weapons[Math.floor(Math.random() * weapons.length)].name;

        // Avgör vinnaren
        const result = getResult(playerChoice, computerChoice);

        // Uppdatera meddelande och saldo
        let message = `Du valde: ${playerChoice}, Datorn valde: ${computerChoice}. `;
        if (result === "win") {
            balance += bet;
            message += `Du vann ${bet} €!`;
        } else if (result === "lose") {
            balance -= bet;
            message += `Du förlorade ${bet} €.`;
        } else {
            message += "Oavgjort! Insatsen förblir oförändrad.";
        }

        updateBalance(balance);
        messageElement.textContent = message;
        updateStats(result);

        // Om saldot går till noll
        if (balance <= 0) {
            alert("Du har förlorat alla dina pengar! Spelet avslutas.");
            location.reload(); // Ladda om spelet
        }

        // Uppdatera saldo i localStorage
        localStorage.setItem("startingBalance", balance);
    }

    function getResult(player, computer) {
        if (player === computer) return "draw";

        const playerWeapon = weapons.find(w => w.name === player);
        if (playerWeapon.winsAgainst === computer) {
            return "win";
        } else {
            return "lose";
        }
    }

    // Initiera startvärden
    updateBalance(balance);
    updateStats();
});
