var cuvant;
var vector_raspuns;
var litere_ramase;
var viata;

function fetchWord() {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(response => response.json())
        .then(cuvinte => {
            cuvant = cuvinte[0]; 
            console.log('Cuvânt aleatoriu:', cuvant);

            vector_raspuns = Array(cuvant.length).fill('_');
            litere_ramase = cuvant.length;
            viata = 6;

            updateHearts();
            updateStatus();
            createKeyboard();
        })
        .catch(error => console.error('Eroare:', error));
}

function updateHearts() {
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = ''; 
    for (let i = 0; i < viata; i++) {
        const heartImg = document.createElement('img');
        heartImg.src = 'heart.png'; // Asigură-te că ai imaginea corectă
        heartImg.alt = 'Inimioară';
        heartImg.style.width = '30px'; 
        livesContainer.appendChild(heartImg);
    }
}

function updateStatus() {
    document.getElementById('status').innerText = vector_raspuns.join(' ');
    document.getElementById('viata').innerText = `Vieti ramase: ${viata}`;
}

function showLoseGif() {
    document.body.style.backgroundColor = 'red'; // Schimbă fundalul în roșu
    const loseGif = document.createElement('img');
    loseGif.src = 'cat_cry.gif'; // Calea către GIF-ul de pierdere
    loseGif.alt = 'Ai pierdut!';
    loseGif.style.position = 'fixed'; // Poziționează GIF-ul
    loseGif.style.bottom = '10px'; 
    loseGif.style.right = '10px'; 
    loseGif.style.width = '200px'; 
    document.body.appendChild(loseGif);
}

function showWinGif() {
    document.body.style.backgroundColor = 'green'; // Schimbă fundalul în verde
    const winGif = document.createElement('img');
    winGif.src = 'back.gif'; // Calea către GIF-ul de câștig
    winGif.alt = 'Ai castigat!';
    winGif.style.position = 'fixed'; 
    winGif.style.top = '0'; 
    winGif.style.left = '0'; 
    winGif.style.width = '100vw'; 
    winGif.style.height = '100vh'; 
    winGif.style.zIndex = '1000'; 
    winGif.style.pointerEvents = 'none'; 
    document.body.appendChild(winGif);
}

function resetGame() {
    document.body.style.backgroundColor = ''; // Resetează fundalul
    vector_raspuns = [];
    document.getElementById('lives').innerHTML = ''; // Resetează inimile
    const loseGif = document.querySelector('img[alt="Ai pierdut!"]');
    if (loseGif) loseGif.remove(); // Elimină GIF-ul de pierdere
    const winGif = document.querySelector('img[alt="Ai câștigat!"]');
    if (winGif) winGif.remove(); // Elimină GIF-ul de câștig
    fetchWord(); 
}

function createKeyboard() {
    const litere = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = ''; 

    for (let i = 0; i < litere.length; i++) {
        const button = document.createElement('button');
        button.textContent = litere[i];
        button.onclick = function() {
            button.disabled = true; 
            button.style.backgroundColor = "#ccc"; 

            var litera_aleasa = button.textContent.toLowerCase();
            var gasit = false;

            for (var j = 0; j < cuvant.length; j++) {
                if (cuvant[j] === litera_aleasa && vector_raspuns[j] === '_') {
                    vector_raspuns[j] = litera_aleasa;
                    litere_ramase--;
                    gasit = true;
                }
            }

            if (gasit) {
                alert('Ai nimerit!');
            } else {
                viata--;
                alert(`Nu ai nimerit! Mai ai ${viata} vieți.`); 
                updateHearts(); 
            }

            updateStatus();

            if (litere_ramase === 0) {
                alert('Felicitari! Ai ghicit cuvantul!');
                showWinGif();
                disableKeyboard(); // Dezactivează tastatura
            } else if (viata === 0) {
                document.getElementById('status').innerText = cuvant;
                showLoseGif(); // Afișează GIF-ul de pierdere
                disableKeyboard(); // Dezactivează tastatura
            }
        };
        keyboard.appendChild(button);
    }
}

function disableKeyboard() {
    const buttons = document.querySelectorAll('#keyboard button');
    buttons.forEach(button => button.disabled = true); // Dezactivează toate butoanele
}

// Apelează funcția fetchWord pentru a obține un cuvânt la început
fetchWord();

// Asociază resetarea jocului cu butonul de resetare
document.getElementById('res').onclick = resetGame;
