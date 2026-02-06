"use strict"

/**
 * Draws a lion in specific location.
canvas - an SVG drawing area.
lionX - horizontal position.
lionY - vertical position.
showOrigin - show/hide the pink origin point.
choice - facial expression (1 or 2).
The SVG drawing area.
 */

function lion(canvas, lionX, lionY, showOrigin, choice) {

    /*
    Left ear of the lion
    */
    let lionLeftEar = canvas.append("circle")
        .attr("cx", lionX - 40) // Original point 60
        .attr("cy", lionY - 230) // Original point 70
        .attr("r", 40)
        .attr("fill", "#94754d") //brown

    /*
    Rigth ear of the lion
    */
    let lionRightEar = canvas.append("circle")
        .attr("cx", lionX + 100) // Original point 200
        .attr("cy", lionY - 230) // Original point 70
        .attr("r", 40)
        .attr("fill", "#94754d") //brown

    /*
    Head of the lion
    */
    let lionHead = canvas.append("circle")
        .attr("cx", lionX + 30) // Original point 130
        .attr("cy", lionY - 225) // Original point 75
        .attr("r", 55)
        .attr("fill", "#94754d") //brown

    /*
    Left cheek of the lion
    */
    let lionLeftCheek = canvas.append("ellipse")
        .attr("cx", lionX - 20) // Original point 80
        .attr("cy", lionY - 140) // Original point 160
        .attr("rx", 60)
        .attr("ry", 85)
        .attr("fill", "#94754d") //brown

    /*
    Rigth cheek of the lion
    */
    let lionRightCheek = canvas.append("ellipse")
        .attr("cx", lionX + 80) // Original point 180
        .attr("cy", lionY - 140) // Original point 160
        .attr("rx", 60)
        .attr("ry", 85)
        .attr("fill", "#94754d") //brown

    /*
    Chin of the lion
    */
    let lionChin = canvas.append("circle")
        .attr("cx", lionX + 30) // Original point 130
        .attr("cy", lionY - 70) // Original point 230
        .attr("r", 55)
        .attr("fill", "#94754d") //brown

    /*
    Left inside part ear of the lion
    */
    let lionLeftEarInside = canvas.append("circle")
        .attr("cx", lionX - 45) // Original point 55
        .attr("cy", lionY - 235) // Original point 65
        .attr("r", 20)
        .attr("fill", "#d8ab70") //beight

    /*
    Rigth inside part ear of the lion
    */
    let lionReightEarInside = canvas.append("circle")
        .attr("cx", lionX + 100) // Original point 200
        .attr("cy", lionY - 235) // Original point 65
        .attr("r", 20)
        .attr("fill", "#d8ab70") //beight

    /*
    Face of the lion
    */
    let lionFace = canvas.append("circle")
        .attr("cx", lionX + 25) // // Original point 125
        .attr("cy", lionY - 180) // Original point 120
        .attr("r", 60)
        .attr("fill", "#d8ab70") //beight

    /*
    Nose of the lion
    */
    let lionNose = canvas.append("circle")
        .attr("cx", lionX + 25) // Original point 125
        .attr("cy", lionY - 140) // Original point 160
        .attr("r", 25)
        .attr("fill", "black")

    /*
    This is the mouth of the lion
    The mouth open when the "else" comand start.
    */
    if (choice === "1") {
        let lionMouth = canvas.append("polyline")
            .attr("points", closedPolygon(lionX - 20, lionY - 115, // Original point 80-185, // Corner Left Up
                lionX + 80, lionY - 115, // Original point 180-185, // Corner Rigth Up
                lionX + 40, lionY - 80, // Original point 140-220, // Corner Rigth Down
                lionX + 10, lionY - 80)) // Original point 110, 220, // Corner Left Down
            .attr("fill", "black")
    } else {
        let lionMouth = canvas.append("polyline")
            .attr("points", closedPolygon(lionX - 20, lionY - 115,
                lionX + 80, lionY - 115,
                lionX + 40, lionY - 60,
                lionX + 10, lionY - 60))
    }

    /*
    This is the rigth snout
    */
    let lionLeftSnout = canvas.append("circle")
        .attr("cx", lionX - 5) // Original point 95
        .attr("cy", lionY - 120) // Original point 180
        .attr("r", 30)
        .attr("fill", "#d8ab70") //beight

    /*
    This is the rigth snout
    */
    let lionRightSnout = canvas.append("circle")
        .attr("cx", lionX + 55) // Original point 155
        .attr("cy", lionY - 120) // Original point 180
        .attr("r", 30)
        .attr("fill", "#d8ab70") //beight

    /*
    This is the whisker from the upper left corner
    */
    let lionWhisker1 = canvas.append("line")
        .attr("x1", lionX - 10) // Original point 90, //Horizontal R 
        .attr("x2", lionX - 60) // Original point 40, // Horizontal L
        .attr("y1", lionY - 130) // Original point 170, // Vertical R
        .attr("y2", lionY - 140) // Original point 160, // Vertical L
        .attr("stroke", "black");

    /*
    This is the whisker from the down left corner
    */
    let lionWhisker2 = canvas.append("line")
        .attr("x1", lionX - 10) // Original point 90, //Horizontal R 
        .attr("x2", lionX - 60) // Original point 40, // Horizontal L
        .attr("y1", lionY - 120) // Original point 180, // Vertical R
        .attr("y2", lionY - 100) // Original point 200, // Vertical L
        .attr("stroke", "black");

    /*
    This is the whisker from the upper rigth corner
    */
    let lionWhisker3 = canvas.append("line")
        .attr("x1", lionX + 100) // Original point 200, //Horizontal R 
        .attr("x2", lionX + 50) // Original point 150, // Horizontal L
        .attr("y1", lionY - 140) // Original point 160, // Vertical R
        .attr("y2", lionY - 130) // Original point 170, // Vertical L
        .attr("stroke", "black");

    /*
    This is the whisker from the down rigth corner
    */
    let lionWhisker4 = canvas.append("line")
        .attr("x1", lionX + 100) // Original point 200, //Horizontal R 
        .attr("x2", lionX + 50) // Original point 150, // Horizontal L
        .attr("y1", lionY - 100) // Original point 200, // Vertical R
        .attr("y2", lionY - 120) // Original point 180, // Vertical L
        .attr("stroke", "black");


    /*
    This is the left eye of the lion
    I modified the eyes to make them
    look like a surprised face.
    */
    if (choice === "1") {
        let lionEyeLeft = canvas.append("circle")
            .attr("cx", lionX) // Original point 100
            .attr("cy", lionY - 190) // Original point 110
            .attr("r", 10)
            .attr("fill", "black")
    } else {
        let lionEyeLeft = canvas.append("circle")
            .attr("cx", lionX)
            .attr("cy", lionY - 190)
            .attr("r", 25)
            .attr("fill", "white")
        let lionEyeInsideLeft = canvas.append("circle")
            .attr("cx", lionX - 10) // Original point 100
            .attr("cy", lionY - 200) // Original point 110
            .attr("r", 10)
            .attr("fill", "black");
    }


    /*
    This is the rigth eye of the lion
    I modified the eyes to make them
    look like a surprised face.
    */
    if (choice === "1") {
        let lionEyeRigth = canvas.append("circle")
            .attr("cx", lionX + 50) // Original point 150
            .attr("cy", lionY - 190) // Original point 110
            .attr("r", 10)
            .attr("fill", "black")
    } else {
        let lionEyeRight = canvas.append("circle")
            .attr("cx", lionX + 50)
            .attr("cy", lionY - 190)
            .attr("r", 25)
            .attr("fill", "white")
        let lionEyeInsideRigth = canvas.append("circle")
            .attr("cx", lionX + 40)
            .attr("cy", lionY - 200)
            .attr("r", 10)
            .attr("fill", "black");
    }

    if (showOrigin === true) {
        canvas.append("circle")
            .attr("cx", lionX)
            .attr("cy", lionY)
            .attr("r", 3)
            .attr("fill", "deeppink");
    }

    return canvas;
}