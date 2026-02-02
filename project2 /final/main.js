"use strict"


let choice, amountName, amountSurname, amountZip; // global variables

document.getElementById("submit").addEventListener("click", processForm);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden"); 
    document.getElementById("reset").toggleAttribute("hidden");
});

function processForm() {

    choice = Number(document.getElementById("species").value); 
    amountName = document.getElementById("name").value; // should be a string element because the input will consist of text data and actually should be checked for not being a number 
    amountSurname = document.getElementById("surname").value;
    amountZip = document.getElementById("zip").value; // using number function in evaluation should be checked that it's a number not a text value

    console.log(amountName)

    /* IC: This code looks for a true or false for whether the data is valid. It only continues to evaluate the answers if the data is valid. You DO NOT need to modify any code between here and the end of the function, nor should you, unless you have a good reason. All versions of this project can be completed WITHOUT modifying the code from this comment to the end of the function, so you should attempt to work with that restriction! */

    let evaluationCompleted = false;

    if (validateData()) {
        evaluationCompleted = evaluateAnswers(); // if we run validateData function, evaluationCompleted is defined by evaluateAnswers function
    }

    if (evaluationCompleted) { 
        document.getElementById("submit").toggleAttribute("hidden");
        document.getElementById("reset").toggleAttribute("hidden");
    } else {
        rule();
    }
}

console.log(amountName)

/* IC: In this function, do any validation with validate the data was correctly entered in general, not for specific cases. Return false if you have told the user that they need to correct something. Return true if all data is valid. We have provided you with the basic constraints for the data, but you may improve the validation as a bonus (as long as you don't mess up our ability to test every option in your evaluateAnswers function!) */

function validateData() {
    let valid = true; 
    const zipPattern = /^(\d{9}|\d{5}-\d{4})$/; // constant pattern for checking the user's input - it has two options for 9 digit and 10 digit numbers
    
    if (!isNaN(amountName)) {
        valid = false;
        output("Please type in a word, not a number"); 
        // first cheking if the name input is a word, and since isNan is a function 
        // we have to put ! before e.g. !isNan(amountName) to unequate amountName to a noun (word)
    }
    else if (amountName.length < 3 || amountName.length > 10) { 
        // then we are validating if the input is the correct number of characters
        valid = false;
        output("Please enter a word longer than 3 and shorter than 10 characters")
    }  
    else if (amountName.trim() != amountName) {
        output("Please exclude spaces in your asnwer"); 
        // and the last is for accidental spaces included in the input
        valid = false;
    }

    if (!isNaN(amountName)) {
        valid = false;
        output("Please type in a word, not a number"); 
    }

    else if (amountSurname.length < 2 || amountName.length > 20 ) { 
        // || instead of && because the value can't be both < 2 and > 20
        output("Please enter a word longer than 2 and shorter than 20 characters");
        valid = false;
    }
    else if (amountSurname.trim() != amountSurname) {
        output("Plese exclude spaces in your answer");
        valid = false;
    }
    
    if (!zipPattern.test(amountZip)) { 
        // we are using test function to check if amountZip input 
        // doesn't follow the required digit pattern
        // also I think RegEX is the only way to check that the input is a number in a dash zip code
        output("Sorry, your zip code can either be 9 digits or 5 digits followed by a dash and 4 digits")
        valid = false;
        console.log(amountZip);
    }
    return valid 
}

document.getElementById("reset").addEventListener("click", function () {
    document.getElementById("output").innerHTML = "";
    document.getElementById("reset").style.display = "none";
})

/* IC: In this function, use conditional logic to figure out if the user's input meets all of the constraints that we have provided. Return false if you have told the user that they need to correct something. Return true if all data is valid. NOTE: Although the focuses of this project are conditional logic and function returns, you may need to create additional variables, do some calculations, and/or do some String manipulation in order to successfully complete your project! */

function evaluateAnswers() {

    const californiaPattern = /^9[0-6][0-1][0-6][1-2]-\d{4}$/
    const hawaiiPattern = /^96[7-8][0-9][1-8]-\d{4}$/
    const unionPattern = /^95336-8271| 953388271$/
    let valid = false

    if (choice == 3 && californiaPattern.test(amountZip)) {
        output("Sorry, California state law prohibits ferret ownership. ");
        valid = true;
    }
    else if (choice == 3 && hawaiiPattern.test(amountZip) ) {
        output("Sorry, due to wildlife conservaton efforts, ferrets are currently prohibited in Hawaii.");
        valid = true;
    }
    else if (choice == 2 && unionPattern.test(amountZip)) {
        output("Sorry, due to local ordinances, dogs are not permitted at this location");
        valid = true;
    }
    else if (choice == 1) {
        output("Sure, you can have a cat" + " " + amountName + ".");
        output("Your pet registration namber is" +  " " + amountZip.substring(5,9) + amountName.substring(0,3) + amountSurname.substring(0,2) + ".");
        valid = true; // document.getElementById("reset").style.display = "block";
    }
    else if (choice == 2) {
        output("Sure, you can have a dog" + " " + amountName + ".");
        output("Your pet registration namber is" + " " + amountZip.substring(5,9) + amountName.substring(0,3) + amountSurname.substring(0,2) + ".");
         valid = true; 
    }
    else if ( choice == 3) {
        output("Sure, you can have a ferret" + " " + amountName + ".");
        output("Your pet registration namber is" + " " + amountZip.substring(5,9) + amountName.substring(0,3) + amountSurname.substring(0,2) + ".");
        valid = true; 
    }
    return valid
}

/* TIP: The above two functions are written using different techniques for communicating success or failure. In your project, we will be looking for consistency -- i.e., choose ONE of these methods (early returns, or tracking the success in a variable) and use it throughout your project! */