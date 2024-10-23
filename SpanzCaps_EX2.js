var cuvinte = ["pamant", "caiet", "lego", "jucarii"];
var cuvant = cuvinte[Math.floor(Math.random() * cuvinte.length)];

var vector_raspuns = [];
for (var i = 0; i < cuvant.length; i++) {
    vector_raspuns[i] = '_';
}
var litere_ramase = cuvant.length;

var viata = 6;

// Afiseaza starea initiala a jocului
document.getElementById('status').innerText = vector_raspuns.join(' ');

document.getElementById("myForm").addEventListener('submit', function (event) {
    event.preventDefault(); // Oprește submit-ul formularului
//********************* */
    var litera_aleasa = document.getElementById('name').value.toLowerCase(); //asta e pentru EXERCITIU 2
    document.getElementById('name').value = ''; // Reset inputul după fiecare submit
    
    if (litera_aleasa.length !== 1) {
        alert('Scrie doar un caracter!');
        return;
    }

    var gasit = false;
    for (var i = 0; i < cuvant.length; i++) {
        if (cuvant[i] === litera_aleasa && vector_raspuns[i] === '_') {
            vector_raspuns[i] = litera_aleasa;
            litere_ramase--;
            gasit = true;
        }
    }

    if (gasit) {
        alert('Ai nimerit!');
    } else {
        viata--;
        alert(`Nu ai nimerit! Mai ai ${viata} vieti.`);
    }

    // Actualizeaza statusul jocului
    document.getElementById('status').innerText = vector_raspuns.join(' ');
    document.getElementById('viata').innerText = `Vieți ramase: ${viata}`;

    // Verifica daca a castigat sau a pierdut
    if (litere_ramase === 0) {
        alert('Felicitări! Ai ghicit cuvântul!');
        document.getElementById("myForm").remove(); 
    } else if (viata === 0) {
        alert(`Ai pierdut! Cuvântul era: ${cuvant}`);
        document.getElementById("myForm").remove(); 
    }
});
