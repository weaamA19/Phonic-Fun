
    // -------------------------------------Setting the Initial Variables----------------------------- // 
    let round = 1; //round number
    let previousPhonic=[];
    let selectedPhonic;
    let correctAnswer=false;
    let PlayerA=0;
    let PlayerB=1;
    let currentPlayer = "A"; // Starting player
    let answerIsSelected = false; 
    let questionNumber=0;
    let roundWinner="";
    let endRound = false;
    let limitAccess = false;
    let endIsGame = false;
    
    //An Array of Arrays will be used to store the current score and access the previous round's score 
    let scores = [[0, 0]];
    let scorePlayerA = scores[round - 1][PlayerA];
    let scorePlayerB = scores[round - 1][PlayerB];
    let playerADiv = document.querySelector("#playerA");
    let playerBDiv = document.querySelector("#playerB");
    const Path= 'img/wrongAnswer.mp3';


    // -------------------------------------Functions Section----------------------------------- //
    
    //loadScore function helps to load the scores when the game starts, instantly after calculating 
    //the score, and load the previous round score to the current round. 
    function loadScores(){
        // Access the scores containers 
        let scoreA_Container = document.querySelector(".scoreA");
        let scoreB_Container = document.querySelector(".scoreB");
        scoreA_Container.textContent = scorePlayerA;
        scoreB_Container.textContent = scorePlayerB;
    }

    //addingPlayerAnimation function helps to add a visual cue to highlight the current player 
    //and provide a visual indication of their turn.
    function addingPlayerAnimation () {
        //console.log("cp="+currentPlayer)
        if (currentPlayer == "A"){
            playerADiv.classList.add("currentPlayer");
            playerBDiv.classList.remove("currentPlayer");
        }
        else {
            playerBDiv.classList.add("currentPlayer");
            playerADiv.classList.remove("currentPlayer");  
        }
    }

    //numberQuestion function  is responsible for keeping track of the number of phonics/questions 
    //that have been played. It provides a visual indication to the users, showing them how many 
    //questions are remaining. 
    function numberQuestion(){
        //Displaying the Question Number
        let trialcontainer = document.querySelector("#questionNumber h4");

        // Clear the existing content of the trialcontainer
        trialcontainer.innerHTML = "";
        
        //Adding current trial number
        let question= document.createTextNode("Question Number " + questionNumber + "/6");
        trialcontainer.appendChild(question);
    }

    //phonicGenerator function responds to the users clicks on "sound" icon, it access the data from the 
    //json file, calls generateRandomPhonic function, and play the sound. 
    // The function calls two fucntions: addingPlayerAnimation and numberQuestion.
    //To increment the number of phonic played, and add visual cue to highlight the current player turn.
    function phonicGenerator(){
        if(limitAccess == true) return false
        //Avoid clicking the sounds before answering 
        limitAccess = true;
        //console.log(limitAccess, "limit");
        // New question
        answerIsSelected = false;

        //Get the dataset of the current round
            let datasetKey = "round"+round;
            let dataSet = phonicData[datasetKey];
            //console.log(Object.keys(dataSet.randomSound));
        
        //Select Randomly the letters sounds (ex."round1" ->"randomSound" --> "phonic1")
            let obtainKeys= Object.keys(dataSet.randomSound); 
            //console.log(obtainKeys);

        //To avoid selecting previous Phonic a while loop was used 
        //add condition to ensure after 6 sounds played it alters "Round Ended"
            if (previousPhonic.length < 6){
                generateRandomPhonic(obtainKeys); 

                //Question Number
                questionNumber += 1;
                //console.log("qn"+questionNumber); 
            }
            else {
                playerBDiv.classList.remove("currentPlayer");
                playerADiv.classList.remove("currentPlayer");  
                alert("The Round has Ended"); 
                return;
            }
        
            //console.log(selectedPhonic);
            //console.log(previousPhonic);

        // Access the the audio element
        let  soundName = Object.values(dataSet.randomSound[selectedPhonic]);
        //console.log(soundName);

        //Define the Sound Path
        let soundPath= './sounds/round' + round + '/' + soundName[0];
        //console.log(soundPath);

        // Get the audio element
        const audioElement = document.getElementById('audioContainer');

        // Set attributes and properties

        audioElement.src = soundPath; // Set the audio source
        
        audioElement.controls = true;  // Enable the audio controls (play)
        
        // Play the audio
        audioElement.play();

        //Adding animation indecating the current player once the sound image is clicked
        addingPlayerAnimation() 

        //Display Question Number
        numberQuestion();
        
    }

    //phonicGenerator function helps to randomly pick phonic sound using obtain key, Math.floor, and Math random Methods.
    function generateRandomPhonic(obtainKeys) {
        while (true){
            //Generate random phonic
            selectedPhonic = obtainKeys[Math.floor(Math.random() * obtainKeys.length)];
            
            //Check if the element is not previously selected
            if(!previousPhonic.includes(selectedPhonic)) 
            {
                //Store the current selected phonic in "previousPhonic" array
                previousPhonic.push(selectedPhonic);
                return selectedPhonic;
            } 
        }
    }    

    //loadLetterChoices function helps to access the data from the json file, obtain an array of letters 
    // create element (div) for each letter, and display all the letters during the DOM Content Loading.
    function loadLetterChoices() {
        
        //Get the Letters choices of the current round
        let datasetKey = "round"+round;
        let dataSet = phonicData[datasetKey];
        //Get the specific dataset (ex."round1" ->"randomSound" --> "choices")
        let obtainChoices= Object.values(dataSet.choices);
        //console.log(obtainChoices);
        
        //Approach1
        // // Get the individual letter elements
        // const lettersElements = document.querySelectorAll('#letters-box .letters');
        // //console.log(lettersElements);
        // // Using a for loop to fill in the data
        // for (let i = 0; i < lettersElements.length; i++) {
            //     lettersElements[i].innerText = obtainChoices[i];
            //     // document.querySelector(lettersElements[i]).innerHTML = obtainChoices[i]; 
            // }
            
            //Approach 2 (More Effecient)
            
            for (let i = 0; i <obtainChoices.length; i++) {
                // Get the container element
                let lettersBox = document.getElementById("letters-box");
                
                //console.log("loadLetterChoices");
            const divElement = document.createElement('div');

            //Add class to the element to apply the css
            divElement.classList.add('letters'); 

            //Adding letter choice 
            let content = document.createTextNode(obtainChoices[i]);
            divElement.appendChild(content);

            //Append the div to the "letters-box" container 
            lettersBox.appendChild(divElement);
        }

        // // Call the callback function once the elements are loaded
        // callback();
    }

    //roundNumber function  is responsible for keeping track of the number of rounds
    //that have been played. It provides a visual indication to the users, showing users he/she are 
    //playing in which round. 
    function roundNumber() {
        let roundNumber = document.querySelector("#roundNumber h3");
    
        //Adding current round number
        let currentRound= document.createTextNode("Round # " + round);
        roundNumber.appendChild(currentRound);
    }
    

    //checkAnswer function responds to the users clicks on any "letter" picked, it access the data to obtain  
    //the correct answer, check the answer, and play a sound effect to indicate the answer is right or wrong.
    //The function call 'trackingScore' fucntions to calculate and display the results.
    //If the round has ended it pushes the scores to "scores" array.
    function checkAnswer(element) {
        if(answerIsSelected==false){

            //Stop the phonic sound if its still did not finish playing 
            const audioElement = document.getElementById('audioContainer');
            audioElement.pause();

            //Get the content of the object clicked on
            let clickedContent = element.target.textContent;
            //console.log(clickedContent); 

            //Get the correct answer
            let datasetKey = "round"+round;
            let dataSet = phonicData[datasetKey];

            // obtain the random selected phonic 
            let currentPhonic = selectedPhonic;
            //console.log(currentPhonic);

            // use Object.values to obtain the random phonic-'' values in array 
            let phoincValues= Object.values(dataSet.randomSound[currentPhonic]);
            //console.log(phoincValues);

            //Always access [1] of the array 
            correctAnswer = phoincValues[1];
            //console.log(correctAnswer);

            if (clickedContent == correctAnswer) {
            correctAnswer=true;
            // //console.log(currentPlayer);

            //Play Cheering Sound
            // Get the the audio element
            let  cheeringSound = document.getElementById('audioAnswer');

            //Define the Sound Path
            let Path= 'img/correctAnswer.mp3';

            // Set attributes and properties
            cheeringSound.src = Path; // Set the audio source
            cheeringSound.controls = true;  // Enable the audio controls (play)
            
            // Play the audio
            cheeringSound.play();

            } else {
                correctAnswer=false;
                // //console.log(currentPlayer);
                
                //Play Cheering Sound
                // Get the the audio element
                let  cheeringSound = document.getElementById('audioAnswer');

                //Define the Sound Path

                // Set attributes and properties
                cheeringSound.src = Path; // Set the audio source
                cheeringSound.controls = true;  // Enable the audio controls (play)
                
                // Play the audio
                cheeringSound.play();

            }

            //console.log(correctAnswer);
            answerIsSelected = true; 
            trackingScore(correctAnswer);
            //console.log("prePhon: " + previousPhonic.length)
            if (previousPhonic.length < 6){
                endRound==false;
            } else {
                // Add logic to push the current round's score
                scores.push([scorePlayerA, scorePlayerB]);
                //console.log(scores);
                endRound==true;
                annouceWinner();
            }        
            
        }
    }


    //trackingScore function helps to calculate and display the results by calling "loadScores" function.
    //Then it uses switchPlayer to switch to the next player. 
    function trackingScore(correctAnswer){

        // Track the player score and after the game ends annouce the winner
        if (previousPhonic.length <= 6){
            //console.log(correctAnswer)
            if (correctAnswer==true){    
                if (currentPlayer=="A"){
                    //console.log(currentPlayer);
                    scorePlayerA+=1;
                    //console.log(scorePlayerA);
                }
                else {
                    //console.log(currentPlayer);
                    scorePlayerB+=1;
                }
            }
        } 

        // Instantly Display the Scores
        loadScores();

        // Switch to the other player
        currentPlayer = switchPlayer(currentPlayer);

    }    

    // The switchPlayer function helps in the switching between two players in a game. 
    // It takes the current player as an input and returns the player that should take the next turn.
    function switchPlayer(current){
        if (current === "A"){
            return "B"
        }
        else{
            return "A"
        }
    }

    //The announceWinner function determines the winner based on the scores of Player A and Player B. 
    // It sets the roundWinner variable to "Player A" if Player A has a higher score, "Player B" if Player B has a higher score, 
    // or "Tie" if the scores are equal. It displays a modal to announce the round winner or game winner based on the current round. 
    // The function updates the content of the respective span elements and shows Bootstrap modals. 
    // If it is the final round, a "Restart" button is provided to reload the page and restart the game.
    function annouceWinner() { 
        //console.log("I here")
        //compare the scores and annouce the winner 
        if (scorePlayerA > scorePlayerB) {
            roundWinner = "Player A";
        } else if (scorePlayerA < scorePlayerB) {
            roundWinner = "Player B";
        } else {
            roundWinner = "Tie";
        }

        //End Game
        if (round < 7) {            
            // Get the roundWinner span element by its ID
            let roundWinnerSpan = document.getElementById("roundWinner");

            // Update the content of the span with the value of roundWinner
            roundWinnerSpan.textContent = roundWinner;

            // Get the modal element by its ID
            let modal = document.getElementById('staticBackdrop');

            // Create a Bootstrap Modal instance
            let modalInstance = new bootstrap.Modal(modal);

            // Trigger the modal to show
            modalInstance.show();

        } else {

            // Get the roundWinner span element by its ID
            let gameWinnerSpan = document.getElementById("gameWinner");

            // Update the content of the span with the value of roundWinner
            gameWinnerSpan.textContent = roundWinner;

            // Get the modal element by its ID
            let modal = document.getElementById('endGameModal');

            // Create a Bootstrap Modal instance
            let modalInstance = new bootstrap.Modal(modal);

            // Trigger the modal to show
            modalInstance.show();
            
            //Restart the game if the users reached final round (round 8)
            let restart = document.getElementById("restartGame");
            
            // Add click event listener to the restartGame button
            restart.addEventListener('click', function() {
            // Reload the page
            location.reload();
            });
        } 

        return roundWinner;
    }

    //The resetGame function is responsible for resetting the game by refreshing the current page. 
    function resetGame(){
        window.location.reload();
    }

    // The rounds function It checks if the current round is less than 8, indicating that there are more rounds to play. 
    //If there are more rounds, the function increments the round number and resets various global variables to their initial values.
    //The function then proceeds to clear the data displayed on the page, including the round number, the letters box, and the trial container. 
    //After clearing the existing content, it calls the playGame function to initiate the gameplay for the new round.
    function rounds(){
        if (round < 8){
            //Increment the round number 
            round += 1;

            //reset all the global variables 
            previousPhonic = [];
            selectedPhonic;
            correctAnswer = false;
            currentPlayer = "A";
            answerIsSelected = false;
            questionNumber = 0;
            roundWinner = "";
            endRound = false;

            //Clear the data displayed in the page
            let roundNumber = document.querySelector("#roundNumber h3");
            let lettersBox = document.getElementById("letters-box");
            let trialcontainer = document.querySelector("#questionNumber h4");

            // Clear the existing content of the trialcontainer
            roundNumber.innerHTML = "";
            // lettersBox.innerHTML = "";
            trialcontainer.innerHTML = "";

            //clearing the letter 
            let removeLetters = document.getElementById("letters-box");
            while (removeLetters.hasChildNodes()) {
                removeLetters.removeChild(removeLetters.firstChild);
            }
            

            //call game function
            playGame();
            //console.log(round);
        }    
    }

    //The playGame function is responsible for initiating the gameplay by executing various actions and setting up event listeners.
    function playGame(){

        //To add animation once the function is loaded  
        addingPlayerAnimation();

        //Display the initial value of the Question Numbers
        numberQuestion()

        //console.log("qn"+questionNumber);
        //console.log("qn"+questionNumber);

        //console.log(previousPhonic.length);

        //Displaying the round number
        roundNumber();

        //About User Input
        // wait the letter boxes to be loaded 
        loadLetterChoices();

        
        //add event to check if the user clicked any button 
        document.querySelectorAll('#letters-box .letters').forEach(function(letter){
            letter.addEventListener('click', function (e) {
                limitAccess=false;
                checkAnswer(e);
                // soundGenerator.addEventListener("click", phonicGenerator);
            });
        });

    }

    // --------------------------------------------DOM Section------------------------------------------ //

    document.addEventListener('DOMContentLoaded', function(event) {

    //Uitlizing Modal to: 1- Welcome User 2-Call the playGame function
    let welcomingModal = new bootstrap.Modal(document.getElementById("welcomingModal"));
    welcomingModal.show();

    let startGame = document.getElementById("startGame");
    startGame.addEventListener ('click', function(){
        welcomingModal.hide();
        loadScores();
        playGame();
    });

    //console.log("scorePlayerA"+scorePlayerA);

    //About Next Game
    //Condition to check if the "nextRound" was clicked or not
    let nextRound = document.getElementById("nextRound");
    nextRound.addEventListener("click", rounds);
    // //console.log("lengthhhhh" + previousPhonic);
    // if (previousPhonic.length == 6){ }


    //clear letters/scores OR Simply Refresh It ! 
    document.getElementById("resetGame").addEventListener("click", resetGame);
      
    //listen to the user click
    // let soundGenerator = document.getElementById("generateSound").addEventListener("click", phonicGenerator)
    document.getElementById("generateSound").addEventListener("click", phonicGenerator);
    

    
});