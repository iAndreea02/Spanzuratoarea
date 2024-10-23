var cuvinte = ["pisica", "maimuta", "clatite", "cascada"];
var cuvant = cuvinte[Math.floor(Math.random() * cuvinte.length)];

var vector_raspuns = [];
for (var i = 0; i < cuvant.length; i++) {
    vector_raspuns[i] = '_';
}
var litere_ramase = cuvant.length;

var viata = 6;

// Functie pentru a genera inimioare
function updateHearts() {
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = ''; 
    for (let i = 0; i < viata; i++) {
        const heartImg = document.createElement('img');
        heartImg.src = 'heart.png';
        heartImg.alt = 'Inimioară';
        heartImg.style.width = '30px'; 
        livesContainer.appendChild(heartImg);
    }
}


updateHearts();


document.getElementById('status').innerText = vector_raspuns.join(' ');

document.getElementById("myForm").addEventListener('submit', function (event) {
    event.preventDefault(); 

    var litera_aleasa = document.getElementById('name').value.toLowerCase();
    document.getElementById('name').value = ''; 
    
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
        updateHearts(); 
    }

    // Actualizeaza statusul jocului
    document.getElementById('status').innerText = vector_raspuns.join(' ');
    document.getElementById('viata').innerText = `Vieți rămase: ${viata}`;

  
    if (litere_ramase === 0) {
        alert('Felicitari! Ai ghicit cuvantul!');
        document.getElementById("myForm").remove(); 
    } else if (viata === 0) {
        alert(`Ai pierdut! Cuvantul era: ${cuvant}`);
        document.getElementById("myForm").remove(); 
    }
});
