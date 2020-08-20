"use strict";
//FinalTest
//HARSIMRAN KAUR
//301088749
//8/19/2020
//COMP125-CLIENT SIDE WEB DEVELOPMENT
let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let exampleLabel;
    let rollButton;
    let leftDice;
    let rightDice;
    let leftLabel;
    let rightLabel;
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    let assetManifest = [
        { id: "1", src: "./Assets/images/1.png" },
        { id: "2", src: "./Assets/images/2.png" },
        { id: "3", src: "./Assets/images/3.png" },
        { id: "4", src: "./Assets/images/4.png" },
        { id: "5", src: "./Assets/images/5.png" },
        { id: "6", src: "./Assets/images/6.png" },
        { id: "backButton", src: "./Assets/images/startButton.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "button", src: "./Assets/images/button.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "rollButton", src: "./Assets/images/rollButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "startOverButton", src: "./Assets/images/startOverButton.png" },
        { id: "diceRoll", src: "./Assets/sound/diceRoll.mp3" }
    ];
    function Preload() {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config
        Main();
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        let rollOutcomes = [" ", " "];
        let outCome = [0, 0];
        for (let roll = 0; roll < 3; roll++) {
            outCome[roll] = Math.floor((Math.random() * 6) + 1);
            switch (outCome[roll]) {
                case checkRange(outCome[roll], 1, 2): // 41.5% probability
                    rollOutcomes[roll] = "1";
                    one++;
                    break;
                case checkRange(outCome[roll], 2, 3): // 15.4% probability
                    rollOutcomes[roll] = "2";
                    two++;
                    break;
                case checkRange(outCome[roll], 3, 4): // 13.8% probability
                    rollOutcomes[roll] = "3";
                    three++;
                    break;
                case checkRange(outCome[roll], 4, 5): // 12.3% probability
                    rollOutcomes[roll] = "4";
                    four++;
                    break;
                case checkRange(outCome[roll], 5, 5): //  7.7% probability
                    rollOutcomes[roll] = "5";
                    five++;
                    break;
                case checkRange(outCome[roll], 6, 7): //  4.6% probability
                    rollOutcomes[roll] = "6";
                    six++;
                    break;
            }
        }
        return rollOutcomes;
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        /*  exampleLabel = new UIObjects.Label("An Example Label", "40px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
         stage.addChild(exampleLabel); */
        leftLabel = new UIObjects.Label(" 1", "40px", "Consolas", "#000000", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 5, true);
        stage.addChild(leftLabel);
        rightLabel = new UIObjects.Label(" 2", "40px", "Consolas", "#000000", Config.Game.CENTER_X + 125, Config.Game.CENTER_Y + 5, true);
        stage.addChild(rightLabel);
        leftDice = new Core.GameObject("1", Config.Game.CENTER_X - 140, Config.Game.CENTER_Y - 110, true);
        stage.addChild(leftDice);
        rightDice = new Core.GameObject("1", Config.Game.CENTER_X + 130, Config.Game.CENTER_Y - 110, true);
        stage.addChild(rightDice);
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);
        rollButton.on("click", () => {
            console.log("example button clicked");
            createjs.Sound.play("diceRoll");
            let reels = Reels();
            leftDice.image = assets.getResult(reels[0]);
            leftLabel.text = "" + reels[0] + "";
            rightDice.image = assets.getResult(reels[1]);
            rightLabel.text = "" + reels[1] + "";
        });
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map