//FinalTest
//HARSIMRAN KAUR
//301088749
//8/19/2020
//COMP125-CLIENT SIDE WEB DEVELOPMENT

let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let assets: createjs.LoadQueue;

    let exampleLabel: UIObjects.Label;
    let rollButton: UIObjects.Button;  
    let leftDice:Core.GameObject;  
    let rightDice:Core.GameObject;  
    let leftLabel:UIObjects.Label;
    let rightLabel:UIObjects.Label;
    let one=0;
    let two=0;
    let three=0;
    let four=0;
    let five=0;
    let six=0;




    let assetManifest = 
    [
        {id:"1", src:"./Assets/images/1.png"},
        {id:"2", src:"./Assets/images/2.png"},
        {id:"3", src:"./Assets/images/3.png"},
        {id:"4", src:"./Assets/images/4.png"},
        {id:"5", src:"./Assets/images/5.png"},
        {id:"6", src:"./Assets/images/6.png"},
        {id:"backButton", src:"./Assets/images/startButton.png"},
        {id:"background", src:"./Assets/images/background.png"},
        {id:"blank", src:"./Assets/images/blank.png"},
        {id:"button", src:"./Assets/images/button.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"startOverButton", src:"./Assets/images/startOverButton.png"},
        {id:"diceRoll",src:"./Assets/sound/diceRoll.mp3"}
    ];

    function Preload():void
    {
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
    function Start():void
    {
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
    function Update():void
    {
        stage.update();
    }

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value:number, lowerBounds:number, upperBounds:number):number |boolean {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else
        {
            return !value;
        }
    }


        /* When this function is called it determines the rolled dice results.*/
        
        function Rolls():string[] {
            let rollOutcomes = [" ", " "];
            let outCome = [0, 0];

            for (let roll = 0; roll < 2; roll++) {
                outCome[roll] = Math.floor((Math.random() * 6) + 1);
                switch (outCome[roll]) {
                    case checkRange(outCome[roll], 1, 2):  
                        rollOutcomes[roll] = "1";
                        one++;
                        break;
                    case checkRange(outCome[roll], 2, 3):
                        rollOutcomes[roll] = "2";
                        two++;
                        break;
                    case checkRange(outCome[roll], 3, 4): 
                        rollOutcomes[roll] = "3";
                        three++;
                        break;
                    case checkRange(outCome[roll], 4, 5): 
                        rollOutcomes[roll] = "4";
                        four++;
                        break;
                    case checkRange(outCome[roll], 5, 5): 
                        rollOutcomes[roll] = "5";
                        five++;
                        break;
                    case checkRange(outCome[roll], 6, 7): 
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
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

       /*  exampleLabel = new UIObjects.Label("An Example Label", "40px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(exampleLabel); */

        //label displaying outcome of left dice
        leftLabel = new UIObjects.Label(" 1", "40px", "Consolas", "#000000", Config.Game.CENTER_X-150, Config.Game.CENTER_Y+5, true);
        stage.addChild(leftLabel);

        //label displaying outcome of right dice
        rightLabel = new UIObjects.Label(" 2", "40px", "Consolas", "#000000", Config.Game.CENTER_X+125, Config.Game.CENTER_Y+5, true);
        stage.addChild(rightLabel);

          // left dice 
        leftDice= new Core.GameObject("1",Config.Game.CENTER_X-140, Config.Game.CENTER_Y-110,true);
        stage.addChild(leftDice);

        //right dice
        rightDice= new Core.GameObject("1",Config.Game.CENTER_X+130, Config.Game.CENTER_Y-110,true);
        stage.addChild(rightDice);

        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(rollButton);

        rollButton.on("click", ()=>{
            console.log("example button clicked");

            createjs.Sound.play("diceRoll");// sound effect of rolling dice
            let rolls=Rolls();
   
            leftDice.image=assets.getResult(rolls[0]) as HTMLImageElement;
            leftLabel.text=""+rolls[0]+""

            rightDice.image=assets.getResult(rolls[1]) as HTMLImageElement;
            rightLabel.text=""+rolls[1]+""
        });
    }

    window.addEventListener('load', Preload);


})();