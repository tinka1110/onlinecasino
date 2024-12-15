// Hävitä lomakkeen oletuskäyttäytyminen ja estä sen lähetys
// Förhindra formulärets standardbeteende
document.getElementById("registreringsForm").addEventListener("submit", function (e) {
    e.preventDefault(); 
    
    const förnamn = document.getElementById("förnamn").value.trim();  // Haetaan etunimi // Hämtar förnamn
    const efternamn = document.getElementById("efternamn").value.trim();  // Haetaan sukunimi // Hämtar efternamn

    // Tarkistetaan, että molemmat kentät on täytetty
    // Kontrollera att båda fälten är ifyllda
    if (!förnamn || !efternamn) {
        alert("Fyll i både förnamn och efternamn!");  // Ilmoitetaan, jos kenttä puuttuu // Meddela om ett fält saknas
        return;
    }

    // Luodaan käyttäjätunnus: sukunimi pienillä kirjaimilla + etunimen ensimmäinen kirjain pienellä
    // Skapa användarnamn: efternamn i gemener + förnamn första bokstav i gemener
    const användarnamn = efternamn.toLowerCase() + förnamn.charAt(0).toLowerCase();  

    // Näytetään tervetuloviesti
    // Visa välkomstmeddelande
    const meddelande = `Välkommen ${förnamn}, ditt användarnamn är ${användarnamn}.`;  // Tervetuloviesti // Välkomstmeddelande
    document.getElementById("välkomstMeddelande").textContent = meddelande;  // Asetetaan tervetuloviesti näytölle // Sätt välkomstmeddelande på skärmen

    // Näytetään seuraava lomake (pelitiedot)
    // Visa nästa formulär (spelinformation)
    document.getElementById("spelinformation-sektion").style.display = "block";  // Näytä pelitiedot-lomake // Visa spelinformation formulär
});

// Tallenna pelitiedot ja näytä viesti
// Spara spelinformation och visa meddelande
document.getElementById("spelinformationForm").addEventListener("submit", function (e) {
    e.preventDefault();  // Förhindra formulärets standardbeteende
    
    const ålder = parseInt(document.getElementById("ålder").value, 10);  // Haetaan ikä // Hämtar ålder
    let insats = document.getElementById("insats").value.trim();  // Haetaan panos // Hämtar insats

    // Tarkistetaan, että ikä on syötetty ja kelvollinen
    // Kontrollera att ålder är angiven och giltig
    if (isNaN(ålder)) {
        alert("Ange en giltig ålder!");  // Ilmoitetaan, jos ikä on virheellinen // Meddela om ogiltig ålder
        return;
    }

    // Tarkistetaan alaikäisyys
    // Kontrollera minderårighet
    if (ålder < 18) {
        alert("Spel är inte tillåtet för minderåriga!");  // Ilmoitetaan, jos pelaaminen on kielletty alle 18-vuotiailta // Meddela om spel är förbjudet för minderåriga
        return;
    }

    // Vaihdetaan desimaalimerkki pilkusta pisteeksi
    // Ersätt decimaltecken från komma till punkt
    insats = insats.replace(",", ".");  // Ersätt komma med punkt

    // Tarkistetaan, että panos on kelvollinen numero ja suurempi kuin nolla
    // Kontrollera att insatsen är ett giltigt tal och större än noll
    const insatsNummer = parseFloat(insats);  // Muutetaan panos numeroksi // Konvertera insats till nummer

    if (isNaN(insatsNummer) || insatsNummer <= 0) {
        alert("Ange en giltig insats (t.ex. 10.5 eller 10,5)!");  // Ilmoitetaan, jos panos on virheellinen // Meddela om ogiltig insats
        return;
    }

    // Tallennetaan käyttäjän panos ja luodaan pelitili
    // Spara användarens insats och skapa en spelbalans
    localStorage.setItem("startingBalance", insatsNummer);  // Tallenna panos localStorageen // Spara insats i localStorage

    // Jos kaikki on oikein, näytetään viesti
    // Om allt är korrekt, visa meddelande
    alert(`Information sparad: Du är ${ålder} år gammal och spelar med en insats på ${insatsNummer.toFixed(2)} €.`);  // Tallenna ja ilmoita käyttäjälle // Spara och meddela användaren

    // Näytetään "Mene peliin" -painike
    // Visa "Gå till spel"-knapp
    const nextButton = document.createElement("button");  // Luo uusi painike // Skapa en ny knapp
    nextButton.textContent = "Gå till spel";  // Asetetaan painikkeen teksti // Sätt knappens text
    nextButton.onclick = function () {
        // Jos käyttäjä on rekisteröitynyt oikein, siirrytään pelisivulle
        // Om användaren har registrerat sig korrekt, gå till spel
        window.location.href = "games.html";  // Siirrytään pelisivulle // Gå till spel-sidan
    };

    // Liitetään painike lomakkeen loppuun
    // Lägg till knappen i formuläret
    document.getElementById("spelinformation-sektion").appendChild(nextButton);  // Lisää painike lomakkeeseen // Lägg till knappen i formuläret
});
