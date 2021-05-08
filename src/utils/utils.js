import * as _ from "lodash";
import * as moment from "moment";
import CountryJSON from "../data/countries.json";

export const groupedResultsByDateProp = (results, prop) =>
  _.orderBy(results, (o) => new moment(o[prop]), ["desc"]);

export const groupedResultsByProp = (results, prop) =>
  _.orderBy(results, prop, ["desc"]);

export const groupedResultsByYear = (results) => {
  const fiteredResultByYear = [];
  let currentYear,
    currentArray = [];
  const orderedResult = groupedResultsByDateProp(results, "Patenting date");
  _.forEach(orderedResult, (result) => {
    let year = moment(result["Patenting date"], "MM/DD/YYYY").year();
    if (!currentYear) {
      currentYear = year;
      currentArray.push(result);
    } else if (currentYear !== year) {
      fiteredResultByYear.push({
        year: currentYear,
        patents: currentArray.length,
      });
      currentArray = [result];
      currentYear = year;
    } else {
      currentArray.push(result);
    }
  });
  fiteredResultByYear.push({
    year: currentYear,
    patents: currentArray.length,
  });
  return fiteredResultByYear;
};
export const groupedResultsByNoOfPatents = (results, prop) => {
  const fiteredResultByOwner = [];
  let currentOwner,
    currentArray = [];
  const orderedResult = groupedResultsByProp(results, prop);
  debugger;
  _.forEach(orderedResult, (result) => {
    let owner = prop === "Owner" ? result[prop] : result[prop].split("-")[0];
    let cccc = CountryJSON;
    if (!currentOwner) {
      currentOwner = owner;
      currentArray.push(result);
    } else if (currentOwner !== owner) {
      fiteredResultByOwner.push({
        owner: prop === "Owner" ? currentOwner : CountryJSON[currentOwner],
        patents: currentArray.length,
      });
      currentArray = [result];
      currentOwner = owner;
    } else {
      currentArray.push(result);
    }
  });
  fiteredResultByOwner.push({
    owner: prop === "Owner" ? currentOwner : CountryJSON[currentOwner],
    patents: currentArray.length,
  });
  return _.chain(fiteredResultByOwner)
    .orderBy((o) => o.patents, ["desc"])
    .take(10)
    .value();
};

export const groupAndAverageByScore = (results, prop) => {
  const fiteredResultByOwner = [];
  let currentOwner,
    currentArray = [];
  const orderedResult = groupedResultsByProp(results, prop);
  debugger;
  _.forEach(orderedResult, (result) => {
    let owner = result[prop];
    let cccc = CountryJSON;
    if (!currentOwner) {
      currentOwner = owner;
      currentArray.push(result);
    } else if (currentOwner !== owner) {
      fiteredResultByOwner.push({
        owner: currentOwner,
        averageTIS:
          currentArray.reduce(
            (acc, current) => acc + +current["Impact score"],
            0
          ) / currentArray.length,
        patents: currentArray.length,
      });
      currentArray = [result];
      currentOwner = owner;
    } else {
      currentArray.push(result);
    }
  });
  fiteredResultByOwner.push({
    owner: currentOwner,
    averageTIS:
      currentArray.reduce((acc, current) => acc + +current["Impact score"], 0) /
      currentArray.length,
    patents: currentArray.length,
  });
  debugger;
  return _.chain(fiteredResultByOwner)
    .orderBy((o) => o["averageTIS"], ["desc"])
    .filter((o) => o.patents > 20)
    .value();
};
