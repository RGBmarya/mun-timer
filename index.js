const modTitle = document.getElementById("modTitle");
const topic = document.getElementById("topic");
const totalTime = document.getElementById("totalTime");
const speakingTime = document.getElementById("speakingTime");
const addButton = document.getElementById("countryAddButton");
const container = document.querySelector(".container");
const speakerCounter = document.getElementById("speakerCounter");

        const setPage = (topic) => {
            // console.log(modTitle)
            // console.log(topic)
            modTitle.innerHTML = topic;
        }

        const updateSpeakingTime = () => {
            //forces total time to be entered before speaking time before checkSpeakingTime() is called
            if(!totalTime.value){ //total time has not been entered
                alert("Enter total speaking time first.")
            }
            else{ //checks if the total time is divisible by the speaking time
                if(totalTime.value % speakingTime.value != 0){
                    alert("Total time IS NOT divisible by speaking time");
                }
                else{
                    alert("Total time IS divisible by speaking time") // remove later on - will get annoying
                }
            }
            updateMaxSpeakers(totalTime.value, speakingTime.value);
        }
        
        const updateMaxSpeakers = (totalTime, speakingTime) => {
            speakerCounter.innerHTML = `${totalTime / speakingTime}`
        }
        
        
        let input = document.getElementById("countryInput");
        let curSpeakerNum = 1; 
        //country class represents a div element in "container"
        class country{
            constructor(country){
                if(!totalTime.value || !speakingTime.value){ //check if user has entered total time and speaking time - necessary to calculate max speakers
                    alert("Enter total time and speaking time");
        }
        else if(curSpeakerNum <= totalTime.value / speakingTime.value){ //checks if max speaker limit has not been reached
            this.createDiv(country);
            speakerCounter.innerHTML = ` - ${curSpeakerNum} / ${totalTime.value / speakingTime.value}`; //update speaker counter
            curSpeakerNum++;
        }
        else{
            alert("Max speakers reached");
        }
    }

    createDiv(itemName){
        let input = document.createElement('input');
        input.type = "text";
        input.classList.add('countryInput');
        input.id = itemName.toLowerCase();
        input.disabled = true;
        input.value = itemName;
        
        let countryBox = document.createElement('div');
        countryBox.classList.add('country');

        let editButton = document.createElement('button');
        editButton.innerHTML = "EDIT"
        editButton.classList.add('editButton');
        editButton.id = itemName;
        editButton.onclick = (() => {
            if(editButton.innerHTML === "EDIT"){
                editButton.innerHTML = "LOCK"
            }
            else{
                editButton.innerHTML = "EDIT"
            }
        });

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "X"
        removeButton.classList.add('removeButton');

        container.appendChild(countryBox);

        countryBox.appendChild(input);
        countryBox.appendChild(editButton);
        countryBox.appendChild(removeButton);

        editButton.addEventListener('click', () => this.edit(input));
        removeButton.addEventListener('click', () => this.remove(countryBox));
        
    }

    edit(input){
        input.disabled = !input.disabled;
    }

    remove(country){
        container.removeChild(country);
        curSpeakerNum--;
    }
}


const checkCountryInput = () => {
    if(document.getElementById(input.value.toString().toLowerCase()) === null){ //checks if country has already been entered
        if(input.value != ""){ //checks if user has entered a country
            new country(input.value);
            input.value = "";
        }
        else{
            alert("Please enter a valid country");
        }
    }
    else{
        alert("Please enter a new country");
    }
}

input.addEventListener("keydown", (event) =>{
    if(event.code === "Enter"){
        checkCountryInput();
    }
})

const timer = document.getElementById("timer");
let speakingTimeRemaining = 30 //speakingTime.value;


const updateTimer = () => {
    const minutes = Math.floor(speakingTimeRemaining / 60);
    let seconds = speakingTimeRemaining % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    timer.innerHTML =  `Time remaining - ${minutes}:${seconds}`;
    speakingTimeRemaining--;
}


const startTimer = () => {
    setInterval(updateTimer, 1000);
}

const stopTimer = () =>{
    clearInterval(updateTimer)   
}