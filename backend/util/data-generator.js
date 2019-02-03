const fs = require('fs');
const csv = require('csvtojson');
const moment = require('moment');
moment.locale('de');

const toursPath = './csv/tours.csv';
const holidaysPath = './csv/holidays.csv';

convertTours().then();

convertHolidays().then();

async function convertTours() {
  const toursRaw = await csv().fromFile(toursPath);

  //fold days and time
  let tours = toursRaw.map(t => {
    const tour = {
      zip: t.zip,
      city: t.city,
      dates: [],
      publicHolidayCode: t.publicHolidayCode
    };
    for(const i of Array(3).keys()) {
      if (t['day_' + i] && t['time_' + i]) {
        tour.dates.push({
          isoDay: dayToIsoWeekDay(t['day_' + i]),
          time: t['time_' + i]
        });
      }
    }
    return tour;
  });

  writeJsonToFile(tours, 'tours');
}

async function convertHolidays() {
  let holidays = await csv().fromFile(holidaysPath);

  holidays = holidays.map(h => {
    h.date = moment(h.date, 'DD/mm/YYYY');
    return h;
  });

  writeJsonToFile(holidays, 'holidays');
}

function dayToIsoWeekDay(day) {
  switch(day) {
    case "Montag": return 1;
    case "Dienstag": return 2;
    case "Mittwoch": return 3;
    case "Donnerstag": return 4;
    case "Freitag": return 5;
    case "Samstag": return 6;
    case "Sonntag": return 7;
  }
}

function writeJsonToFile(json, fileName) {
  const dataPath = '../../src/assets/data';
  fs.writeFileSync(`${dataPath}/${fileName}.json`, JSON.stringify(json));
}
