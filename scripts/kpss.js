document.addEventListener("DOMContentLoaded", () => {
    const balanceElement = document.getElementById("balance"); // Hae saldon elementti // Hämtar saldoelement
    const betInput = document.getElementById("bet"); // Hae panoksen syöttökenttä // Hämtar insatsfält
    const choicesContainer = document.getElementById("choices"); // Hae valintojen säiliö // Hämtar valmöjligheterna
    const messageElement = document.getElementById("message"); // Hae viestielementti // Hämtar meddelandelement
    const winCountElement = document.getElementById("win-count"); // Hae voittotilastot // Hämtar vinsteräknare
    const lossCountElement = document.getElementById("loss-count"); // Hae häviöt // Hämtar förlusteräknare
    const winPercentageElement = document.getElementById("win-percentage"); // Hae voittoprosentti // Hämtar vinstprocent

    // Hämta saldo från localStorage eller sätt startvärdet till 100 // Haetaan saldo localStoragesta tai asetetaan alkusaldoksi 100
    let balance = parseFloat(localStorage.getItem("startingBalance")) || 100;
    let wins = 0;      // Voittojen määrä // Antal vinster
    let losses = 0;    // Häviöiden määrä // Antal förluster

    // Vapen-objekt // Aseet-objekti
    const weapons = [
        { name: "Sten", winsAgainst: "Sax" },  // Kivi voittaa sakset // Sten slår Sax
        { name: "Sax", winsAgainst: "Papper" },  // Sakset voittaa paperin // Sax slår Papper
        { name: "Papper", winsAgainst: "Sten" }  // Paperi voittaa kiven // Papper slår Sten
    ];

    // Uppdatera saldopanelen // Päivitä saldopaneeli
    function updateBalance(amount) {
        balanceElement.textContent = amount + " €";  // Näytä saldo // Visa saldo
        balanceElement.style.transform = "scale(1.2)"; // Skaloi hetkellisesti // Skalar tillfälligt
        setTimeout(() => balanceElement.style.transform = "scale(1)", 300);  // Palauta normaali koko // Återställ normal storlek
    }

    // Uppdatera statistikpanelen // Päivitä tilastopaneeli
    function updateStats(result) {
        if (result === "win") {
            wins++;  // Lisää voitoissa // Öka vinster
        } else if (result === "lose") {
            losses++;  // Lisää häviöissä // Öka förluster
        }

        const totalGames = wins + losses;  // Lasketaan pelien kokonaismäärä // Beräknar totalt antal spel
        const winPercentage = totalGames ? ((wins / totalGames) * 100).toFixed(2) : 0;  // Lasketaan voittoprosentti // Beräknar vinstprocent

        winCountElement.textContent = wins;  // Näytä voitot // Visa vinster
        lossCountElement.textContent = losses;  // Näytä häviöt // Visa förluster
        winPercentageElement.textContent = winPercentage + " %";  // Näytä voittoprosentti // Visa vinstprocent
    }

    // Skapa knappar för vapnen // Luo napit aseille
    weapons.forEach(weapon => {
        const button = document.createElement("button");  // Luo painike aseelle // Skapar knapp för vapen
        button.textContent = weapon.name;  // Aseta napin teksti aseen nimeksi // Sätt knappens text till vapnets namn
        button.addEventListener("click", () => playRound(weapon.name));  // Lisää tapahtumakuuntelija, joka käynnistää pelin // Lägg till eventlyssnare för att starta spelet
        choicesContainer.appendChild(button);  // Lisää painike valintapaneeliin // Lägger till knapp i valmöjlighetsbehållare
    });

    // Spelets logik // Pelin logiikka
    function playRound(playerChoice) {
        const bet = parseInt(betInput.value);  // Haetaan panos käyttäjän syötteestä // Hämtar insats från användarens inmatning

        if (bet > balance || bet <= 0) {  // Tarkistetaan, että panos on sallittu // Kollar om insatsen är giltig
            alert("Insatsen kan inte överstiga ditt saldo eller vara noll.");  // Näytetään varoitus, jos panos on virheellinen // Visar varning om insatsen är ogiltig
            return;
        }

        // Datorn väljer ett slumpmässigt vapen // Tietokone valitsee satunnaisen aseen
        const computerChoice = weapons[Math.floor(Math.random() * weapons.length)].name;

        // Avgör vinnaren // Määritetään voittaja
        const result = getResult(playerChoice, computerChoice);

        // Uppdatera meddelande och saldo // Päivitä viesti ja saldo
        let message = `Du valde: ${playerChoice}, Datorn valde: ${computerChoice}. `;  // Luodaan viesti valinnoista // Skapar meddelande för val
        if (result === "win") {
            balance += bet;  // Lisää saldoon, jos pelaaja voittaa // Ökar saldo om spelaren vinner
            message += `Du vann ${bet} €!`;  // Näytetään voittoviesti // Visar vinstmeddelande
        } else if (result === "lose") {
            balance -= bet;  // Vähennetään saldoa, jos pelaaja häviää // Minskar saldo om spelaren förlorar
            message += `Du förlorade ${bet} €.`;  // Näytetään häviöviesti // Visar förlustmeddelande
        } else {
            message += "Oavgjort! Insatsen förblir oförändrad.";  // Näytetään tasapelin viesti // Visar oavgjort meddelande
        }

        updateBalance(balance);  // Päivitä saldo // Uppdatera saldo
        messageElement.textContent = message;  // Päivitä viesti elementissä // Uppdatera meddelande
        updateStats(result);  // Päivitä tilastot // Uppdatera statistik

        // Om saldot går till noll // Jos saldo menee nollaan
        if (balance <= 0) {
            alert("Du har förlorat alla dina pengar! Spelet avslutas.");  // Näytetään varoitus, jos saldo menee nollaan // Visar varning om saldo går till noll
            location.reload(); // Ladataan peli uudelleen // Ladda om spelet
        }

        // Uppdatera saldo i localStorage // Päivitä saldo localStorageen
        localStorage.setItem("startingBalance", balance);
    }

    function getResult(player, computer) {
        if (player === computer) return "draw";  // Tasapeli, jos valinnat ovat samoja // Oavgjort om valen är samma

        const playerWeapon = weapons.find(w => w.name === player);  // Haetaan pelaajan valinta aseista // Hämtar spelarens val från vapnena
        if (playerWeapon.winsAgainst === computer) {  // Tarkistetaan, voittaako pelaajan ase tietokoneen aseen // Kollar om spelarens vapen slår datorns vapen
            return "win";  // Pelaaja voittaa // Spelaren vinner
        } else {
            return "lose";  // Pelaaja häviää // Spelaren förlorar
        }
    }

    // Initiera startvärden // Alusta alkuarvot
    updateBalance(balance);  // Päivitä saldo // Uppdatera saldo
    updateStats();  // Päivitä tilastot // Uppdatera statistik
});
