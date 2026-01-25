"use strict"


let choice, amountName, amountSurname, amountZip; // global variables

document.getElementById("submit").addEventListener("click", processForm);

document.getElementById("reset").addEventListener("click", function () {
    clear();
    document.getElementById("submit").toggleAttribute("hidden"); // very interesting way of refreshing the output I wish I had known it for lab 3 
    document.getElementById("reset").toggleAttribute("hidden");
});

function processForm() {

    choice = Number(document.getElementById("species").value);
    amountName = document.getElementById("name").value;
    amountSurname = document.getElementById("surname").value;
    amountZip = document.getElementById("zip").value; // regular expressions work only with strings?

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
    const zipPattern = /^(\d{9}|\d{5}-\d{4})$/; // im not sure if i had to learn regular expressions on my own but there was no other way for me to write the condition

    if (amountName.length < 3 || amountName.length > 10) { // || amountName.trim() != amountName || amountName.length > 10  just a note for myself .trim() only works on strings and isNan means not a number
        output("Please enter a word longer than 3 characters and shorter than 10");
        valid = false;
    }  
    else if (amountName.trim() != amountName) {
        output("Please exclude spaces in your asnwer");
        valid = false;
    }

    if (amountSurname.length < 2  || amountName.length > 20 ) {
        output("Please enter a word longer than 2 and shorter than 20 character");
        valid = false;
    }
    else if (amountSurname.trim() != amountSurname) {
        output("Plese exclude spaces in your answer");
        valid = false;
    }
    
    if (!zipPattern.test(amountZip)) { // I don't think I completed this condition but I have no idea how to write a condition for a regular expression that is 
        output("Please enter a number that is 9 digits or 5 digits followed by a dash and 4 digits");
        valid = false;
        console.log(amountZip) 
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
    let valid = true

    if (choice == 3 || californiaPattern.test(amountZip)) {
        output("Sorry, California state law prohibits ferret ownership. ");
        valid = false;
    }
    else if (choice == 3 || hawaiiPattern.test(amountZip) ) {
        output("Sorry, due to wildlife conservaton efforts, ferrets are currently prohibited in Hawaii.");
        valid = false;
    }
    else if (choice == 1) {
        output("Sure, you can have a cat" + " " + amountName + ".");
        output("Your pet registration namber is" +  " " + amountZip.substring(6,9) + amountName.substring(1,3) + amountSurname.substring(1,2) + "."); // document.getElementById("reset").style.display = "block";
    }
    else if (choice == 2) {
        output("Sure, you can have a dog" + " " + amountName + ".");
        output("Your pet registration namber is" + " " + amountZip.substring(6,9) + amountName.substring(1,3) + amountSurname.substring(1,2) + ".");
    }
    else if ( choice == 3) {
        output("Sure, you can have a ferret" + " " + amountName + ".");
        output("Your pet registration namber is" + " " + amountZip.substring(6,9) + amountName.substring(1,3) + amountSurname.substring(1,2) + ".");
    }
    return valid
}

/* TIP: The above two functions are written using different techniques for communicating success or failure. In your project, we will be looking for consistency -- i.e., choose ONE of these methods (early returns, or tracking the success in a variable) and use it throughout your project! */