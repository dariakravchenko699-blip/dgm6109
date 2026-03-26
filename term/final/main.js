"use strict"

// Establishing canvas dimensions

let svgHeight = 1000;
let svgWidth = 800; // canvas' total width and height

// Establishing canvas margins - to help with legend positioning

let bottommMargin = 60;
let topMargin = 100;
let leftMargin = 80;
let rightMargin = 30;

// Finding width and height of the canvas used for plotting not including legends

let innerWidth = svgWidth - leftMargin - rightMargin; // 690
let innerHeight = svgHeight - topMargin - bottommMargin; // 740

// Creating background bar charts properties

let barGap = 20;
let barWidth = 140;
let barHeight = innerHeight;



// CANVAS SETUP - copied from zip examples

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



// DATASET MANIPULATION

// Creating lable arrays 

let mcph_data = mcphases_data; // aggregated and transformed paython data from mcPHASES taken from (https://www.physionet.org/content/mcphases/1.0.0/)

let phases = ["Menstrual", "Follicular", "Fertility", "Luteal"]; // using set and sort wouldn't really make sense here because the phases follow a scrict order 
// for x-lablels

let stressLevels = ["Not at all", "Very Low", "Low", "Moderate", "High", "Very High"];
// for y-axis labelling


// Remapping mcph_data with numerical stress

let num_stress = mcph_data.map(function (value) {
    if (value.stress == "Not at all") {
        return 0
    }
    else if (value.stress == "Very Low/Little") {
        return 1
    }
    else if (value.stress == "Low") {
        return 2
    }
    else if (value.stress == "Moderate") {
        return 3
    }
    else if (value.stress == "High") {
        return 4
    }
    else if (value.stress == "Very High") {
        return 5
    }
});

let data = mcph_data.map(function (value, i) {
    return {
        id: value.id,
        phase: value.phase,
        stress: num_stress[i]
    }
});


// Grouping ids and phases by using reduce()

data = data.reduce(function (result, value) { // this is different from the way we used reduce() in class that's why I had to look it up
    // from what I have understoond this conditional addition allows to create a nested object where ids are objects with array phases
    if (!result[value.id]) {
        result[value.id] = {}; // creating empty id objects
    }
    if (!result[value.id][value.phase]) {
        result[value.id][value.phase] = []; // creating empty phase arrays
    }
    result[value.id][value.phase].push(value); // pushing the data into the empty structure
    return result;
}, {});


// Calculating average stress for every PHASE for separate IDs

let data_new = {}

for (let id in data) { // for every id value in data create an empty id object in data_new
    data_new[id] = {};
    for (let phase in data[id]) { // for every phase of data id object create entries - id and phases and stress averages
        let entries = data[id][phase];
        let stressAverage = d3.mean(entries, function (value) {
            return value.stress;
        })
        data_new[id][phase] = stressAverage // every phase of a separate id would have a calculated average stress
    }
} // has created a multi-nested object for separate ids


// TRANSFORMING DATA_NEW INTO PLOTTABLE DATA

let dataPlot = [];

for (let id in data_new) {
    for (let phase in data_new[id]) {

        dataPlot.push({ // found this method online the transformation to nested to having calculated averages to
            // then back to array is certainly convoluted they way I wrote it so I will have to find a way to make it easier.
            id: id,
            phase: phase,
            stress_average: data_new[id][phase]
        })
    }
}


// MINIMUM and MAXIMUM for AVERAGE STRESS VALUES

let minStress = d3.min(dataPlot, function (value) {
    return value.stress_average
})
let maxStress = d3.max(dataPlot, function (value) {
    return value.stress_average
})

// DATA SCALING

let xScale = d3.scalePoint()
    .domain(phases)
    .range([leftMargin + barGap + barWidth / 2, svgWidth - rightMargin - 30 - barGap - barWidth / 2])

let yScale = d3.scaleLinear()
    .domain([0, 5])
    .range([svgHeight - bottommMargin, topMargin]) // need to fix this damn 


let colorScale = d3.scaleOrdinal(d3.schemeTableau10) // .scaleOrdinal() for creating a color scale - uses a predefined set of 10 colors = d3.schemeTableau10
    .domain(dataPlot.map(function (value) {
        return value.id // remapping the array so that only ids are used to define the color
    }));


// BACKGROUND BAR CHARTS MAPPING

let barBlockRed = svg.append("rect")
    .attr("width", barWidth)
    .attr("height", barHeight)
    .attr("x", leftMargin + barGap)
    .attr("y", topMargin)
    .attr("fill", "#FF6666")


let barBlockOrange = svg.append("rect")
    .attr("width", barWidth)
    .attr("height", barHeight)
    .attr("x", leftMargin + barGap + barWidth + barGap)
    .attr("y", topMargin)
    .attr("fill", "#FF9966")


let barBlockBlue = svg.append("rect")
    .attr("width", barWidth)
    .attr("height", barHeight)
    .attr("x", leftMargin + barGap + barWidth + barGap + barWidth + barGap)
    .attr("y", topMargin)
    .attr("fill", "#0099FF")

let barBlockYellow = svg.append("rect")
    .attr("width", barWidth)
    .attr("height", barHeight)
    .attr("x", leftMargin + barGap + barWidth + barGap + barWidth + barGap + barWidth + barGap)
    .attr("y", topMargin)
    .attr("fill", "#FFFF99")



// PLOTTING THE SCATTERPLOT

let circles = svg.selectAll("circle")
    .data(dataPlot)
    .join("circle")
    .attr("class", function(value) {
        return "point id-" + value.id // grouping points and lines with an id number class
    })

    .attr("cx", function (value) {
        return xScale(value.phase)
    })
    .attr("cy", function (value) {
        return yScale(value.stress_average) //
    })
    .attr("r", 5)
    .attr("fill", function (value) {
        return colorScale(value.id)
    });


// PLOTTING DASHED LINES BETWEEN THE DOTS

let grouped = d3.group(dataPlot, function (value) { // grouping values by id 
    return value.id
})

let line = d3.line() 
    .x(function (value) {
        return xScale(value.phase); // x-values are phases
    })
    .y(function (value) {
        return yScale(value.stress_average) // y-values are average stress values
    })


let lines = svg.selectAll(".id-line") 
    .data(grouped)
    .join("path")
    .attr("class", function(value) {
        return "id-line id-" + value[0]
    })
    .attr("fill", "none")
    .attr("stroke", function(value){
        return colorScale(value[0])
    })
    .attr("stroke-width", 1.5)
    .attr("stroke-dasharray", "4 4") 
    .attr("d", function (value) {
        let values = value[1];

        values.sort(function(a, b) {
           return phases.indexOf(a.phase) - phases.indexOf(b.phase)});

        return line(values);
    });


// DRAWING AXIS LINES
svg.append("line")
    .attr("x1", leftMargin)
    .attr("y1", svgHeight - bottommMargin)
    .attr("x2", svgWidth - rightMargin)
    .attr("y2", svgHeight - bottommMargin)
    .attr("stroke", "black")

svg.append("line")
    .attr("x1", leftMargin)
    .attr("y1", svgHeight - bottommMargin)
    .attr("x2", leftMargin)
    .attr("y2", topMargin)
    .attr("stroke", "black")


// X AXIS VALUE 

let stressValues = [0, 1, 2, 3, 4, 5]

// let stressValues = dataPlot.map(function (value) {
//     return value.num_stress
// })



console.log(stressValues)

for (let i = 0; i < phases.length; i++) {
    svg.append("text")
        .classed("axis", true)
        .attr("x", xScale(phases[i]))
        .attr("y", svgHeight - bottommMargin)
        .style("text-anchor", "middle")
        .style("alignment-baseline", "before-edge")
        .style("font-size", "14px")
        .text(phases[i])
}

// Y AXIS VALUES 
for (let i = 0; i < stressValues.length; i++) {
    svg.append("text")
        .classed("axis", true)
        .attr("x", leftMargin - 5)
        .attr("y", yScale(stressValues[i]))
        .style("text-anchor", "end")
        .style("alignment-baseline", "middle")
        .style("font-size", "14px")
        .text(stressLevels[i])
}


/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("class", "axisLabel")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - bottommMargin / 2 + 5)
    .style("text-anchor", "middle")
    .text("Phases")
    .style("font-size", "20px");


let yAxisLabel = svg.append("text")
    .attr("class", "axisLabel")
    .attr("x", - svgHeight / 2)
    .attr("y", leftMargin / 2)
    .attr("text-anchor", "middle")
    .style("alignment-baseline", "middle")
    .text("Stress")
    .attr("transform", "rotate(-90)")
    .style("font-size", "20px");

// MAP LEGENDS

svg.append("text")
  .text("Participants")
  .attr("x", 120 + 100)
  .attr("y", 20 )
  .style("text-anchor", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px")
  .style("text-decoration", "underline")

svg.append("circle")
  .attr("r", 5)
  .attr("fill", "#E2575A")
  .attr("cx", 25 + 100)
  .attr("cy", 34)

svg.append("text")
  .text("ID 1")
  .attr("x", 35 + 100)
  .attr("y", 35)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("circle")
  .attr("r", 5)
  .attr("fill", "#76B7B2")
  .attr("cx", 25 + 100)
  .attr("cy", 54)

svg.append("text")
  .text("ID 2")
  .attr("x", 35 + 100)
  .attr("y", 55)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("circle")
  .attr("r", 5)
  .attr("fill", "#4F79A7")
  .attr("cx", 25 + 100)
  .attr("cy", 74)

svg.append("text")
  .text("ID 3")
  .attr("x", 35 + 100)
  .attr("y", 75)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("text")
  .text("etc.")
  .attr("x", 90 + 100)
  .attr("y", 55)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");



// HOVER INTERACTIVITY

circles.on("mouseover", function(event, value) {
    let currentId = value.id;

    d3.selectAll(".point")
      .style("opacity", 0.15);

    d3.selectAll(".id-line")
      .style("opacity", 0.15);

    d3.selectAll(".id-" + currentId)
      .style("opacity", 1)
      .attr("stroke-width", 3);

    d3.select(this)
      .attr("r", 8)
      .attr("stroke", "black")
      .attr("stroke-width", 2);
  })
  .on("mouseout", function(event, value) {
    d3.selectAll(".point")
      .style("opacity", 1);

    d3.selectAll(".id-line")
      .style("opacity", 1)
      .attr("stroke-width", 1.5);

    d3.selectAll(".point")
      .attr("r", 5)
      .attr("stroke", "none");
  });