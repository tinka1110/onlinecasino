function loggaAnvändarInfo() {
    // Plattform och webbläsarinfo // Alustan ja selaimen tiedot
    const plattform = navigator.platform;  // Haetaan alusta // Hämtar plattform
    const webbläsare = navigator.userAgent;  // Haetaan selaimen käyttäjäagentti // Hämtar webbläsarens user-agent
    const språk = navigator.language;  // Haetaan kieli // Hämtar språk
    const skärmupplösning = `${screen.width}x${screen.height}`;  // Haetaan näytön tarkkuus // Hämtar skärmupplösning
    const fönsterstorlek = `${window.innerWidth}x${window.innerHeight}`;  // Haetaan selainikkunan koko // Hämtar fönsterstorlek

    // Hämta eller initiera spelräknaren // Hae tai alusta pelilaskuri
    let spelRäknare = parseInt(localStorage.getItem("spelRäknare")) || 0;  // Haetaan laskuri localStoragesta tai alustetaan nollaksi // Hämtar räknare från localStorage eller initierar till 0
    spelRäknare++;  // Lisää laskuriin yksi // Ökar räknaren med ett
    localStorage.setItem("spelRäknare", spelRäknare);  // Tallenna pelilaskuri localStorageen // Spara räknare i localStorage

    // Logga information till konsolen // Lokittaa tiedot konsoliin
    console.log("Plattform:", plattform);  // Lokittaa alustan // Loggar plattform
    console.log("Webbläsare:", webbläsare);  // Lokittaa selaimen // Loggar webbläsare
    console.log("Språk:", språk);  // Lokittaa kielen // Loggar språk
    console.log("Skärmupplösning:", skärmupplösning);  // Lokittaa näytön tarkkuuden // Loggar skärmupplösning
    console.log("Fönsterstorlek:", fönsterstorlek);  // Lokittaa ikkunan koon // Loggar fönsterstorlek
    console.log("Antal spel:", spelRäknare);  // Lokittaa pelimäärän // Loggar antal spel

    // Hantera geolokalisering // Käsittele geolokalisointi
    if (navigator.geolocation) {  // Tarkistetaan, tukeeko selain geolokalisointia // Kollar om geolokalisering stöds
        navigator.geolocation.getCurrentPosition(  // Haetaan sijainti // Hämtar platsinformation
            (position) => {  // Jos sijainti onnistuu // Om plats är tillgänglig
                const lat = position.coords.latitude.toFixed(2);  // Haetaan leveysaste ja pyöristetään se kahteen desimaaliin // Hämtar latitud och rundar till två decimaler
                const lon = position.coords.longitude.toFixed(2);  // Haetaan pituusaste ja pyöristetään se kahteen desimaaliin // Hämtar longitud och rundar till två decimaler
                console.log("Platsinformation: Latitud:", lat, "Longitud:", lon);  // Lokittaa sijaintitiedot konsoliin // Loggar platsinformation i konsolen
            },
            (error) => {  // Jos virhe tapahtuu geolokalisoinnissa // Om ett fel inträffar vid geolokalisering
                console.error("Platsinformation: Användaren nekade geolokalisering.");  // Ilmoitetaan virheestä // Meddelar om fel
            }
        );
    } else {  // Jos geolokalisointia ei tueta // Om geolokalisering inte stöds
        console.error("Platsinformation: Geolokalisering stöds inte av denna webbläsare.");  // Ilmoitetaan, ettei geolokalisointia tueta // Meddelar om geolokalisering inte stöds
    }
}

// Kör koden när DOM är laddad // Suorita koodi, kun DOM on ladattu
document.addEventListener("DOMContentLoaded", loggaAnvändarInfo);  // Kun DOM on ladattu, suorita loggaAnvändarInfo -funktio // När DOM är laddad, kör loggaAnvändarInfo
