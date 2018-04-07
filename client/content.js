import { Units } from './rom.js';

var debug = true;

debug && console.log(Units.getTypes());
debug && console.log(Units.getConversions('energy'));
debug && console.log(Units.getConversions('power'));

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
      convertfrom: '',
      convertto: '',
      valuefrom: '',
      valueto: ''
    }
  },

  methods:
  {
    conversions () {
        return Units.getConversions(this.converttype);
    },
    changeType () {
      debug && console.log("changeType", this.converttype);
      this.convertfrom = '';
      this.convertto = '';
      this.valuefrom = '';
      this.valueto = '';
    },
    fromValInput () {
      debug && console.log("fromInput", this.valuefrom);
      this.valueto = this.valuefrom;
    },
    toValInput () {
      debug && console.log("toInput", this.valueto);
      this.valuefrom = this.valueto;
    },
    changeFrom () {
      debug && console.log("changeFrom", this.convertfrom);
    },
    changeTo () {
      debug && console.log("changeTo", this.convertto);
    },
  }

};

export { mmContent };
