import { Meteor, Vue } from './imports.js';
import { mmContent } from './content.js';

Meteor.startup(() => {
  // code to run on client at startup

  // Create the Vue instance
  var mmVue =
  new Vue({

      // Template id="mm-app-template"
      // See main.html
      // Could be defined in any .html file, but Meteor Mogul convention is
      // to pair template .html and component .js files, e.g.
      //  template definition in main.html
      //  component definition in main.js
      template:
      '#mm-app-template',

      // The following components are defined in a .html and .js pair of files
      // for template and component definitions respectively.
      components:
      {
        'mm-content': mmContent,     // client/ui/content
      },

    // Get fancy with the $mount API.
    // See https://vuejs.org/v2/api/#vm-mount
  }).$mount('#app');

});

/*
Template.unitconverter.onCreated(function unitconverterOnCreated() {
  // unit type to convert starts false
  this.conversion = new ReactiveVar( false );
  this.convertfrom = new ReactiveVar( false );
  this.convertto = new ReactiveVar( false );
  this.valuefrom = new ReactiveVar( "" );
  this.valueto = new ReactiveVar( "" );

  this.setValue = function (stringval, ratio) {
    const result = Math.round( parseFloat(stringval) * ratio * 100000000) / 100000000;
    if ( isNaN(result) ) {
      return "";
    } else {
      return result;
    }
  }

});

Template.unitconverter.helpers({
  unitslist() {
    const myConversion = Template.instance().conversion.get();
    console.log(myConversion);
    if (myConversion) {
      const myUnitsObj = Units[myConversion];
      let myUnits = [];
      for (var prop in myUnitsObj) {
        myUnits.push(myUnitsObj[prop]);
      }
      return myUnits;
    } else {
      return [];
    };
  },
  fromvalue() {
    return Template.instance().valuefrom.get();
  },
  tovalue() {
    return Template.instance().valueto.get();
  }
});

Template.unitconverter.events({
  'change [name="unittype"]'(event, instance) {
    // console.log("Document", document);
    console.log("Unit From value", document.getElementById("unitfrom").value);
    console.log("Unit To value", document.getElementById("unitto").value);
    console.log("Change unittype", event.target);
    console.log("Instance",instance);
    // set unit type
    instance.conversion.set(event.target.selectedOptions[0].value);
    if (instance.valuefrom.get() || instance.valueto.get()) {
      console.log("Value From", instance.valuefrom.get());
      console.log("Value To", instance.valueto.get());
      console.log("Conversion", instance.conversion.get());
      instance.valuefrom.set("");
      instance.valueto.set("");
      document.getElementById("unitfrom").value = "";
      document.getElementById("unitto").value = "";
    }
  },
  'change [id="unitfrom"]'(event, instance) {
    console.log("Change unitfrom", event.target);
    const myUnitFrom = event.target.value;
    instance.convertfrom.set(myUnitFrom);
    console.log("From", myUnitFrom);
    const myUnitTo = instance.convertto.get();
    console.log("To", myUnitTo);
    console.log("Conversion",instance.conversion.get());
    const myUnitsObj = Units[instance.conversion.get()];
    console.log("Units Object", myUnitsObj);
    console.log("Value From", instance.valuefrom.get());
    const myRatio = myUnitsObj[myUnitTo].ratio / myUnitsObj[myUnitFrom].ratio;
    console.log("Ratio", myRatio);
    instance.valueto.set( instance.setValue(instance.valuefrom.get(), myRatio) );
  },
  'input [id="quantityfrom"]'(event, instance) {
    console.log("Change quantityfrom", event.target);
    instance.valuefrom.set(event.target.value);
    const myUnitFrom = instance.convertfrom.get();
    const myUnitTo = instance.convertto.get();
    const myUnitsObj = Units[instance.conversion.get()];
    const myRatio = myUnitsObj[myUnitTo].ratio / myUnitsObj[myUnitFrom].ratio;
    instance.valueto.set( instance.setValue(instance.valuefrom.get(), myRatio) );
  },
  'change [id="unitto"]'(event, instance) {
    console.log("Change unitto", event.target);
    const myUnitTo = event.target.value;
    instance.convertto.set(myUnitTo);
    const myUnitFrom = instance.convertfrom.get();
    const myUnitsObj = Units[instance.conversion.get()];
    const myRatio = myUnitsObj[myUnitTo].ratio / myUnitsObj[myUnitFrom].ratio;
    instance.valueto.set( instance.setValue(instance.valuefrom.get(), myRatio) );
  },
  'input [id="quantityto"]'(event, instance) {
    console.log("Change quantityto", event.target);
    instance.valueto.set(event.target.value);
    const myUnitFrom = instance.convertfrom.get();
    const myUnitTo = instance.convertto.get();
    const myUnitsObj = Units[instance.conversion.get()];
    const myRatio = myUnitsObj[myUnitFrom].ratio / myUnitsObj[myUnitTo].ratio;
    instance.valuefrom.set( instance.setValue(instance.valueto.get(), myRatio) );
  },
});
*/

export { Vue, Units };
