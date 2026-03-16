"use strict"

/* Configuration variables: drawing */
let svgWidth = 800;
let svgHeight = 600;

let marginLeft = 80;
let marginRight = 25;
let marginTop = 100;
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
let mcph_data = [
  {
    "id": 1,
    "day_in_study": 4,
    "minutesasleep": 384,
    "inactivity": 905.0,
    "activity": 86.0,
    "phase": "Fertility",
    "estrogen": 322.1,
    "fatigue": "High",
    "stress": "Low"
  },
  {
    "id": 1,
    "day_in_study": 10,
    "minutesasleep": 602,
    "inactivity": 758.0,
    "activity": 61.0,
    "phase": "Luteal",
    "estrogen": 63.6,
    "fatigue": "Very Low/Little",
    "stress": "Moderate"
  },
  {
    "id": 1,
    "day_in_study": 11,
    "minutesasleep": 370,
    "inactivity": 894.0,
    "activity": 143.0,
    "phase": "Luteal",
    "estrogen": 82.6,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 12,
    "minutesasleep": 398,
    "inactivity": 914.0,
    "activity": 86.0,
    "phase": "Luteal",
    "estrogen": 137.6,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 32,
    "minutesasleep": 392,
    "inactivity": 1018.0,
    "activity": 206.0,
    "phase": "Fertility",
    "estrogen": 61.7,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 32,
    "minutesasleep": 213,
    "inactivity": 1018.0,
    "activity": 206.0,
    "phase": "Fertility",
    "estrogen": 61.7,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 38,
    "minutesasleep": 370,
    "inactivity": 750.0,
    "activity": 142.0,
    "phase": "Luteal",
    "estrogen": 94.8,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 38,
    "minutesasleep": 88,
    "inactivity": 750.0,
    "activity": 142.0,
    "phase": "Luteal",
    "estrogen": 94.8,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 38,
    "minutesasleep": 405,
    "inactivity": 750.0,
    "activity": 142.0,
    "phase": "Luteal",
    "estrogen": 94.8,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 51,
    "minutesasleep": 74,
    "inactivity": 1279.0,
    "activity": 84.0,
    "phase": "Luteal",
    "estrogen": 94.3,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 52,
    "minutesasleep": 256,
    "inactivity": 1381.0,
    "activity": 59.0,
    "phase": "Menstrual",
    "estrogen": 51.0,
    "fatigue": "Moderate",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 54,
    "minutesasleep": 307,
    "inactivity": 1312.0,
    "activity": 128.0,
    "phase": "Menstrual",
    "estrogen": 42.3,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 67,
    "minutesasleep": 182,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Luteal",
    "estrogen": 98.3,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 68,
    "minutesasleep": 461,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Luteal",
    "estrogen": 215.7,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 1,
    "day_in_study": 68,
    "minutesasleep": 419,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Luteal",
    "estrogen": 215.7,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 2,
    "day_in_study": 4,
    "minutesasleep": 70,
    "inactivity": 767.0,
    "activity": 200.0,
    "phase": "Fertility",
    "estrogen": 220.3,
    "fatigue": "High",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 4,
    "minutesasleep": 373,
    "inactivity": 767.0,
    "activity": 200.0,
    "phase": "Fertility",
    "estrogen": 220.3,
    "fatigue": "High",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 10,
    "minutesasleep": 485,
    "inactivity": 771.0,
    "activity": 189.0,
    "phase": "Luteal",
    "estrogen": 177.6,
    "fatigue": "High",
    "stress": "Moderate"
  },
  {
    "id": 2,
    "day_in_study": 10,
    "minutesasleep": 434,
    "inactivity": 771.0,
    "activity": 189.0,
    "phase": "Luteal",
    "estrogen": 177.6,
    "fatigue": "High",
    "stress": "Moderate"
  },
  {
    "id": 2,
    "day_in_study": 12,
    "minutesasleep": 463,
    "inactivity": 878.0,
    "activity": 79.0,
    "phase": "Luteal",
    "estrogen": 82.4,
    "fatigue": "Moderate",
    "stress": "Moderate"
  },
  {
    "id": 2,
    "day_in_study": 12,
    "minutesasleep": 433,
    "inactivity": 878.0,
    "activity": 79.0,
    "phase": "Luteal",
    "estrogen": 82.4,
    "fatigue": "Moderate",
    "stress": "Moderate"
  },
  {
    "id": 2,
    "day_in_study": 25,
    "minutesasleep": 473,
    "inactivity": 874.0,
    "activity": 48.0,
    "phase": "Follicular",
    "estrogen": 79.3,
    "fatigue": "High",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 31,
    "minutesasleep": 430,
    "inactivity": 781.0,
    "activity": 201.0,
    "phase": "Fertility",
    "estrogen": 68.1,
    "fatigue": "Moderate",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 32,
    "minutesasleep": 468,
    "inactivity": 828.0,
    "activity": 133.0,
    "phase": "Fertility",
    "estrogen": 140.2,
    "fatigue": "High",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 33,
    "minutesasleep": 455,
    "inactivity": 788.0,
    "activity": 155.0,
    "phase": "Fertility",
    "estrogen": 163.4,
    "fatigue": "Moderate",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 38,
    "minutesasleep": 488,
    "inactivity": 754.0,
    "activity": 171.0,
    "phase": "Luteal",
    "estrogen": 117.5,
    "fatigue": "Low",
    "stress": "Low"
  },
  {
    "id": 2,
    "day_in_study": 48,
    "minutesasleep": 344,
    "inactivity": 873.0,
    "activity": 75.0,
    "phase": "Luteal",
    "estrogen": 95.0,
    "fatigue": "Moderate",
    "stress": "Moderate"
  },
  {
    "id": 2,
    "day_in_study": 48,
    "minutesasleep": 441,
    "inactivity": 873.0,
    "activity": 75.0,
    "phase": "Luteal",
    "estrogen": 95.0,
    "fatigue": "Moderate",
    "stress": "Moderate"
  },
  {
    "id": 2,
    "day_in_study": 51,
    "minutesasleep": 196,
    "inactivity": 602.0,
    "activity": 70.0,
    "phase": "Menstrual",
    "estrogen": 79.0,
    "fatigue": "High",
    "stress": "Low"
  },
  {
    "id": 2,
    "day_in_study": 52,
    "minutesasleep": 460,
    "inactivity": 811.0,
    "activity": 116.0,
    "phase": "Menstrual",
    "estrogen": 95.5,
    "fatigue": "Moderate",
    "stress": "Moderate"
  },
  {
    "id": 2,
    "day_in_study": 67,
    "minutesasleep": 445,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Fertility",
    "estrogen": 303.1,
    "fatigue": "Low",
    "stress": "Low"
  },
  {
    "id": 2,
    "day_in_study": 67,
    "minutesasleep": 426,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Fertility",
    "estrogen": 303.1,
    "fatigue": "Low",
    "stress": "Low"
  },
  {
    "id": 2,
    "day_in_study": 70,
    "minutesasleep": 75,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Luteal",
    "estrogen": 99.3,
    "fatigue": "High",
    "stress": "Low"
  },
  {
    "id": 2,
    "day_in_study": 77,
    "minutesasleep": 479,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Luteal",
    "estrogen": 151.1,
    "fatigue": "High",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 77,
    "minutesasleep": 86,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Luteal",
    "estrogen": 151.1,
    "fatigue": "High",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 87,
    "minutesasleep": 394,
    "inactivity": 742.0,
    "activity": 219.0,
    "phase": "Follicular",
    "estrogen": 66.2,
    "fatigue": "High",
    "stress": "High"
  },
  {
    "id": 2,
    "day_in_study": 87,
    "minutesasleep": 429,
    "inactivity": 742.0,
    "activity": 219.0,
    "phase": "Follicular",
    "estrogen": 66.2,
    "fatigue": "High",
    "stress": "High"
  },
  {
    "id": 3,
    "day_in_study": 1,
    "minutesasleep": 452,
    "inactivity": 622.0,
    "activity": 286.0,
    "phase": "Luteal",
    "estrogen": 168.8,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 3,
    "day_in_study": 8,
    "minutesasleep": 416,
    "inactivity": 1192.0,
    "activity": 66.0,
    "phase": "Luteal",
    "estrogen": 213.8,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 8,
    "minutesasleep": 156,
    "inactivity": 1192.0,
    "activity": 66.0,
    "phase": "Luteal",
    "estrogen": 213.8,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 19,
    "minutesasleep": 161,
    "inactivity": 682.0,
    "activity": 163.0,
    "phase": "Follicular",
    "estrogen": 92.7,
    "fatigue": "High",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 19,
    "minutesasleep": 354,
    "inactivity": 682.0,
    "activity": 163.0,
    "phase": "Follicular",
    "estrogen": 92.7,
    "fatigue": "High",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 20,
    "minutesasleep": 418,
    "inactivity": 745.0,
    "activity": 200.0,
    "phase": "Follicular",
    "estrogen": 115.9,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 21,
    "minutesasleep": 475,
    "inactivity": 704.0,
    "activity": 178.0,
    "phase": "Follicular",
    "estrogen": 110.6,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 35,
    "minutesasleep": 73,
    "inactivity": 859.0,
    "activity": 161.0,
    "phase": "Luteal",
    "estrogen": 176.4,
    "fatigue": "High",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 35,
    "minutesasleep": 277,
    "inactivity": 859.0,
    "activity": 161.0,
    "phase": "Luteal",
    "estrogen": 176.4,
    "fatigue": "High",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 41,
    "minutesasleep": 366,
    "inactivity": 839.0,
    "activity": 152.0,
    "phase": "Luteal",
    "estrogen": 67.7,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 49,
    "minutesasleep": 437,
    "inactivity": 729.0,
    "activity": 107.0,
    "phase": "Menstrual",
    "estrogen": 117.4,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 58,
    "minutesasleep": 342,
    "inactivity": 145.0,
    "activity": 93.0,
    "phase": "Fertility",
    "estrogen": 112.0,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 58,
    "minutesasleep": 232,
    "inactivity": 145.0,
    "activity": 93.0,
    "phase": "Fertility",
    "estrogen": 112.0,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 71,
    "minutesasleep": 326,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Menstrual",
    "estrogen": 114.7,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 73,
    "minutesasleep": 405,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Menstrual",
    "estrogen": 58.6,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 74,
    "minutesasleep": 388,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Menstrual",
    "estrogen": 77.4,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 75,
    "minutesasleep": 279,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Menstrual",
    "estrogen": 42.3,
    "fatigue": "Very High",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 75,
    "minutesasleep": 183,
    "inactivity": 1440.0,
    "activity": 0.0,
    "phase": "Menstrual",
    "estrogen": 42.3,
    "fatigue": "Very High",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 78,
    "minutesasleep": 165,
    "inactivity": 806.0,
    "activity": 271.0,
    "phase": "Fertility",
    "estrogen": 180.1,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 78,
    "minutesasleep": 153,
    "inactivity": 806.0,
    "activity": 271.0,
    "phase": "Fertility",
    "estrogen": 180.1,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 82,
    "minutesasleep": 648,
    "inactivity": 671.0,
    "activity": 49.0,
    "phase": "Fertility",
    "estrogen": 102.6,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 84,
    "minutesasleep": 602,
    "inactivity": 684.0,
    "activity": 49.0,
    "phase": "Luteal",
    "estrogen": 120.3,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 3,
    "day_in_study": 89,
    "minutesasleep": 488,
    "inactivity": 740.0,
    "activity": 121.0,
    "phase": "Luteal",
    "estrogen": 40.9,
    "fatigue": "Not at all",
    "stress": "Not at all"
  },
  {
    "id": 4,
    "day_in_study": 2,
    "minutesasleep": 320,
    "inactivity": 864.0,
    "activity": 210.0,
    "phase": "Follicular",
    "estrogen": 63.1,
    "fatigue": "Low",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 3,
    "minutesasleep": 439,
    "inactivity": 789.0,
    "activity": 160.0,
    "phase": "Follicular",
    "estrogen": 190.0,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 5,
    "minutesasleep": 421,
    "inactivity": 775.0,
    "activity": 190.0,
    "phase": "Fertility",
    "estrogen": 78.0,
    "fatigue": "Moderate",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 23,
    "minutesasleep": 315,
    "inactivity": 905.0,
    "activity": 171.0,
    "phase": "Menstrual",
    "estrogen": 278.3,
    "fatigue": "High",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 26,
    "minutesasleep": 309,
    "inactivity": 694.0,
    "activity": 398.0,
    "phase": "Menstrual",
    "estrogen": 123.7,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 27,
    "minutesasleep": 373,
    "inactivity": 873.0,
    "activity": 162.0,
    "phase": "Menstrual",
    "estrogen": 111.5,
    "fatigue": "High",
    "stress": "Low"
  },
  {
    "id": 4,
    "day_in_study": 46,
    "minutesasleep": 521,
    "inactivity": 942.0,
    "activity": 246.0,
    "phase": "Luteal",
    "estrogen": 47.4,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 46,
    "minutesasleep": 156,
    "inactivity": 942.0,
    "activity": 246.0,
    "phase": "Luteal",
    "estrogen": 47.4,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 46,
    "minutesasleep": 80,
    "inactivity": 942.0,
    "activity": 246.0,
    "phase": "Luteal",
    "estrogen": 47.4,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 56,
    "minutesasleep": 402,
    "inactivity": 827.0,
    "activity": 152.0,
    "phase": "Luteal",
    "estrogen": 200.3,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 57,
    "minutesasleep": 449,
    "inactivity": 833.0,
    "activity": 102.0,
    "phase": "Menstrual",
    "estrogen": 66.7,
    "fatigue": "Moderate",
    "stress": "High"
  },
  {
    "id": 4,
    "day_in_study": 62,
    "minutesasleep": 206,
    "inactivity": 502.0,
    "activity": 17.0,
    "phase": "Menstrual",
    "estrogen": 149.1,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 62,
    "minutesasleep": 320,
    "inactivity": 502.0,
    "activity": 17.0,
    "phase": "Menstrual",
    "estrogen": 149.1,
    "fatigue": "Not at all",
    "stress": "Moderate"
  },
  {
    "id": 4,
    "day_in_study": 85,
    "minutesasleep": 399,
    "inactivity": 827.0,
    "activity": 172.0,
    "phase": "Menstrual",
    "estrogen": 77.2,
    "fatigue": "High",
    "stress": "Moderate"
  },
  {
    "id": 6,
    "day_in_study": 6,
    "minutesasleep": 311,
    "inactivity": 1004.0,
    "activity": 74.0,
    "phase": "Fertility",
    "estrogen": 114.4,
    "fatigue": "Low",
    "stress": "Moderate"
  },
  {
    "id": 6,
    "day_in_study": 16,
    "minutesasleep": 449,
    "inactivity": 1215.0,
    "activity": 155.0,
    "phase": "Luteal",
    "estrogen": 106.5,
    "fatigue": "Low",
    "stress": "Very Low/Little"
  },
  {
    "id": 6,
    "day_in_study": 17,
    "minutesasleep": 534,
    "inactivity": 787.0,
    "activity": 113.0,
    "phase": "Luteal",
    "estrogen": 70.5,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 6,
    "day_in_study": 18,
    "minutesasleep": 394,
    "inactivity": 743.0,
    "activity": 157.0,
    "phase": "Luteal",
    "estrogen": 81.6,
    "fatigue": "Low",
    "stress": "Very Low/Little"
  },
  {
    "id": 6,
    "day_in_study": 24,
    "minutesasleep": 415,
    "inactivity": 942.0,
    "activity": 18.0,
    "phase": "Menstrual",
    "estrogen": 43.5,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 6,
    "day_in_study": 30,
    "minutesasleep": 435,
    "inactivity": 912.0,
    "activity": 120.0,
    "phase": "Follicular",
    "estrogen": 84.2,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 6,
    "day_in_study": 30,
    "minutesasleep": 329,
    "inactivity": 912.0,
    "activity": 120.0,
    "phase": "Follicular",
    "estrogen": 84.2,
    "fatigue": "Very Low/Little",
    "stress": "Very Low/Little"
  },
  {
    "id": 6,
    "day_in_study": 36,
    "minutesasleep": 414,
    "inactivity": 877.0,
    "activity": 78.0,
    "phase": "Follicular",
    "estrogen": 122.2,
    "fatigue": "Very Low/Little",
    "stress": "Low"
  },
  {
    "id": 6,
    "day_in_study": 39,
    "minutesasleep": 385,
    "inactivity": 797.0,
    "activity": 163.0,
    "phase": "Follicular",
    "estrogen": 62.1,
    "fatigue": "Low",
    "stress": "Low"
  },
  {
    "id": 6,
    "day_in_study": 42,
    "minutesasleep": 419,
    "inactivity": 752.0,
    "activity": 181.0,
    "phase": "Fertility",
    "estrogen": 95.6,
    "fatigue": "Low",
    "stress": "Low"
  }]
let data = mcph_data

// SORTING MINUTESASLEEP FROM BIGGER TO SMALLER VALUES
data = data.sort(function (a, b) {
  if (a["minutesasleep"] > b["minutesasleep"]) {
    return -1
  }
  return 1
})

/* roughly estimating max values for array properties */

let maxSleep = 600;
let minSleep = 50;
let maxActivity = 200;
let maxFatigue = "High"
let maxRadius = 30


// drawing the scatterplot


let xScale = d3.scalePoint() // categorical parameter
  .domain(["Menstrual", "Follicular", "Fertility", "Luteal",])
  .range([marginLeft + maxRadius + 40, svgWidth - marginRight - maxRadius - 10]);

let yScale = d3.scalePoint() // categorical parameter
  .domain(["Not at all", "Very Low/Little", "Low", "Moderate", "High"])
  .range([svgHeight - marginBottom - maxRadius - 20, marginTop + maxRadius + 5]);

let rScale = d3.scaleLinear()
  .domain([0, maxSleep])
  .range([1, maxRadius])

let circles = svg.selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", function (value) {
    return xScale(value["phase"]); // we are using scaleLinear function to contain the values within the specific range
  })
  .attr("cy", function (value) {
    return yScale(value["stress"]);
  })
  .attr("r", function (value) {
    return rScale(value["minutesasleep"]) // radius and scale metric because parameter meals is numeric
  })
  .attr("fill", function (value) {
    if (value["fatigue"] == "Not at all") {
      return "lightblue"
    }
    else if (value["fatigue"] == "Very Low/Little") {
      return "blue"
    }
    else if (value["fatigue"] == "Low") {
      return "yellow"
    }
    else if (value["fatigue"] == "Moderate") {
      return "orange"
    }
    else {
      return "red"
    }
  })


// X AXIS VALUE 
let levels = ["Menstrual", "Follicular", "Fertility", "Luteal"] // x axis categories 
let level_reverse = ["Not at all", "Very Low/Little", "Low", "Moderate", "High"] // y axis categories from a class project example

for (let i = 0; i < levels.length; i++) {
  svg.append("text")
    .classed("axis", true)
    .attr("x", xScale(levels[i]))
    .attr("y", svgHeight - marginBottom + 20)
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
    .style("font-size", "17px")
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
  .attr("y", svgHeight - marginBottom / 4)
  .style("text-anchor", "middle")


let yAxisLabel = svg.append("text")
  .attr("class", "axisLabel")
  .attr("x", - svgHeight / 2)
  .attr("y", marginLeft / 2 - 15)
  .attr("text-anchor", "middle")
  .style("alignment-baseline", "middle")
  .text("Stress")
  .attr("transform", "rotate(-90)")
  .style("font-size", "25px");

// MAP LEGENDS

svg.append("text")
  .text("Fatigue")
  .attr("x", 120)
  .attr("y", 20)
  .style("text-anchor", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px")
  .style("text-decoration", "underline")

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "lightblue")
  .attr("x", 20)
  .attr("y", 30)

svg.append("text")
  .text("Not at all")
  .attr("x", 35)
  .attr("y", 35)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "blue")
  .attr("x", 20)
  .attr("y", 50)

svg.append("text")
  .text("Very low")
  .attr("x", 35)
  .attr("y", 55)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "yellow")
  .attr("x", 20)
  .attr("y", 70)

svg.append("text")
  .text("Low")
  .attr("x", 35)
  .attr("y", 75)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");


svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "orange")
  .attr("x", 100)
  .attr("y", 35)

svg.append("text")
  .text("Moderate")
  .attr("x", 120)
  .attr("y", 40)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("text")
  .text("High")
  .attr("x", 120)
  .attr("y", 55)
  .style("alignment-baseline", "middle")
  .style("font-family", "sans-serif")
  .style("font-size", "13px");

svg.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "red")
  .attr("x", 100)
  .attr("y", 50)

// LEGEND FOR the activity metric (circles)

let lowKey = svg.append("circle")
    .attr("fill", "grey")
    .attr("cx", 280)
    .attr("cy", 30 + rScale(maxSleep))
    .attr("r", rScale(minSleep))

let lowKeyLabel = svg.append("text")
    .text(minSleep)
    .attr("x", Number(lowKey.attr("cx")) + Number(lowKey.attr("r")) + 5)
    .attr("y", 30 + rScale(maxSleep))
    .style("alignment-baseline", "middle")
    .style("font-family", "sans-serif")
    .style("font-size", "13px")

let highKey = svg.append("circle")
    .attr("fill", "grey")
    .attr("cx", Number(lowKeyLabel.attr("x")) + 25 + rScale(maxSleep) + 20)
    .attr("cy", 30 + rScale(maxSleep))
    .attr("r", rScale(maxSleep))

let highKeyLabel = svg.append("text")
    .text(maxSleep)
    .attr("x", Number(highKey.attr("cx")) + Number(highKey.attr("r")) + 5)
    .attr("y", 30 + rScale(maxSleep))
    .style("alignment-baseline", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "13px")

svg.append("text")
    .text("Sleep in mins")
    .attr("x", 350)
    .attr("y", 20)
    .style("font-family", "sans-serif")
    .style("font-size", "13px")
    .style("text-decoration", "underline")
    .style("text-anchor", "middle")

