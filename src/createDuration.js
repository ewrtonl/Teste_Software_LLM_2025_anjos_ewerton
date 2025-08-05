function isDuration(obj) {
  return obj && typeof obj === 'object' && '_milliseconds' in obj;
}

function isNumber(input) {
  return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
}

function normalizeObjectUnits(duration) {
  let ms = 0;
  if (duration.hours) ms += duration.hours * 3600000;
  if (duration.minutes) ms += duration.minutes * 60000;
  if (duration.seconds) ms += duration.seconds * 1000;
  return {
    ms,
    d: 0,
    M: 0
  };
}

class Duration {
  constructor({ ms = 0, d = 0, M = 0 }) {
    this._milliseconds = ms;
    this._days = d;
    this._months = M;
  }
}

function createDuration(input, key) {
  let duration = input;

  if (isDuration(input)) {
    duration = {
      ms: input._milliseconds,
      d: input._days,
      M: input._months,
    };
  } else if (isNumber(input) || !isNaN(+input)) {
    duration = {};
    if (key) {
      if (key === 'days') {
        duration.d = +input;
      } else {
        duration.ms = +input;
      }
    } else {
      duration.ms = +input;
    }
  } else if (typeof input === 'object' || !input) {
    duration = normalizeObjectUnits(duration);
  }

  return new Duration(duration);
}

module.exports = {
  createDuration,
  Duration
};
