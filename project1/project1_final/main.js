"use strict"

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
    /* Get data from the form */
    xInput = Number(document.getElementById("xInput").value);
    yInput = Number(document.getElementById("yInput").value);
    choice = Number(document.getElementById("eyes").value);


    drawing.selectAll('svg>*').remove(); // This line selects everything that has been drawn in the SVG and deletes it all
    drawImage();
}

/* set up the drawing canvas - Be sure not to copy this code from your draft project! */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/*
The function below is called when the user presses the "Draw!" button and is where you will put most of your drawing code. Please follow the instructions in the homework PDF for this step.
*/

function drawImage() {


    let dx = xInput; /// a random duck's x position (original = 100)
    let dy = yInput; /// a randowm duck's y position (original = 50)

    /* Elements of the duck that are consctructed with the line function. 
    The only current variable that has properties synced with dx and dy. */
    let duckLefthairstrand = drawing.append("line") /// left hairstrand
        .attr("x1", dx + 100) /// original x1 = 200
        .attr("y1", dy - 39.5) /// original y1 = 10.5
        .attr("x2", dx + 115) /// original x2 = 215
        .attr("y2", dy - 25) /// original y2 = 25
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    let duckMiddlehairstrand = drawing.append("line") /// middle hairstrand
        .attr("x1", dx + 105) /// original x1 = 205
        .attr("y1", dy - 42.5) /// original y1 = 7.5
        .attr("x2", dx + 115) /// original x2 = 215
        .attr("y2", dy - 25) /// original y2 = 25
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    let duckRighthairstrand = drawing.append("line") /// right hairstrand
        .attr("x1", dx + 110) /// original x1 = 210
        .attr("y1", dy - 45) /// original y1 = 5
        .attr("x2", dx + 115) /// original x1 = 215
        .attr("y2", dy - 25) /// original y2 = 25
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    /* Elements of the duck that are conscructed with polylines like head and body*/
    let duckBody = drawing.append("polyline") /// duck's body
        .attr("points", closedPolygon(dx - 25, dy + 75, dx, dy + 50, dx + 80, dy + 50, dx + 132.5, dy + 80, dx + 152.5, dy + 135, dx + 10, dy + 135)) /// 75, 125, 110, 100, 180, 100, 232.5, 130, 252.5, 185, 110, 185
        .attr("fill", "#FEFFBE");

    let duckHead = drawing.append("polyline") /// duck's head
        .attr("points", closedPolygon(dx + 80, dy + 50, dx + 100, dy, dx + 115, dy - 25, dx + 150, dy + 10, dx + 150, dy + 65, dx + 132.5, dy + 64.5, dx + 132.5, dy + 80)) /// 180, 100, 200, 50, 215, 25, 250, 60, 250, 115, 232.5, 114.5, 232.5, 130
        .attr("fill", "#FEFFBE");

    /* The water which is made of one single rectangle */
    let duckWater = drawing.append("rect") /// water
        .attr("x", dx - 75) /// x1 = 25
        .attr("y", dy + 130.5) /// y1 = 182.5
        .attr("width", 250)
        .attr("height", 17.5)
        .attr("fill", "#4DBBFF");

    /* Elements of the duck that are conscructed with triangles */
    let duckTail = drawing.append("polyline") /// duck's tail
        .attr("points", closedPolygon(dx - 45, dy - 5, dx - 25, dy + 75, dx + 10, dy + 50)) /// 55, 45, 75, 125, 110, 100
        .attr("fill", "#FEFFBE"); /// change colour to the correct one later

    let duckWing = drawing.append("polyline") /// duck's wing
        .attr("points", closedPolygon(dx - 10, dy + 100, dx + 75, dy + 50, dx + 80, dy + 140)) /// 90, 150, 175, 100, 180, 190
        .attr("fill", "#9E7445");

    let duckBeak = drawing.append("polyline") /// duck's beak
        .attr("points", closedPolygon(dx + 150, dy + 10, dx + 200, dy + 60, dx + 150, dy + 65)) /// 250, 60, 300, 110, 250, 115
        .attr("fill", "#FF914D");

    /* Duck's eye */
    if (choice == 1) {drawing.append("circle")
            .attr("cx", dx + 130) /// x1 = 230
            .attr("cy", dy + 17.5) /// y1 = 67.5
            .attr("r", 5)
            .attr("fill", "black");
        }
    
    if (choice == 2) {
        drawing.append("line")
            .attr("x1", dx + 125) /// 225
            .attr("y1", dy + 17.5) /// 67.5
            .attr("x2", dx + 135) /// 235
            .attr("y2", dy + 17.5) /// 67.5
            .attr("stroke", "black")
            .attr("stroke-width", 2);
    }


    /// origin point for my drawing dx = 100 and dy = 50. As I didn't have simple shapes at the base of my figure I arbitrarily selected two values that were more or less at the centre of the drawing.




    /***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
}
