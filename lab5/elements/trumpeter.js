"use strict"

/****** drawTrumpeter(svgArea, horizontalPosition, verticalPosition, booleanValue) *******
Draws a trumpeter on an SVG canvas, including the body, 
a trumpet, and dynamic musical notes based on external conditions. Also, if you change the world 
true in the main.js to false the dot is going to disappear. Try it!:)

Parameters:
  svgArea: The canva selection object where the character will be appended.
  horizontalPosition: The base X-coordinate for the trumpeter's position.
  verticalPosition: The base Y-coordinate for the trumpeter's position.
  booleanValue: A flag that, if true, draws a deeppink dot 
                precisely in the center of the trumpeter's head.

Returns:
  The updated svgArea object containing the new graphical elements.
********************************/

function drawTrumpeter(svgArea, horizontalPosition, verticalPosition, booleanValue) {

    /* trumpeter girl or boy */

    /* this is the 
    trumpeter head */
    let trumpeterHead = svgArea.append("circle")
        .attr("cx", horizontalPosition - 25)//horizontal, //original 75
        .attr("cy", verticalPosition - 250)//vertical, // original 50
        .attr("r", 20)
        .attr("fill", "#ffc1c1");//This is the colour

    /* this is the 
      trumpeter leg left */
    let trumpeterLegLeft = svgArea.append("line")
        .attr("x1", horizontalPosition - 25)//this is the position up, //original 75
        .attr("y1", verticalPosition - 99)//this is the lenght of the object up, //original 201
        .attr("x2", horizontalPosition - 25)//this is the position down, //original 75
        .attr("y2", verticalPosition - 21)//this is the lenght of the object down, //original 279
        .attr("stroke", "black")//this is the colour
        .attr("stroke-width", 1);

    /* this is the 
    trumpeter leg right */
    let trumpeterLegRight = svgArea.append("line")
        .attr("x1", horizontalPosition - 10)//this is the position up, //original 90
        .attr("y1", verticalPosition - 99)//this is the lenght of the object up, //original 201
        .attr("x2", horizontalPosition - 10)//this is the position down, //original 90
        .attr("y2", verticalPosition - 21)//this is the lenght of the object down, //original 279
        .attr("stroke", "black")//this is the colour
        .attr("stroke-width", 1);

    /* this is the 
    trumpeter body */
    let trumpeterBody = svgArea.append("polygon")
        .attr("points", closedPolygon(horizontalPosition - 25, verticalPosition - 230,//up//original 75, 70
            horizontalPosition - 66, verticalPosition - 89,//leftdown //up//original 34, 211
            horizontalPosition - 25, verticalPosition - 99,//centerdown //up//original 75, 201
            horizontalPosition + 15, verticalPosition - 89,//rightdown //up//original 115, 211
        ))
        .attr("fill", "#ffc3ff");//this is the colour

    /* this is the 
    trumpeter foot right */
    let trumpeterFootRight = svgArea.append("line")
        .attr("x1", horizontalPosition + 5)//this is the lengh of the foot horizontal, //original 105
        .attr("y1", verticalPosition - 16)//this is the lengh of the foot vertical, //original 284
        .attr("x2", horizontalPosition - 10)//this is the position horizontal, //original 90
        .attr("y2", verticalPosition - 21)//this is the lenght of the object vertical, //original 279
        .attr("stroke", "black")//this is the colour
        .attr("stroke-width", 1);

    /* this is the 
    trumpeter foot left */
    let trumpeterFootLeft = svgArea.append("line")
        .attr("x1", horizontalPosition - 10)//this is the lengh of the foot horizontal, //original 90
        .attr("y1", verticalPosition - 16)//this is the lengh of the foot vertical, //original 284
        .attr("x2", horizontalPosition - 25)//this is the position horizontal, //original 75
        .attr("y2", verticalPosition - 21)//this is the lenght of the object vertical, //original 279
        .attr("stroke", "black")//this is the colour
        .attr("stroke-width", 1);

    /* this is the 
    trumpeter arm down left */
    let trumpeterArmDownLeft = svgArea.append("line")
        .attr("x1", horizontalPosition + 20)//arm poistion horizontal up, //original 120
        .attr("y1", verticalPosition - 212)//arm poistion vertical up, //original 88
        .attr("x2", horizontalPosition - 20)//arm position horizontal down, //original 80
        .attr("y2", verticalPosition - 201)//arm position vertical down, //original 99
        .attr("stroke", "black")//this is the colour
        .attr("stroke-width", 1);

    /* this is the 
    trumpeter arm down right */
    let trumpeterArmDownRight = svgArea.append("line")
        .attr("x1", horizontalPosition + 15)//arm poistion horizontal up, //original 115
        .attr("y1", verticalPosition - 216)//arm poistion vertical up, //original 84
        .attr("x2", horizontalPosition - 20)//arm position horizontal down, //original 80
        .attr("y2", verticalPosition - 206)//arm position vertical down, //original 94
        .attr("stroke", "black")//this is the colour
        .attr("stroke-width", 1);

    /* this is the 
    trumpeter arm up left */
    let trumpeterArmUpLeft = svgArea.append("line")
        .attr("x1", horizontalPosition + 20)//arm poistion horizontal down, //original 120
        .attr("y1", verticalPosition - 212)//arm poistion vertical down, //original 88
        .attr("x2", horizontalPosition + 30)//arm position horizontal up, //original 130
        .attr("y2", verticalPosition - 245)//arm position vertical down, //original 55
        .attr("stroke", "black")//this is the colour
        .attr("stroke-width", 1);

    /* this is the 
    trumpeter arm right */
    let trumpeterArmRight = svgArea.append("line")
        .attr("x1", horizontalPosition + 15)//arm poistion horizontal up, //original 115
        .attr("y1", verticalPosition - 216)//arm poistion vertical up, //original 84
        .attr("x2", horizontalPosition + 5)//arm position horizontal up, //original 105
        .attr("y2", verticalPosition - 245)//arm position vertical up, //original 55
        .attr("stroke", "black")//this is the colour
        .attr("stroke-width", 1);
    /* this is the 
      trumpeter trumpet body */

    let trumpeterTrumpBody = svgArea.append("rect")
        .attr("x", horizontalPosition - 5)//position of the trumpetbody horizontal, //original 95
        .attr("y", verticalPosition - 250)//position of the trumpetbody Vertical, //original 50
        .attr("width", 60)//Width of the trumpetbody horizontal
        .attr("height", 5)//Width of the trumpetbody vertical
        .attr("fill", "#e0ae00")//this is the colour

    /* this is the 
    trumpeter trumpet detail */
    let trumpeterTrumpetDetail = svgArea.append("rect")
        .attr("x", horizontalPosition + 30)//position of the trumpetbody horizontal, //original 130
        .attr("y", verticalPosition - 250)//position of the trumpetbody Vertical, //original 50
        .attr("width", 5)//width of the trumpetbody horizontal
        .attr("height", 5)//width of the trumpetbody vertical
        .attr("fill", "none")//this is the colour
        .attr("fill", "black");

    /* this is the 
    trumpeter Trumpet triangle */
    let trumpeterTrumpet = svgArea.append("polygon")
        .attr("points", closedPolygon(horizontalPosition + 45, verticalPosition - 250, //leftup corner , //original 145, 50
            horizontalPosition + 70, verticalPosition - 270, //rightup corner, //original 170, 30
            horizontalPosition + 70, verticalPosition - 225, //rightdown corner, //original 170, 75
            horizontalPosition + 45, verticalPosition - 245)) //leftdown corner, //original 145, 55
        .attr("fill", "#e0ae00")//this is the colour

    /* this is the 
  trumpet Circle */
    let trumpterTrumpetCircle = svgArea.append("circle")
        .attr("cx", horizontalPosition + 65)//horizontal, //original 165
        .attr("cy", verticalPosition - 247.5)//vertical, //original 52.5
        .attr("r", 11.5)//radio
        .attr("fill", "none")
        .attr("fill", "#e0ae00")//this is the colour
    /* this is the musical note circle up */

            if (booleanValue === true) {
                
                let booleanValue = svgArea.append("circle")
                    .attr("cx", horizontalPosition-25)
                    .attr("cy", verticalPosition-250)
                    .attr("r", 3)
                    .attr("fill", "deeppink");
            }
        
return svgArea;
/***** DO NOT ADD OR EDIT ANYTHING BELOW THIS LINE ******/
    }