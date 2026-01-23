"use strict"



let fahrenheit, conversionType, kelvin, celsius;

document.getElementById("submit").addEventListener("click", function () {
    fahrenheit = document.getElementById("inputF").value;
    conversionType = document.getElementById("ConversionChoice").value;
    kelvin = Math.round((Number(fahrenheit) + 459.67) * 5 / 9);
    celsius = Math.round((Number(fahrenheit) - 32) * 5 / 9);

    if (conversionType == "c") {
        output("Temperature (F):" + fahrenheit);
        output("Conversion to Celsius):" + celsius);
    }
    else  {
        output("Temperature (F):" + fahrenheit);
        output("Conversion to Kelvin):" + kelvin);
    }

    /*  if (conversionType == "c") {
        output("Temperature (fahrenheit):" + fahrenheit);
        output("Temperature (celsius):" + celsius);
    }
    if (conversionType == "k") {
        output("Temperature (fahrenheit):" + fahrenheit);
        output("Temprature (kelvin):" + kelvin);
    }; */

    /* 
    I think both of these methods work fine in this case as 
    we have defined exclusively two possible values for the user to
    choose and it doesn't really matter if we are evaluating conditions 
    of two ifs or just one
    */

    document.getElementById("end").style.display = "block"; // wow I learned a lot about display properties while trying to make this work and they are pretty cool
});
 
document.getElementById("reset").addEventListener("click", function () {
    document.getElementById("output").innerHTML = "";
    document.getElementById("end").style.display = "none"; // I just couldn't figure out this code forever and I'm so happy I did -_-
});

   

