/**
 * Main application script for Mahjong Learning App
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize game
    const tileGame = new TileRecognitionGame();
    
    // DOM elements
    const homeScreen = document.getElementById('home-screen');
    const gameScreen = document.getElementById('tile-game-screen');
    const tileRecognitionBtn = document.getElementById('tile-recognition-btn');
    const closeBtn = document.querySelector('.close-btn');
    
    /**
     * Navigate to a screen
     * @param {HTMLElement} screen - The screen to navigate to
     */
    function navigateTo(screen) {
      // Hide all screens
      document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
      });
      
      // Show the target screen
      screen.classList.add('active');
    }
    
    // Event listeners for navigation
    tileRecognitionBtn.addEventListener('click', () => {
      navigateTo(gameScreen);
      tileGame.init();
    });
    
    closeBtn.addEventListener('click', () => {
      navigateTo(homeScreen);
      tileGame.reset();
    });
    
    // Handle disabled buttons
    document.querySelectorAll('.menu-button.disabled').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        // Maybe add a small animation or feedback here
      });
    });
    
    // Start on home screen
    navigateTo(homeScreen);
  });