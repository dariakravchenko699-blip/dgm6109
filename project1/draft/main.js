"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);



/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)
*/
let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

/* Elements of the duck that are conscructed with the line function */
let duckLefthairstrand = drawing.append("line") /// left hairstrand
    .attr("x1", 200) 
    .attr("y1", 10.5) 
    .attr("x2", 215)
    .attr("y2", 25)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

let duckMiddlehairstrand = drawing.append("line") /// middle hairstrand
    .attr("x1", 205)
    .attr("y1", 7.5)
    .attr("x2", 215)
    .attr("y2", 25)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

let duckRighthairstrand = drawing.append("line") /// right hairstrand
    .attr("x1", 210)
    .attr("y1", 5)
    .attr("x2", 215)
    .attr("y2", 25)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

/* Elements of the duck that are conscructed with polylines like head and body*/
let duckBody = drawing.append("polyline") /// duck's body
.attr("points", closedPolygon(75, 125, 110, 100, 180, 100, 232.5, 130, 252.5, 185, 110, 185))
.attr("fill", "#FEFFBE");

let duckHead = drawing.append("polyline") /// duck's head
.attr("points", closedPolygon(180, 100, 200, 50, 215, 25, 250, 60, 250, 115, 232.5, 114.5, 232.5, 130))
.attr("fill", "#FEFFBE");

/* The water which is made of one single rectangle */
let duckWater = drawing.append("rect") /// water
    .attr("x", 25)
    .attr("y", 182.5)
    .attr("width", 250)
    .attr("height", 17.5)
    .attr("fill", "#4DBBFF");

/* Elements of the duck that are conscructed with triangles */
let duckTail = drawing.append("polyline") /// duck's tail
    .attr("points", closedPolygon(55, 45, 75, 125, 110, 100))
    .attr("fill", "#FEFFBE"); /// change colour to the correct one later

let duckWing = drawing.append("polyline") /// duck's wing
    .attr("points", closedPolygon(90, 150, 175, 100, 180, 190))
    .attr("fill", "#9E7445");

let duckBeak = drawing.append("polyline") /// duck's beak
    .attr("points", closedPolygon(250, 60, 300, 110, 250, 115))
    .attr("fill", "#FF914D");

/* Duck's eye */
let duckEye = drawing.append("circle")
.attr("cx", 230)
.attr("cy", 67.5)
.attr("r", 5)
.attr("fill", "black");