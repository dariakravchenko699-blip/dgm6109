"use strict"

/* Configuration variables: drawing */
let svgWidth = 800;
let svgHeight = 600;

let marginLeft = 80;
let marginRight = 40;
let marginTop = 120;
let marginBottom = 60;

let innerWidth = svgWidth - marginLeft - marginRight; // for color blocks corresponding to phases
let innerHeight = svgHeight - marginTop - marginBottom; // ??

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


// DATASET MANIPULATION AND CATEGORIZATION

let mcph_data = mcphases_data;


let stressMap = { "Not at all": 0, "Very Low/Little": 1, "Low": 2, "Moderate": 3, "High": 4, "Very High": 5 };
let phases = ["Menstrual", "Follicular", "Fertility", "Luteal"];

let stressLevels = ["Not at all", "Very Low/Little", "Low", "Moderate", "High", "Very High"];


// SIMPLIFIED DATASET WITH NUMERICAL STRESS

let data = mcph_data.map(function (value) {
  return {
    id: value.id,
    phase: value.phase,
    stress: stressMap[value.stress],
    sleep: value.minutesasleep}
})
.filter(function (value) {
    return value.id != null &&
           value.phase != null &&
           value.stress != null &&
           !isNaN(value.stress);
 });

// GROUPING IDs

data = data.reduce(function(total, currentValue) { // looked up this explanation online
  if (!total[currentValue.id]) {
    total[currentValue.id] = {}; // if total (like a whole array) doesnt have an object with this id yet, create n empty one
  }
  if (!total[currentValue.id][currentValue.phase]) { // if the current id object doesn't yet have a phase categorization array, create an empty one
    // 
    total[currentValue.id][currentValue.phase] = [];
  }
  total[currentValue.id][currentValue.phase].push(currentValue); // add all the values to existing properties
  return total; // return the new array
}, {});

// CALCULATING MEAN STRESS LEVELS FOR PHASES OF SEPERATE IDS
let data_new = {}; // empty object

for (let id in data) { // for every id value in data create an empty id object in data_new
  data_new[id] = {};
  for (let phase in data[id]) { // for every phase of data id object create entries - id and phases and stress averages
    let entries = data[id][phase];
    let stressAverage = d3.mean(entries, function (value) {
      return value.stress;  
    })
  data_new[id][phase] = stressAverage // every phase of a separate id would have a calculated average stress
}} // has created a multi-nested object for separate ids


// TRANSFORMING DATA_NEW INTO PLOTTABLE DATA

let dataPlot = [];

for (let id in data_new) {
  for (let phase in data_new[id]) {

    dataPlot.push({ // found this method online the transformation to nested to having calculated averages to
      // then back to array is certainly convoluted they way I wrote it so I will have to find a way to make it easier.
      id: id,
      phase: phase,
      stress: data_new[id][phase]
    })
  }
}


dataPlot = dataPlot.slice(0, 32) // working only on a chunk of data



// SCALES with ScalePoint() and ScaleLinear()

let xScale = d3.scalePoint()
  .domain(phases)
  .range([marginLeft + 40, svgWidth - marginRight - 10])


let yScale = d3.scaleLinear()
  .domain([0, 5])
  .range([innerHeight, 0]);

// let colorScale = d3.scaleOrdinal(d3.schemeTableau10)
//   .domain(dataPlot.map(function(value) {
//     return value.id
//   }));

// drawing the scatterplot


let circles = svg.selectAll("circle")
  .data(dataPlot)
  .join("circle")

  .attr("cx", function (value) {
    return  xScale(value.phase)
  })
  .attr("cy", function (value) {
    return marginTop + yScale(value.stress) //
  })
  .attr("r", 5)
  .attr("fill", function (value) {
  //   return colorScale(value.id);
  // })

    if (value.id == "1") {
      return "yellow"
    }
    else if (value.id == "2") {
      return "orange"
    }
    else if (value.id == "3") {
      return "blue"
    }
    else if (value.id == "4") {
      return "lightblue"
    }
    else if (value.id == "6") {
      return "green"
    }
    else if (value.id == "7") {
      return "red"
    }
    else if (value.id == "8") {
      return "grey"
    }
    else if (value.id == "9") {
      return "purple"
    }
  })


// X AXIS VALUE 

let level_reverse = [0,1,2,3,4,5]

for (let i = 0; i < phases.length; i++) {
  svg.append("text")
    .classed("axis", true)
    .attr("x", xScale(phases[i]))
    .attr("y", svgHeight - marginBottom)
    .style("text-anchor", "middle")
    .style("alignment-baseline", "before-edge")
    .style("font-size", "17px")
    .text(phases[i])
}

/* Y AXIS VALUES */
for (let i = 0; i < level_reverse.length; i++) {
  svg.append("text")
    .classed("axis", true)
    .attr("x", marginLeft - 5)
    .attr("y", yScale(level_reverse[i]) + 100)
    .style("text-anchor", "end")
    .style("alignment-baseline", "middle")
    .style("font-size", "14px")
    .text(level_reverse[i])
}

// DRAWING AXIS LINES
svg.append("line")
  .attr("x1", marginLeft)
  .attr("y1", svgHeight - marginBottom)
  .attr("x2", svgWidth - marginRight)
  .attr("y2", svgHeight - marginBottom)
  .attr("stroke", "black")

svg.append("line")
  .attr("x1", marginLeft)
  .attr("y1", svgHeight - marginBottom)
  .attr("x2", marginLeft)
  .attr("y2", marginTop)
  .attr("stroke", "black")




/**** label the axes ****/
let xAxisLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - marginBottom / 2 + 15)
  .style("text-anchor", "middle")
  .text("Phases")
  .style("font-size", "20px");


let yAxisLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("x", - svgHeight / 2)
  .attr("y", marginLeft / 2 )
  .attr("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .text("Stress")
  .attr("transform", "rotate(-90)")
  .style("font-size", "20px");

// // // MAP LEGENDS

svg.append("text")
  .text("Participants")
  .attr("x", 120 + 100)
  .attr("y", 20 )
  .style("text-anchor", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px")
  .style("text-decoration", "underline")

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "blue")
  .attr("x", 20 + 100)
  .attr("y", 30)

svg.append("text")
  .text("ID 1")
  .attr("x", 35 + 100)
  .attr("y", 35)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "orange")
  .attr("x", 20 + 100)
  .attr("y", 50)

svg.append("text")
  .text("ID 2")
  .attr("x", 35 + 100)
  .attr("y", 55)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "lightblue")
  .attr("x", 20 + 100)
  .attr("y", 70)

svg.append("text")
  .text("ID 3")
  .attr("x", 35 + 100)
  .attr("y", 75)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");


svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "yellow")
  .attr("x", 100 + 100)
  .attr("y", 35)

svg.append("text")
  .text("ID 4")
  .attr("x", 120 + 100)
  .attr("y", 40)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "green")
  .attr("x", 100 + 100)
  .attr("y", 50)

svg.append("text")
  .text("ID 5")
  .attr("x", 120 + 100)
  .attr("y", 55)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

// // LEGEND FOR the activity metric (circles)

// let lowKey = svg.append("circle")
//   .attr("fill", "grey")
//   .attr("cx", 280)
//   .attr("cy", 30 + rScale(maxActivity))
//   .attr("r", rScale(minActivity))

// let lowKeyLabel = svg.append("text")
//   .text(minActivity)
//   .attr("x", Number(lowKey.attr("cx")) + Number(lowKey.attr("r")) + 5)
//   .attr("y", 30 + rScale(maxActivity))
//   .style("alignment-baseline", "middle")
//   .style("font-family", "sans-serif")
//   .style("font-size", "13px")

// let highKey = svg.append("circle")
//   .attr("fill", "grey")
//   .attr("cx", Number(lowKeyLabel.attr("x")) + 25 + rScale(maxActivity) + 20)
//   .attr("cy", 30 + rScale(maxActivity))
//   .attr("r", rScale(maxActivity))

// let highKeyLabel = svg.append("text")
//   .text(maxActivity)
//   .attr("x", Number(highKey.attr("cx")) + Number(highKey.attr("r")) + 5)
//   .attr("y", 30 + rScale(maxActivity))
//   .style("alignment-baseline", "middle")
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "13px")

// svg.append("text")
//   .text("Activity in mins")
//   .attr("x", 350)
//   .attr("y", 20)
//   .style("font-family", "sans-serif")
//   .style("font-size", "13px")
//   .style("text-decoration", "underline")
//   .style("text-anchor", "middle")

