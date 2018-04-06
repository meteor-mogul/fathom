import { Units } from './rom.js';

console.log(Units.getTypes());
console.log(Units.getConversions('energy'));
console.log(Units.getConversions('power'));

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
      valuefrom: 0,
      valueto: 0
    }
  },

  methods:
  {
    conversions () {
        return Units.getConversions(this.converttype);
    },
    unitto () {

    }
  }

};

export { mmContent };
