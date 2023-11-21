document.addEventListener('DOMContentLoaded', function(event) {


// Breakdown javaScript

// Set the Initial Variables
let round = 1; //round number
let previousPhonic=[];
let selectedPhonic;
let scoreA;
let scoreB;
let currentPlayer = "A"; // Starting player

    //About the Sounds:
    //listen to the user click
    const soundGenerator = document.getElementById("generateSound");
    soundGenerator.addEventListener("click", phonicGenerator);

    function phonicGenerator(){

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
                generateRandomPhonic(obtainKeys); }

            else {
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

        // //to be access by the other functions
        // return selectedPhonic;
    }


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

    //Displaying the round number
    function roundNumber() {
    let roundNumber = document.querySelector("#roundNumber h3");

    //Adding letter choice 
    let currentRound = document.createTextNode("Round #" + round);
    roundNumber.appendChild(currentRound);
    }
    
    roundNumber();

    //About User Input

    // wait the letter boxes to be loaded 
    loadLetterChoices();

    //add event to check if the user clicked any button 
    document.querySelectorAll('#letters-box .letters').forEach(function(letter){
        console.log("event");
        letter.addEventListener('click', checkAnswer)
    });

    
    function checkAnswer(element) {
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
        let phoincXValues= Object.values(dataSet.randomSound[currentPhonic]);
        console.log(phoincXValues);

        //Always access [1] of the array 
        let selectLetterValue = phoincXValues[1];
        console.log(selectLetterValue);
        

        // // let test=Object.values(dataSet.randomSound[selectedPhonic]);
        // //        console.log(test);
        // let correctAnswer= Object.values(dataSet.randomSound[selectedPhonic["correctAnswer"]]); 
        // console.log(correctAnswer);
    
        // if (userSelect == correctAnswer) {
        //     scoreA++;
        // }

        // // Update currentPlayer
        // currentPlayer = (currentPlayer === "A") ? "B" : "A";

        // // Toggle the current player class
        // toggleCurrentPlayer(); //dynamically add/remove a class 
    }
    

    


    // Function to toggle the current player class
    let playerADiv = document.querySelector("#playerA");
    let playerBDiv = document.querySelector("#playerB");
    
    function toggleCurrentPlayer() {
        playerADiv.classList.toggle("currentPlayer");
        playerBDiv.classList.toggle("currentPlayer");
    }

    //About the Scores: 
    // If the player selected the right letter option --> Get one point.
    // Instantly increment and fill in the current score
    // Store the previous round's score 
    // Add logic to add the previous round's score
    // After 6 sounds played, compare the scores and annouce the winner 

    //About Game Reset 
    //clear letters
    //clear scores
    //recall play function

    //About Next Game
    //clear letters
    //clear scores
    //call the next object in the data

});