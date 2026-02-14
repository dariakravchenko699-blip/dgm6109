"use strict"

let dataCollection = [{
  day: "03.02", // date of the data collected
  sleepDuration: 420, // in minutes
  breathing: false, // shows whether I have performed 
  // or not breathing exercise that day
  flowState: 0, // shows how many minutes were engaged in a flow 
  // state activity like animating/ singing etc.
  mindfulness: 0, // time spent meditating/ journaling in minutes
  mealNumber: 2, // meal number consumed per day
  subs: 9, // stress levels where 0 is relaxed and 9 is extremely stressed
}, {
    day: "04.02",
    sleepDuration: 560,
    breathing: false,
    flowState: 0,
    mindfulness: 0,
    mealNumber: 1,
    subs: 8,
}, {
    day: "05.02",
    sleepDuration: 420,
    breathing: false,
    flowState: 0,
    mindfulness: 0,
    mealNumber: 2,
    subs: 6,
}, {
    day: "06.02",
    sleepDuration: 420,
    breathing: false,
    flowState: 0,
    mindfulness: 0,
    mealNumber: 1,
    subs: 8,
}, {
    day: "07.02",
    sleepDuration: 560,
    breathing: false,
    flowState: 180,
    mindfulness: 0,
    mealNumber: 2,
    subs: 7,
}, {
    day: "08.02",
    sleepDuration: 600,
    breathing: false,
    flowState: 180,
    mindfulness: 0,
    mealNumber: 3,
    subs: 6,
}, {
    day: "09.02",
    sleepDuration: 600,
    breathing: true,
    flowState: 200,
    mindfulness: 30,
    mealNumber: 3,
    subs: 7,
}, {
    day: "10.02",
    sleepDuration: 560,
    breathing: true,
    flowState: 0,
    mindfulness: 0,
    mealNumber: 3,
    subs: 5,
}];

// console.log(JSON.stringify(dataCollection));
showData(dataCollection);
