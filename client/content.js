import { Units } from './rom.js';

var debug = true;

debug && console.log(Units.getTypes());
debug && console.log(Units.getConversions('energy'));
debug && console.log(Units.getConversions('power'));

// Conversion factor is ratio to convert from one unit to another.
function getFactor(myState,myFrom,myTo) {
  const myType = myState.converttype;
  if (myType && myFrom && myTo) {
    debug && console.log("Ready to convert.");
    const myRatioFrom = Units.getRatio(myType,myFrom);
    const myRatioTo = Units.getRatio(myType,myTo);
    debug && console.log("Ratios:", myRatioFrom, myRatioTo);
    return (myRatioTo / myRatioFrom);
  }
  return null;
}

var mmContent =
{
  name:
  'mm-content',

  template:
  '#mm-content-template',

  data:
  function () {
    return {
      unittypes: Units.getTypes(),
      converttype: '',
      convertleft: '',
      convertright: '',
      valueleft: '',
      valueright: ''
    }
  },

  methods:
  {
    conversions () {
        return Units.getConversions(this.converttype);
    },
    changeType () {
      debug && console.log("changeType", this.converttype);
      this.convertleft = '';
      this.convertright = '';
      this.valueleft = '';
      this.valueright = '';
    },
    leftValInput () {
      debug && console.log("fromInput", this.valueleft);
      this.changeRight();
    },
    rightValInput () {
      debug && console.log("toInput", this.valueright);
      this.changeLeft();
    },
    changeRight () {
      debug && console.log("changeFrom", this.convertfrom);
      const myFrom = this.convertleft;
      const myTo = this.convertright;
      const myFactor = getFactor(this, myFrom, myTo);
      if (myFactor) {
        this.valueright = this.valueleft * myFactor;
        return;
      }
      debug && console.log("Not ready to convert.");
    },
    changeLeft () {
      debug && console.log("changeTo", this.convertright);
      const myFrom = this.convertright;
      const myTo = this.convertleft;
      const myFactor = getFactor(this, myFrom, myTo);
      if (myFactor) {
        this.valueleft = this.valueright * myFactor;
        return;
      }
      debug && console.log("Not ready to convert.");
    },
  }

};

export { mmContent };
