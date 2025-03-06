// Main application controller
const App = {
  // DOM elements
  elements: {
      homeScreen: document.getElementById('home-screen'),
      tileRecognitionBtn: document.getElementById('tile-recognition-btn'),
      puzzlesBtn: document.getElementById('puzzles-btn'),
      scoringBtn: document.getElementById('scoring-btn')
  },

  // Game screens
  games: {
      tileRecognition: {
          screen: document.getElementById('game-screen'),
          closeBtn: document.getElementById('close-game'),
          initialize: function() {
              // This will be defined in tile-recognition-game.js
              if (typeof TileRecognitionGame !== 'undefined') {
                  TileRecognitionGame.init();
              }
          }
      },
      puzzles: {
          screen: null, // Will be set when puzzles game is implemented
          closeBtn: null,
          initialize: function() {
              // This will be defined in puzzles-game.js when implemented
              if (typeof PuzzlesGame !== 'undefined') {
                  PuzzlesGame.init();
              }
          }
      },
      scoringMath: {
          screen: null, // Will be set when scoring math game is implemented
          closeBtn: null,
          initialize: function() {
              // This will be defined in scoring-math-game.js when implemented
              if (typeof ScoringMathGame !== 'undefined') {
                  ScoringMathGame.init();
              }
          }
      }
  },

  // Initialize the application
  init: function() {
      this.bindEvents();
  },

  // Bind all event listeners
  bindEvents: function() {
      // Tile Recognition game
      this.elements.tileRecognitionBtn.addEventListener('click', () => {
          this.openGame('tileRecognition');
      });

      if (this.games.tileRecognition.closeBtn) {
          this.games.tileRecognition.closeBtn.addEventListener('click', () => {
              this.closeGame('tileRecognition');
          });
      }

      // Puzzles game (future)
      this.elements.puzzlesBtn.addEventListener('click', () => {
          // Currently disabled - will be implemented in V2
          // this.openGame('puzzles');
      });

      // Scoring Math game (future)
      this.elements.scoringBtn.addEventListener('click', () => {
          // Currently disabled - will be implemented in V2
          // this.openGame('scoringMath');
      });
  },

  // Open a specific game
  openGame: function(gameName) {
      // Hide home screen
      this.elements.homeScreen.style.display = 'none';
      
      // Show the selected game screen
      if (this.games[gameName].screen) {
          this.games[gameName].screen.style.display = 'flex';
          
          // Initialize the game
          this.games[gameName].initialize();
      }
  },

  // Close a specific game and return to home screen
  closeGame: function(gameName) {
      // Hide the game screen
      if (this.games[gameName].screen) {
          this.games[gameName].screen.style.display = 'none';
      }
      
      // Show home screen
      this.elements.homeScreen.style.display = 'block';
  }
};

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});