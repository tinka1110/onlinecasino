// Varmistaa, että koodi suoritetaan vasta, kun sivu on ladattu kokonaan  
// Säkerställer att koden körs först när sidan är helt laddad  
document.addEventListener("DOMContentLoaded", () => {  

    // Hakee kaikki elementit, joilla on luokka "card"  
    // Hämtar alla element som har klassen "card"  
    const cards = document.querySelectorAll('.card');  

    // Pitää kirjaa käännetyistä korteista  
    // Håller reda på vända kort  
    let flippedCards = [];  

    // Estää korttien kääntämisen samalla kun kaksi korttia on jo valittu  
    // Förhindrar kortvändning medan två kort redan är valda  
    let lockBoard = false;  

    // Funktio kortin kääntämiseen  
    // Funktion för att vända ett kort  
    function flipCard() {  
        // Estää kääntämisen, jos pelilaudalla on lukitus  
        // Förhindrar att kort vänds om spelbrädet är låst  
        if (lockBoard) return;  

        // Estää kolmannen kortin kääntämisen  
        // Förhindrar att ett tredje kort vänds  
        if (flippedCards.length === 2) return;  

        // Lisää luokan "flipped" käännettyyn korttiin  
        // Lägger till klassen "flipped" på det vända kortet  
        this.classList.add('flipped');  

        // Lisää käännetyn kortin listaan  
        // Lägger till det vända kortet i listan  
        flippedCards.push(this);  

        // Jos kaksi korttia on käännetty, tarkista parit  
        // Om två kort har vänts, kontrollera om de matchar  
        if (flippedCards.length === 2) {  
            checkForMatch();  
        }  
    }  

    // Funktio tarkistaa, vastaavatko kortit toisiaan  
    // Funktion kontrollerar om korten matchar  
    function checkForMatch() {  
        const [card1, card2] = flippedCards;  

        // Jos kortit vastaavat, nollaa lauta  
        // Om korten matchar, återställ spelbrädet  
        if (card1.dataset.card === card2.dataset.card) {  
            resetBoard();  
        } else {  
            // Lukitsee pelilaudan väärän parin ajaksi  
            // Låser spelbrädet medan paret är fel  
            lockBoard = true;  
            setTimeout(() => {  
                // Poistaa luokan "flipped" vääriltä korteilta  
                // Tar bort klassen "flipped" från fel kort  
                card1.classList.remove('flipped');  
                card2.classList.remove('flipped');  

                // Nollaa pelilaudan  
                // Återställer spelbrädet  
                resetBoard();  
            }, 1000);  
        }  
    }  

    // Funktio palauttaa laudan alkuperäiseen tilaan  
    // Funktion återställer brädet till ursprungligt tillstånd  
    function resetBoard() {  
        flippedCards = [];  // Tyhjentää listan käännetyistä korteista  
        lockBoard = false;  // Poistaa pelilaudan lukituksen  
    }  

    // Lisää tapahtumankuuntelijat kaikille korteille  
    // Lägger till eventlyssnare på alla kort  
    cards.forEach(card => card.addEventListener('click', flipCard));  
});  

//Spelets flöde fungerar enligt följande steg:

//Användaren klickar på ett kort, vilket gör att det vänds och visas.
//När två kort är vända, kontrolleras de om de matchar varandra.
//Om korten inte matchar, vänds de tillbaka.
//När ett par har hittats, förblir korten vända.

//Pelissä on seuraavat vaiheet:

//Käyttäjä klikkaa korttia, jolloin se kääntyy näkyville.
//Jos kaksi korttia on käännetty, ne tarkistetaan vastaavatko ne toisiaan.
//Jos kortit eivät ole samanlaiset, ne käännetään takaisin paikoilleen.
//Kun pari on löydetty, kortit jäävät käännetyiksi
