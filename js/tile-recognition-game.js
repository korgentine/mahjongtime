// Tile Recognition Game Logic
const TileRecognitionGame = {
    // DOM elements
    elements: {
        currentTileImg: document.getElementById('current-tile'),
        answerOptions: document.getElementById('answer-options'),
        feedbackCorrect: document.getElementById('feedback-correct'),
        feedbackIncorrect: document.getElementById('feedback-incorrect')
    },

    // Game state
    state: {
        currentTile: null,
        previousTileId: null,
        remainingTiles: []
    },

    // Initialize the game
    init: function() {
        // Reset and shuffle tiles
        this.state.remainingTiles = this.shuffleArray(tiles);
        this.showNextTile();
    },

    // Shuffle array function
    shuffleArray: function(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    // Show next tile
    showNextTile: function() {
        // If we've gone through all tiles, restart
        if (this.state.remainingTiles.length === 0) {
            this.state.remainingTiles = this.shuffleArray(tiles);
        }
        
        // Get next tile, ensuring it's not the same as the previous
        let nextTileIndex = 0;
        if (this.state.previousTileId) {
            while (this.state.remainingTiles[nextTileIndex].id === this.state.previousTileId && 
                   this.state.remainingTiles.length > 1) {
                nextTileIndex = (nextTileIndex + 1) % this.state.remainingTiles.length;
            }
        }
        
        this.state.currentTile = this.state.remainingTiles[nextTileIndex];
        this.state.remainingTiles.splice(nextTileIndex, 1);
        this.state.previousTileId = this.state.currentTile.id;
        
        // Set tile image
        this.elements.currentTileImg.src = this.state.currentTile.image;
        
        // Reset feedback
        this.elements.feedbackCorrect.style.display = 'none';
        this.elements.feedbackIncorrect.style.display = 'none';
        
        // Generate answer options
        this.generateAnswerOptions();
    },

    // Generate answer options based on tile type
    generateAnswerOptions: function() {
        this.elements.answerOptions.innerHTML = '';
        
        // Different layout based on tile type
        if (this.state.currentTile.type === 'man') {
            // For man tiles, show numbers 1-9 in a 3x3 grid
            const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            
            // Set standard grid for numbers
            this.elements.answerOptions.className = 'answer-options number-grid';
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('answer-btn');
                button.addEventListener('click', () => this.checkAnswer(option));
                this.elements.answerOptions.appendChild(button);
            });
        } else {
            // For dragon and wind tiles, show specific layout as in the designs
            // Set special grid for wind/dragon options
            this.elements.answerOptions.className = 'answer-options dragon-wind-grid';
            
            if (this.state.currentTile.type === 'dragon') {
                // Dragon tile should have DRAGON button taking the full width
                const button = document.createElement('button');
                button.textContent = 'DRAGON';
                button.classList.add('answer-btn', 'full-width');
                button.addEventListener('click', () => this.checkAnswer('DRAGON'));
                this.elements.answerOptions.appendChild(button);
                
                // Add the wind buttons below (in case they guess it's a wind)
                const windOptions = ['EAST', 'WEST', 'NORTH', 'SOUTH'];
                windOptions.forEach(option => {
                    const windButton = document.createElement('button');
                    windButton.textContent = option;
                    windButton.classList.add('answer-btn');
                    windButton.addEventListener('click', () => this.checkAnswer(option));
                    this.elements.answerOptions.appendChild(windButton);
                });
            } else if (this.state.currentTile.type === 'wind') {
                // Wind tiles show DRAGON on top and the four wind directions below
                const dragonButton = document.createElement('button');
                dragonButton.textContent = 'DRAGON';
                dragonButton.classList.add('answer-btn', 'full-width');
                dragonButton.addEventListener('click', () => this.checkAnswer('DRAGON'));
                this.elements.answerOptions.appendChild(dragonButton);
                
                // Add the wind buttons
                const windOptions = ['EAST', 'WEST', 'NORTH', 'SOUTH'];
                windOptions.forEach(option => {
                    const windButton = document.createElement('button');
                    windButton.textContent = option;
                    windButton.classList.add('answer-btn');
                    windButton.addEventListener('click', () => this.checkAnswer(option));
                    this.elements.answerOptions.appendChild(windButton);
                });
            }
        }
    },

    // Check if the selected answer is correct
    checkAnswer: function(selectedAnswer) {
        const buttons = document.querySelectorAll('.answer-btn');
        const correctButton = Array.from(buttons)
            .find(button => button.textContent === this.state.currentTile.answer);
        
        if (selectedAnswer === this.state.currentTile.answer) {
            // Correct answer
            this.elements.feedbackCorrect.style.display = 'block';
            correctButton.classList.add('correct');
            
            // Show next tile after short delay
            setTimeout(() => {
                correctButton.classList.remove('correct');
                this.showNextTile();
            }, 500);
        } else {
            // Incorrect answer
            this.elements.feedbackIncorrect.style.display = 'block';
            correctButton.classList.add('correct');
            
            // Find and highlight the incorrect button selected
            const incorrectButton = Array.from(buttons)
                .find(button => button.textContent === selectedAnswer);
            incorrectButton.classList.add('incorrect');
            
            // Show next tile after delay
            setTimeout(() => {
                correctButton.classList.remove('correct');
                incorrectButton.classList.remove('incorrect');
                this.showNextTile();
            }, 1000);
        }
        
        // Disable all buttons temporarily
        buttons.forEach(button => {
            button.disabled = true;
        });
        
        // Re-enable buttons after the delay
        setTimeout(() => {
            buttons.forEach(button => {
                button.disabled = false;
            });
        }, 1000);
    }
};