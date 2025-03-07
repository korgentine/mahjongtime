// Rules Pages Controller
const RulesController = {
    // DOM elements - main screens
    screens: {
        rules: document.getElementById('rules-screen'),
        setup: document.getElementById('setup-screen'),
        tiles: document.getElementById('tiles-screen'),
        playingRules: document.getElementById('playing-rules-screen'),
        winningHand: document.getElementById('winning-hand-screen')
    },
    
    // DOM elements - buttons to access rules screens
    buttons: {
        openRules: document.getElementById('rules-btn'),
        closeRules: document.getElementById('close-rules'),
        
        // Rules menu buttons
        setup: document.getElementById('setup-btn'),
        tiles: document.getElementById('tiles-btn'),
        playingRules: document.getElementById('playing-rules-btn'),
        winningHand: document.getElementById('winning-hand-btn'),
        
        // Close buttons for each section
        closeSetup: document.getElementById('close-setup'),
        closeTiles: document.getElementById('close-tiles'),
        closePlayingRules: document.getElementById('close-playing-rules'),
        closeWinningHand: document.getElementById('close-winning-hand')
    },
    
    // Tab navigation
    tabs: {
        // Setup tabs
        setupDiagramTab: document.getElementById('diagram-tab'),
        setupRulesTab: document.getElementById('setup-rules-tab'),
        diagramContent: document.getElementById('diagram-content'),
        setupRulesContent: document.getElementById('setup-rules-content'),
        
        // Tiles tabs
        honorTab: document.getElementById('honor-tab'),
        manTab: document.getElementById('man-tab'),
        bamTab: document.getElementById('bam-tab'),
        dotTab: document.getElementById('dot-tab'),
        honorContent: document.getElementById('honor-content'),
        manContent: document.getElementById('man-content'),
        bamContent: document.getElementById('bam-content'),
        dotContent: document.getElementById('dot-content')
    },
    
    // Initialize the rules controller
    init: function() {
        console.log('Rules controller initialized');
        this.bindEvents();
    },
    
    // Bind event listeners
    bindEvents: function() {
        // Home screen button to open rules
        if (this.buttons.openRules) {
            this.buttons.openRules.addEventListener('click', () => {
                console.log('Rules button clicked');
                App.elements.homeScreen.style.display = 'none';
                this.showScreen('rules');
            });
        } else {
            console.error('Rules button not found');
        }
        
        // Close rules screen (back to home)
        if (this.buttons.closeRules) {
            this.buttons.closeRules.addEventListener('click', () => {
                this.hideAllScreens();
                App.showHomeScreen();
            });
        }
        
        // Rules menu buttons
        if (this.buttons.setup) {
            this.buttons.setup.addEventListener('click', () => {
                this.showScreen('setup');
            });
        }
        
        if (this.buttons.tiles) {
            this.buttons.tiles.addEventListener('click', () => {
                this.showScreen('tiles');
            });
        }
        
        if (this.buttons.playingRules) {
            this.buttons.playingRules.addEventListener('click', () => {
                this.showScreen('playingRules');
            });
        }
        
        if (this.buttons.winningHand) {
            this.buttons.winningHand.addEventListener('click', () => {
                this.showScreen('winningHand');
            });
        }
        
        // Close buttons for each section (back to rules menu)
        if (this.buttons.closeSetup) {
            this.buttons.closeSetup.addEventListener('click', () => {
                this.showScreen('rules');
            });
        }
        
        if (this.buttons.closeTiles) {
            this.buttons.closeTiles.addEventListener('click', () => {
                this.showScreen('rules');
            });
        }
        
        if (this.buttons.closePlayingRules) {
            this.buttons.closePlayingRules.addEventListener('click', () => {
                this.showScreen('rules');
            });
        }
        
        if (this.buttons.closeWinningHand) {
            this.buttons.closeWinningHand.addEventListener('click', () => {
                this.showScreen('rules');
            });
        }
        
        // Setup tabs
        if (this.tabs.setupDiagramTab) {
            this.tabs.setupDiagramTab.addEventListener('click', () => {
                this.setActiveTab('setupDiagram');
            });
        }
        
        if (this.tabs.setupRulesTab) {
            this.tabs.setupRulesTab.addEventListener('click', () => {
                this.setActiveTab('setupRules');
            });
        }
        
        // Tiles tabs
        if (this.tabs.honorTab) {
            this.tabs.honorTab.addEventListener('click', () => {
                this.setActiveTab('honor');
            });
        }
        
        if (this.tabs.manTab) {
            this.tabs.manTab.addEventListener('click', () => {
                this.setActiveTab('man');
            });
        }
        
        if (this.tabs.bamTab) {
            this.tabs.bamTab.addEventListener('click', () => {
                this.setActiveTab('bam');
            });
        }
        
        if (this.tabs.dotTab) {
            this.tabs.dotTab.addEventListener('click', () => {
                this.setActiveTab('dot');
            });
        }
    },
    
    // Show a specific screen and hide others
    showScreen: function(screenName) {
        console.log('Showing screen:', screenName);
        this.hideAllScreens();
        
        // Show the selected screen
        if (this.screens[screenName]) {
            this.screens[screenName].style.display = 'flex';
            
            // For screens with tabs, ensure a tab is active
            if (screenName === 'setup') {
                this.setActiveTab('setupDiagram');
            } else if (screenName === 'tiles') {
                this.setActiveTab('honor');
            }
        } else {
            console.error('Screen not found:', screenName);
        }
    },
    
    // Hide all rules-related screens
    hideAllScreens: function() {
        Object.values(this.screens).forEach(screen => {
            if (screen) {
                screen.style.display = 'none';
            }
        });
    },
    
    // Set active tab for tabbed content
    setActiveTab: function(tabName) {
        // Setup tabs
        if (tabName === 'setupDiagram') {
            if (this.tabs.setupDiagramTab) this.tabs.setupDiagramTab.classList.add('active');
            if (this.tabs.setupRulesTab) this.tabs.setupRulesTab.classList.remove('active');
            if (this.tabs.diagramContent) this.tabs.diagramContent.classList.add('active');
            if (this.tabs.setupRulesContent) this.tabs.setupRulesContent.classList.remove('active');
        } else if (tabName === 'setupRules') {
            if (this.tabs.setupDiagramTab) this.tabs.setupDiagramTab.classList.remove('active');
            if (this.tabs.setupRulesTab) this.tabs.setupRulesTab.classList.add('active');
            if (this.tabs.diagramContent) this.tabs.diagramContent.classList.remove('active');
            if (this.tabs.setupRulesContent) this.tabs.setupRulesContent.classList.add('active');
        }
        
        // Tiles tabs
        const tileTabs = [
            { tab: this.tabs.honorTab, content: this.tabs.honorContent },
            { tab: this.tabs.manTab, content: this.tabs.manContent },
            { tab: this.tabs.bamTab, content: this.tabs.bamContent },
            { tab: this.tabs.dotTab, content: this.tabs.dotContent }
        ];
        
        tileTabs.forEach(item => {
            if (item.tab) item.tab.classList.remove('active');
            if (item.content) item.content.classList.remove('active');
        });
        
        if (tabName === 'honor') {
            if (this.tabs.honorTab) this.tabs.honorTab.classList.add('active');
            if (this.tabs.honorContent) this.tabs.honorContent.classList.add('active');
        } else if (tabName === 'man') {
            if (this.tabs.manTab) this.tabs.manTab.classList.add('active');
            if (this.tabs.manContent) this.tabs.manContent.classList.add('active');
        } else if (tabName === 'bam') {
            if (this.tabs.bamTab) this.tabs.bamTab.classList.add('active');
            if (this.tabs.bamContent) this.tabs.bamContent.classList.add('active');
        } else if (tabName === 'dot') {
            if (this.tabs.dotTab) this.tabs.dotTab.classList.add('active');
            if (this.tabs.dotContent) this.tabs.dotContent.classList.add('active');
        }
    }
};