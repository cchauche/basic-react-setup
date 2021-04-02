const example2 = require('./example2');
console.log(example2)
// Using ES6 class syntax
class Alarm {
  constructor(time, event) {
    this.event = event;
    this.time = time;
  }
  ring() {
    let {event, time} = this; // Using ES6 object destructuring
    console.log(`Wake up! It's ${time}. Time for ${event}!`)
  }
}

let alarm = new Alarm('1:00pm', 'Basketball');
alarm.ring();
