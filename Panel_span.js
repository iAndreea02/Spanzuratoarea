function showWinPanel() {
    const winPanel = document.getElementById('win-panel');
    winPanel.style.display = 'block'; // Afișează panoul

    // Adaugă un eveniment pentru resetare când se apasă butonul din panou
    document.getElementById('resetButton').onclick = function() {
        resetGame();
        winPanel.style.display = 'none'; // Ascunde din nou panoul
    };
}

function showLosePanel() {
    console.log("Funcția showLosePanel a fost apelată."); // Mesaj de debug

    // Schimbă mesajul și GIF-ul pentru înfrângere
    document.getElementById('panel-message').innerText = 'Ai pierdut!';
    document.getElementById('panel-gif').src = 'cat_fail.gif';  // GIF pentru pierdere
    document.getElementById('panel-gif').alt = 'GIF de pierdere';

    // Afișează panoul
    document.getElementById('win-panel').style.display = 'block';
}

document.getElementById('resetButton').onclick = function() {
    document.getElementById('win-panel').style.display = 'none';
    resetGame(); // Funcția ta de resetare a jocului
}




