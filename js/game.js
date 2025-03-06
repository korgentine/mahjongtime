/**
 * Game logic for Mahjong Tile Recognition
 */

class TileRecognitionGame {
    constructor() {
      // Game elements
      this.tileElement = document.getElementById('current-tile');
      this.feedbackElement = document.getElementById('game-feedback');
      this.answerOptionsElement = document.getElementById('answer-options');
      
      // Game state
      this.currentTile = null;
      this.previousTile = null;
      this.score = 0;
      this.gameActive = false;
      
      // Bind methods
      this.handleAnswer = this.handleAnswer.bind(this);
    }
  
    /**
     * Initialize the game
     */
    init() {
      this.gameActive = true;
      this.score = 0;
      this.displayNewTile();
    }
  
    /**
     * Display a new random tile
     */
    displayNewTile() {
      // Clear feedback
      this.feedbackElement.className = 'feedback';
      this.feedbackElement.innerHTML = '';
      
      // Get a new tile that's different from the previous one
      let newTile;
      do {
        const randomIndex = Math.floor(Math.random() * TILES.length);
        newTile = TILES[randomIndex];
      } while (this.previousTile && this.previousTile.id === newTile.id);
      
      this.previousTile = this.currentTile;
      this.currentTile = newTile;
      
      // Display the tile
      this.tileElement.innerHTML = `<img src="${this.currentTile.image}" alt="Mahjong Tile">`;
      
      // Generate answer options based on tile type
      this.generateAnswerOptions();
    }
  
    /**
     * Generate answer buttons based on current tile type
     */
    generateAnswerOptions() {
      // Clear previous options
      this.answerOptionsElement.innerHTML = '';
      
      // Configure based on tile type
      if (this.currentTile.type === TILE_TYPES.NUMBER) {
        // For number tiles, show all 9 numbers
        this.answerOptionsElement.className = 'answer-buttons';
        for (let i = 1; i <= 9; i++) {
          const button = document.createElement('button');
          button.className = 'answer-button';
          button.textContent = i;
          button.dataset.answer = i.toString();
          button.addEventListener('click', this.handleAnswer);
          this.answerOptionsElement.appendChild(button);
        }
      } else if (this.currentTile.type === TILE_TYPES.DRAGON || this.currentTile.type === TILE_TYPES.WIND) {
        // For both dragon and wind tiles, show the four winds + dragon as options
        this.answerOptionsElement.className = 'special-options';
        
        // Create the dragon button
        const dragonButton = document.createElement('button');
        dragonButton.className = 'answer-button full-width';
        dragonButton.textContent = 'DRAGON';
        dragonButton.dataset.answer = 'dragon';
        dragonButton.addEventListener('click', this.handleAnswer);
        
        // Create a wrapper div for the dragon button to span full width
        const dragonWrapper = document.createElement('div');
        dragonWrapper.className = 'dragon-button-wrapper';
        dragonWrapper.appendChild(dragonButton);
        this.answerOptionsElement.appendChild(dragonWrapper);
        
        // The directions should match the design order
        const directions = [
          { text: 'EAST', value: 'east' },
          { text: 'WEST', value: 'west' },
          { text: 'NORTH', value: 'north' },
          { text: 'SOUTH', value: 'south' }
        ];
        
        // Create the button for each direction
        const directionsWrapper = document.createElement('div');
        directionsWrapper.className = 'directions-wrapper';
        
        directions.forEach(dir => {
          const button = document.createElement('button');
          button.className = 'answer-button';
          button.textContent = dir.text;
          button.dataset.answer = dir.value;
          button.addEventListener('click', this.handleAnswer);
          directionsWrapper.appendChild(button);
        });
        
        this.answerOptionsElement.appendChild(directionsWrapper);
      }
    }
  
    /**
     * Handle user answer
     * @param {Event} event - Click event
     */
    handleAnswer(event) {
      if (!this.gameActive) return;
      
      const userAnswer = event.target.dataset.answer;
      let isCorrect = false;
      
      // Check if answer is correct based on tile type
      if (this.currentTile.type === TILE_TYPES.NUMBER) {
        // For number tiles, check if the number matches
        isCorrect = userAnswer === this.currentTile.value;
      } else if (this.currentTile.type === TILE_TYPES.DRAGON) {
        // For dragon tiles, the answer should be 'dragon'
        isCorrect = userAnswer === 'dragon';
      } else if (this.currentTile.type === TILE_TYPES.WIND) {
        // For wind tiles, check if the wind direction matches
        isCorrect = userAnswer === this.currentTile.value;
      }
      
      // Show feedback
      this.feedbackElement.innerHTML = isCorrect ? '✓' : '✕';
      this.feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
      
      // Disable buttons temporarily
      this.gameActive = false;
      
      // Update score if correct
      if (isCorrect) {
        this.score++;
      }
      
      // Wait before showing next tile
      setTimeout(() => {
        this.gameActive = true;
        this.displayNewTile();
      }, 500);
    }
  
    /**
     * Reset the game
     */
    reset() {
      this.currentTile = null;
      this.previousTile = null;
      this.score = 0;
      this.gameActive = false;
      this.feedbackElement.className = 'feedback';
      this.feedbackElement.innerHTML = '';
    }
  }