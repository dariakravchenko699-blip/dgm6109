"use strict"

/* Configuration variables: drawing */
let svgWidth = 800;
let svgHeight = 600;

let marginLeft = 80;
let marginRight = 25;
let marginTop = 120;
let marginBottom = 60;

// CANVAS SETUP
d3.select("#container")
  .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

/* Draw margin border. */
// svg.append("rect")
//   .attr("fill", "none")
//   .attr("stroke", "black")
//   .attr("stroke-dasharray", "5")
//   .attr("x", marginLeft)
//   .attr("y", marginTop)
//   .attr("width", svgWidth - (marginRight + marginLeft))
//   .attr("height", svgHeight - (marginBottom + marginTop));


// DEFINE DATASET
let mcph_data = mcphases_data
let data = mcphases_data.slice(0, 200) // because the sample is too big and the scatterplot get lost

// SORTING MINUTESASLEEP FROM BIGGER TO SMALLER VALUES
data = data.sort(function (a, b) {
  if (a["activity"] > b["activity"]) {
    return -1
  }
  return 1
})

/* roughly estimating max values for array properties */

let maxSleep = d3.max(data, function(d) {
  return d.minutesasleep
});
let minSleep = 50;
let maxActivity = d3.max(data, function(d) {
  return  d.activity 
});
let maxRadius = 15;
let minActivity = 0;


// creating scaling functions

let xScale = d3.scaleLinear()
  .domain([minSleep, maxSleep])
  .range([marginLeft + maxRadius + 40, svgWidth - marginRight - maxRadius - 10]);

let yScale = d3.scalePoint()
  .domain(["Not at all", "Very Low/Little", "Low", "Moderate", "High", "Very High"])
  .range([svgHeight - marginBottom - maxRadius - 20, marginTop + maxRadius + 25]);

let rScale = d3.scaleLinear()
  .domain([0, maxActivity])
  .range([1, maxRadius])

// drawing the scatterplot

let circles = svg.selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", function (value) {
    return xScale(value["minutesasleep"])
  })
  .attr("cy", function (value) {
    return yScale(value["stress"]) //
  })
  .attr("r", function (value) {
    return rScale(value["activity"]) 
  })
  .attr("fill", function (value) {
    if (value["phase"] == "Menstrual") {
      return "red"
    }
    else if (value["phase"] == "Follicular") {
      return "orange"
    }
    else if (value["phase"] == "Fertility") {
      return "blue"
    }
    else if (value["phase"] == "Luteal") {
      return "yellow"
    }
  })


// X AXIS VALUE 
let levels = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550 ]
let level_reverse = ["Not at all", "Very Low/Little", "Low", "Moderate", "High", "Very High"]

for (let i = 0; i < levels.length; i++) {
  svg.append("text")
    .classed("axis", true)
    .attr("x", xScale(levels[i]))
    .attr("y", svgHeight - marginBottom )
    .style("text-anchor", "middle")
    .style("alignment-baseline", "before-edge")
    .style("font-size", "17px")
    .text(levels[i])
}

/* Y AXIS VALUES */
for (let i = 0; i < level_reverse.length; i++) {
  svg.append("text")
    .classed("axis", true)
    .attr("x", marginLeft - 5)
    .attr("y", yScale(level_reverse[i]))
    .style("text-anchor", "end")
    .style("alignment-baseline", "middle")
    .style("font-size", "14px")
    .text(level_reverse[i])
}

// DRAWING AXIS LINES
svg.append("line")
  .attr("x1", marginLeft)
  .attr("y1", svgHeight - marginBottom )
  .attr("x2", svgWidth - marginRight )
  .attr("y2", svgHeight - marginBottom )
  .attr("stroke", "black")

svg.append("line")
  .attr("x1", marginLeft)
  .attr("y1", svgHeight - marginBottom )
  .attr("x2", marginLeft )
  .attr("y2", marginTop )
  .attr("stroke", "black")




/**** label the axes ****/
let xAxisLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - marginBottom/ 2)
  .style("text-anchor", "middle")
  .text("Sleep (in minutes)")


let yAxisLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("x", - svgHeight / 2)
  .attr("y", marginLeft / 2 - 28)
  .attr("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .text("Stress")
  .attr("transform", "rotate(-90)")
  .style("font-size", "20px");

// // MAP LEGENDS

svg.append("text")
  .text("Phase")
  .attr("x", 120)
  .attr("y", 20)
  .style("text-anchor", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px")
  .style("text-decoration", "underline")

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "red")
  .attr("x", 20)
  .attr("y", 30)

svg.append("text")
  .text("Menstrual")
  .attr("x", 35)
  .attr("y", 35)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "orange")
  .attr("x", 20)
  .attr("y", 50)

svg.append("text")
  .text("Follicular")
  .attr("x", 35)
  .attr("y", 55)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "lightblue")
  .attr("x", 20)
  .attr("y", 70)

svg.append("text")
  .text("Fertility")
  .attr("x", 35)
  .attr("y", 75)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");


svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "yellow")
  .attr("x", 100)
  .attr("y", 35)

svg.append("text")
  .text("Luteal")
  .attr("x", 120)
  .attr("y", 40)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

// LEGEND FOR the activity metric (circles)

let lowKey = svg.append("circle")
    .attr("fill", "grey")
    .attr("cx", 280)
    .attr("cy", 30 + rScale(maxActivity))
    .attr("r", rScale(minActivity))

let lowKeyLabel = svg.append("text")
    .text(minActivity)
    .attr("x", Number(lowKey.attr("cx")) + Number(lowKey.attr("r")) + 5)
    .attr("y", 30 + rScale(maxActivity))
    .style("alignment-baseline", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "13px")

let highKey = svg.append("circle")
    .attr("fill", "grey")
    .attr("cx", Number(lowKeyLabel.attr("x")) + 25 + rScale(maxActivity) + 20)
    .attr("cy", 30 + rScale(maxActivity))
    .attr("r", rScale(maxActivity))

let highKeyLabel = svg.append("text")
    .text(maxActivity)
    .attr("x", Number(highKey.attr("cx")) + Number(highKey.attr("r")) + 5)
    .attr("y", 30 + rScale(maxActivity))
    .style("alignment-baseline", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "13px")

svg.append("text")
    .text("Activity in mins")
    .attr("x", 350)
    .attr("y", 20)
    .style("font-family", "sans-serif")
    .style("font-size", "13px")
    .style("text-decoration", "underline")
    .style("text-anchor", "middle")

