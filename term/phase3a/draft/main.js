"use strict"

/* Configuration variables: drawing */
let svgWidth = 800;
let svgHeight = 400;
let margin = 25;

let maxSubs = 9;
let maxSleep = 900;
let maxMeals = 3;

/* Resize  div to match width of visualization. */
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
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);

// let dataCollection = [{
//   day: "03.02", // date of the data collected
//   sleepDuration: 420, // in minutes
//   breathing: false, // shows whether I have performed 
//   // or not breathing exercise that day
//   flowState: 0, // shows how many minutes were engaged in a flow 
//   // state activity like animating/ singing etc.
//   mindfulness: 0, // time spent meditating/ journaling in minutes
//   mealNumber: 2, // meal number consumed per day
//   subs: 9, // stress levels where 0 is relaxed and 9 is extremely stressed
// }, {
//     day: "04.02",
//     sleepDuration: 560,
//     breathing: false,
//     flowState: 0,
//     mindfulness: 0,
//     mealNumber: 1,
//     subs: 8,
// }, {
//     day: "05.02",
//     sleepDuration: 420,
//     breathing: false,
//     flowState: 0,
//     mindfulness: 0,
//     mealNumber: 2,
//     subs: 6,
// }, {
//     day: "06.02",
//     sleepDuration: 420,
//     breathing: false,
//     flowState: 0,
//     mindfulness: 0,
//     mealNumber: 1,
//     subs: 8,
// }, {
//     day: "07.02",
//     sleepDuration: 560,
//     breathing: false,
//     flowState: 180,
//     mindfulness: 0,
//     mealNumber: 2,
//     subs: 7,
// }, {
//     day: "08.02",
//     sleepDuration: 600,
//     breathing: false,
//     flowState: 180,
//     mindfulness: 0,
//     mealNumber: 3,
//     subs: 6,
// }, {
//     day: "09.02",
//     sleepDuration: 600,
//     breathing: true,
//     flowState: 200,
//     mindfulness: 30,
//     mealNumber: 3,
//     subs: 7,
// }, {
//     day: "10.02",
//     sleepDuration: 560,
//     breathing: true,
//     flowState: 0,
//     mindfulness: 0,
//     mealNumber: 3,
//     subs: 5,
// }];

// I have chosen SleepDuration and SUBS (stress levels)
//  because I wanted to see first the correlation between well-being and basic self-care
let dataset = [{ sleepDuration: 560, subs: 8, meals: 2 }, { sleepDuration: 420, subs: 6, meals: 1 }, { sleepDuration: 420, subs: 8, meals: 2 }, { sleepDuration: 560, subs: 7, meals: 1 }, { sleepDuration: 600, subs: 6, meals: 2 }, { sleepDuration: 600, subs: 6, meals: 3 }, { sleepDuration: 600, subs: 7, meals: 3 }, { sleepDuration: 560, subs: 5, meals: 3 }, { sleepDuration: 560, subs: 4, meals: 3 }, { sleepDuration: 600, subs: 4, meals: 3 },];

let xScale = d3.scaleLinear()
    .domain([0, maxSleep])
    .range([margin, svgWidth - margin]); // because svgWidth = 800, svgWidth - margin (25) makes sense

let yScale = d3.scaleLinear() // function for containing data within the parameters
    .domain([0, maxSubs]) // the input of values
    .range([svgHeight - margin, margin]); // the output of shown values (where the values exist ?? why 200 ??

let rScale = d3.scaleLinear()
    .domain([0, maxMeals])
    .range([0, margin]) // the third parameter, 
    //====taken from one of the lab examples

let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles.attr("r", rScale)
    .attr("cx", function (value) {
        return xScale(value.sleepDuration); // we are using scaleLinear function to contain the values within the specific range
    })
    .attr("cy", function (value) {
        return yScale(value.subs);
    })
    .attr("r", function (value) {
        return rScale(value.meals) // radius and scale metric because parameter meals is numeric
    })

/**** label the axes ****/
let xAxisLabel = svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("Daily sleep (min)");

let yAxisLabel = svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Stress levels (0-9)")
    .attr("transform", "rotate(-90)");



/**** label key graph coordinates ****/
let originLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", svgHeight - (margin / 2))
    .attr("text-anchor", "middle")
    .text("0,0");

let yMaxLabel = svg.append("text")
    .attr("x", margin)
    .attr("y", yScale(maxSubs))
    .attr("text-anchor", "middles")
    .text(String(maxSubs));

let xMaxLabel = svg.append("text")
    .attr("x", xScale(maxSleep))
    .attr("y", svgHeight - (margin / 2)) // 
    .attr("text-anchor", "middle")
    .text(String(maxSleep));

let circleRadius = [1, 2, 3]

for (let a = 0; a < 3; a++) {
    svg.append("circle")
        .attr("r", rScale(circleRadius[a]))
        .attr("cx", margin + 30)
        .attr("cy", margin + 15 + a * 50); // the code from that two last additional exercises 
        // from a lab class, I used rScale function to make the same sized circles as in the graph


    svg.append("text")
        .attr("x", margin + 60)
        .attr("y", margin + 15 + a * 50)
        .attr("alignment-baseline", "middle")
        .text(a + "  Meals") // the same svg.append structure but for the text of the chart
}


    