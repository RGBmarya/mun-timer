const modTitle = document.getElementById("modTitle");
const topic = document.getElementById("topic");

//Updates the header of the page with the given topic of the moderated caucus
topic.addEventListener("keydown", event => {
    if(event.code == "Enter" && topic.value){
        console.log(modTitle)
        console.log(topic.value)
        modTitle.innerHTML = topic.value;
    }
})


const totalTime = document.getElementById("totalTime");
const speakingTime = document.getElementById("speakingTime");

//checks if the total time is divisible by the speaking time
const checkSpeakingTime = () => {
    if(totalTime.value % speakingTime.value != 0){
        alert("Total time IS NOT divisible by speaking time");
    }
    else{
        alert("Total time IS divisible by speaking time") // remove later on - will get annoying
    }
}

//forces total time to be entered before speaking time before checkSpeakingTime() is called
speakingTime.addEventListener("keydown", event =>{
    if(event.code == "Enter" && speakingTime.value){
        if(!totalTime.value){ //total time has not been entered
            alert("Enter total speaking time.")
        }
        else{
            checkSpeakingTime();
        }
    }
})


const addButton = document.getElementById("countryAddButton");
let input = document.getElementById("countryInput");
const container = document.querySelector(".container");
let curSpeakerNum = 1; 

//country class represents a div element in "container"
class country{
    constructor(country){
        if(!totalTime.value || !speakingTime.value){ //check if user has entered total time and speaking time - necessary to calculate max speakers
            alert("Enter total time and speaking time");
        }
        else if(curSpeakerNum <= totalTime.value / speakingTime.value){ //checks if max speaker limit has not been reached
            this.createDiv(country);
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