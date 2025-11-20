function openGame(gameType) {
    if (gameType === 'input') {
    } else if (gameType === 'select') {    
    }
}
function viewRanking() {  
}
document.querySelector('.search-box input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});
document.querySelector('.search-btn').addEventListener('click', performSearch);

function performSearch() {
    const query = document.querySelector('.search-box input').value.trim();
    if (query) {
        
    }
}