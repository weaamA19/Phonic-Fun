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

    // Breakdown javaScript

    // Set the Initial Variables
    let round = 1; //round number
    let previousPhonic=[];
    let selectedPhonic;
    let correctAnswer=false;
    let scores = [[0, 0]];
    let PlayerA=0;
    let PlayerB=1;
    // let scoreA=0;
    // let scoreB=0;
    let currentPlayer = "A"; // Starting player
    let answerIsSelected = false; 
    let questionNumber=0;
    let roundWinner="";
    let endRound=false;
    let gameWinner = "";
    
    // An Array of Arrays will be used to store the current store and access previous round's score 
    let scorePlayerA = scores[round - 1][PlayerA];
    let scorePlayerB = scores[round - 1][PlayerB];
    console.log("scorePlayerA"+scorePlayerA);

    function loadScores(){
        // Access the scores containers 
        let scoreA_Container = document.querySelector(".scoreA");
        let scoreB_Container = document.querySelector(".scoreB");
        scoreA_Container.textContent = scorePlayerA;
        scoreB_Container.textContent = scorePlayerB;
    }


    function playGame(){
        // Function to toggle the current player class
        let playerADiv = document.querySelector("#playerA");
        let playerBDiv = document.querySelector("#playerB");
        
        function addingPlayerAnimation () {
            console.log("cp="+currentPlayer)
            if (currentPlayer == "A"){
                playerADiv.classList.add("currentPlayer");
                playerBDiv.classList.remove("currentPlayer");
            }
            else {
                playerBDiv.classList.add("currentPlayer");
                playerADiv.classList.remove("currentPlayer");  
            }
        }

        //To add animation once the function is loaded  
        addingPlayerAnimation();

        //Display the initial value of the Question Numbers
        numberQuestion()

        //Tracking Question Number 
        function numberQuestion(){
            //Displaying the Question Number
            let trialcontainer = document.querySelector("#questionNumber h4");

            // Clear the existing content of the trialcontainer
            trialcontainer.innerHTML = "";
            
            //Adding current trial number
            let question= document.createTextNode("Question Number " + questionNumber + "/6");
            trialcontainer.appendChild(question);
        }

        //About the Sounds:
        //listen to the user click
        const soundGenerator = document.getElementById("generateSound");
        soundGenerator.addEventListener("click", phonicGenerator);

        console.log("qn"+questionNumber);

        function phonicGenerator(){
            // New question
            answerIsSelected = false;

            //Get the dataset of the current round
                let datasetKey = "round"+round;
                let dataSet = phonicData[datasetKey];
                // console.log(Object.keys(dataSet.randomSound));
            
            //Select Randomly the letters sounds (ex."round1" ->"randomSound" --> "phonic1")
                let obtainKeys= Object.keys(dataSet.randomSound); 
                console.log(obtainKeys);

            //To avoid selecting previous Phonic a while loop was used 
            //add condition to ensure after 6 sounds played it alters "Round Ended"
                if (previousPhonic.length < 6){
                    generateRandomPhonic(obtainKeys); 

                    //Question Number
                    questionNumber += 1;
                    console.log("qn"+questionNumber); 
                }
                else {
                    playerBDiv.classList.remove("currentPlayer");
                    playerADiv.classList.remove("currentPlayer");  
                    alert("The Round has Ended"); 
                    return;
                }
            
                console.log(selectedPhonic);
                console.log(previousPhonic);

            // Access the the audio element
            let  soundName = Object.values(dataSet.randomSound[selectedPhonic]);
            console.log(soundName);

            //Define the Sound Path
            let soundPath= './sounds/round' + round + '/' + soundName[0];
            console.log(soundPath);

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

        console.log("qn"+questionNumber);


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

        //About the Letters' Displayed:
        function loadLetterChoices() {
            
            //Get the Letters choices of the current round
            let datasetKey = "round"+round;
            let dataSet = phonicData[datasetKey];
            //Get the specific dataset (ex."round1" ->"randomSound" --> "choices")
            let obtainChoices= Object.values(dataSet.choices);
            console.log(obtainChoices);
            
            //Approach1
            // // Get the individual letter elements
            // const lettersElements = document.querySelectorAll('#letters-box .letters');
            // console.log(lettersElements);
            // // Using a for loop to fill in the data
            // for (let i = 0; i < lettersElements.length; i++) {
                //     lettersElements[i].innerText = obtainChoices[i];
                //     // document.querySelector(lettersElements[i]).innerHTML = obtainChoices[i]; 
                // }
                
                //Approach 2 (More Effecient)
                
                for (let i = 0; i <obtainChoices.length; i++) {
                    // Get the container element
                    let lettersBox = document.getElementById("letters-box");
                    
                    console.log("loadLetterChoices");
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
        console.log(previousPhonic.length);

        //Displaying the round number
        function roundNumber() {
            let roundNumber = document.querySelector("#roundNumber h3");
        
            //Adding current round number
            let currentRound= document.createTextNode("Round # " + round);
            roundNumber.appendChild(currentRound);
        }
        
        roundNumber();

        //About User Input
        // wait the letter boxes to be loaded 
        loadLetterChoices();

        //add event to check if the user clicked any button 
        document.querySelectorAll('#letters-box .letters').forEach(function(letter){
        letter.addEventListener('click', checkAnswer)
        });

        function checkAnswer(element) {
            if(answerIsSelected==false){
                //Get the content of the object clicked on
                let clickedContent = element.target.textContent;
                console.log(clickedContent); 

                //Get the correct answer
                let datasetKey = "round"+round;
                let dataSet = phonicData[datasetKey];

                // obtain the random selected phonic 
                let currentPhonic = selectedPhonic;
                console.log(currentPhonic);

                // use Object.values to obtain the random phonic-'' values in array 
                let phoincValues= Object.values(dataSet.randomSound[currentPhonic]);
                console.log(phoincValues);

                //Always access [1] of the array 
                correctAnswer = phoincValues[1];
                console.log(correctAnswer);

                if (clickedContent == correctAnswer) {
                correctAnswer=true;
                console.log(currentPlayer);

                } else {
                    correctAnswer=false;
                    console.log(currentPlayer);
                }

                console.log(correctAnswer);
                answerIsSelected = true; 
                trackingScore(correctAnswer);

                if (previousPhonic.length < 6){
                    endRound==false;
                } else {
                    // Add logic to push the current round's score
                    scores.push([scorePlayerA, scorePlayerB]);
                    console.log(scores);
                    endRound==true;
                    annouceWinner();
                }        
                
            }
        }



        //About the Scores: 
        function trackingScore(correctAnswer){

            // Track the player score and after the game ends annouce the winner
            if (previousPhonic.length <= 6){
                console.log(correctAnswer)
                if (correctAnswer==true){    
                    if (currentPlayer=="A"){
                        console.log(currentPlayer);
                        scorePlayerA+=1;
                        console.log(scorePlayerA);
                    }
                    else {
                        console.log(currentPlayer);
                        scorePlayerB+=1;
                    }
                }
            } 

            // Instantly Display the Scores
            loadScores();

            // Switch to the other player
            currentPlayer = switchPlayer(currentPlayer);

        }    



        function switchPlayer(current){
            if (current === "A"){
                return "B"
            }
            else{
                return "A"
            }
        }

        
        function annouceWinner() {
            //compare the scores and annouce the winner 
            if (scorePlayerA > scorePlayerB) {
                roundWinner = "A";
            } else if (scorePlayerA < scorePlayerB) {
                roundWinner = "B";
            } else {
                roundWinner = "Tie";
            }

            // Get the roundWinner span element by its ID
            let roundWinnerSpan = document.getElementById("roundWinner");

            // Update the content of the span with the value of roundWinner
            roundWinnerSpan.textContent = "Player " + roundWinner;

            // Get the modal element by its ID
            let modal = document.getElementById('staticBackdrop');

            // Create a Bootstrap Modal instance
            let modalInstance = new bootstrap.Modal(modal);

            // Trigger the modal to show
            modalInstance.show();

            return roundWinner;
        }

        //About Game Reset 
        //clear letters/scores OR Simply Refresh It ! 
        document.getElementById("resetGame").addEventListener("click", resetGame);
        function resetGame(){
            window.location.reload();
        }

        endGame(); 
    }


    //About Next Game

    //Condition to check if the "nextRound" was clicked or not
    const nextRound = document.getElementById("nextRound");
    nextRound.addEventListener("click", rounds);
    console.log(round);

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

            //Clear the page
            let roundNumber = document.querySelector("#roundNumber h3");
            let lettersBox = document.getElementById("letters-box");

            // Clear the existing content of the trialcontainer
            roundNumber.innerHTML = "";
            lettersBox.innerHTML = "";

            //call game function
            playGame();
            console.log(round);
        }    
    }

    function endGame(){

        if (round == 7){

            //Check if the game reached final round (round 8) annouce the winner
            if (scorePlayerA > scorePlayerB) {
                gameWinner = "A";
            } else if (scorePlayerA < scorePlayerB) {
                gameWinner = "B";
            } else {
                gameWinner = "Tie";
            }

            // Get the roundWinner span element by its ID
            let gameWinnerSpan = document.getElementById("gameWinner");

            // Update the content of the span with the value of roundWinner
            gameWinnerSpan.textContent = "Player " + gameWinner;

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

    }

    

});