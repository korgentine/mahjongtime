// Main application controller
const App = {
    // DOM elements
    elements: {
        homeScreen: document.getElementById('home-screen'),
        tileRecognitionBtn: document.getElementById('tile-recognition-btn'),
        puzzlesBtn: document.getElementById('puzzles-btn'),
        scoringBtn: document.getElementById('scoring-btn'),
        rulesBtn: document.getElementById('rules-btn')
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
        
        // Initialize Rules controller
        if (typeof RulesController !== 'undefined') {
            RulesController.init();
        }
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
        this.showHomeScreen();
    },
    
    // Show home screen
    showHomeScreen: function() {
        // Hide any rules screens that might be open
        if (typeof RulesController !== 'undefined') {
            RulesController.hideAllScreens();
        }
        
        // Show home screen
        this.elements.homeScreen.style.display = 'block';
    }
};

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Fix for iOS Safari to prevent scrolling issues
document.addEventListener('touchmove', function(e) {
    if (!e.target.closest('.scrollable')) {
        e.preventDefault();
    }
}, { passive: false });

// Fix for 100vh issue on iOS Safari
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set vh variable on page load and when resizing
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
setVH();

// Fix for mobile scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Enable touch scrolling on all content screens
    const contentScreens = document.querySelectorAll('.content-screen');
    
    contentScreens.forEach(screen => {
        // Set proper overflow
        screen.style.overflowY = 'auto';
        screen.style.WebkitOverflowScrolling = 'touch';
        
        // Prevent default touch behavior only when necessary
        screen.addEventListener('touchmove', function(e) {
            // Allow scrolling by default
            e.stopPropagation();
        }, { passive: true });
    });
    
    // Set viewport height correctly for mobile
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set on load and resize
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    setVH();
});