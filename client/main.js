import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Units = {
  energy:
    { kwh:
      { value: "kwh",
        label: "Kilowatt hours (kWh)",
        ratio: 1},
      btu:
      { value: "btu",
        label: "British Thermal Units (BTU)",
        ratio: 3412.14},
      kj:
      { value: "kj",
        label: "Kilojoules (kJ)",
        ratio: 3600},
      J:
      { value: "J",
        label: "Joules (J)",
        ratio: 3600000}
    },
  power:
    { watts:
      { value: "watts",
        label: "Watts",
        ratio: 745.7 },
      horsepower:
      { value: "horsepower",
        label: "Horsepower",
        ratio: 1 }
    }
};

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.unitconverter.onCreated(function unitconverterOnCreated() {
  // unit type to convert starts false
  this.conversion = new ReactiveVar( false );
  this.convertfrom = new ReactiveVar( false );
  this.convertto = new ReactiveVar( false );
  this.valuefrom = new ReactiveVar( 0 );
  this.valueto = new ReactiveVar ( 0 );

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
    console.log("Change unittype", event.target);
    // set unit type
    instance.conversion.set(event.target.selectedOptions[0].value);
  },
  'change [name="unitfrom"]'(event, instance) {
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
    instance.valueto.set( parseFloat(instance.valuefrom.get()) * myRatio);
  },
  'input [name="quantityfrom"]'(event, instance) {
    console.log("Change quantityfrom", event.target);
    instance.valuefrom.set(event.target.value);
    const myUnitFrom = instance.convertfrom.get();
    const myUnitTo = instance.convertto.get();
    const myUnitsObj = Units[instance.conversion.get()];
    const myRatio = myUnitsObj[myUnitTo].ratio / myUnitsObj[myUnitFrom].ratio;
    instance.valueto.set( parseFloat(instance.valuefrom.get()) * myRatio);
  },
  'change [name="unitto"]'(event, instance) {
    console.log("Change unitto", event.target);
    const myUnitTo = event.target.value;
    instance.convertto.set(myUnitTo);
    const myUnitFrom = instance.convertfrom.get();
    const myUnitsObj = Units[instance.conversion.get()];
    const myRatio = myUnitsObj[myUnitFrom].ratio / myUnitsObj[myUnitTo].ratio;
    instance.valuefrom.set( parseFloat(instance.valueto.get()) * myRatio);
  },
  'input [name="quantityto"]'(event, instance) {
    console.log("Change quantityto", event.target);
    instance.valueto.set(event.target.value);
    const myUnitFrom = instance.convertfrom.get();
    const myUnitTo = instance.convertto.get();
    const myUnitsObj = Units[instance.conversion.get()];
    const myRatio = myUnitsObj[myUnitFrom].ratio / myUnitsObj[myUnitTo].ratio;
    instance.valuefrom.set(  parseFloat(instance.valueto.get()) * myRatio);
  },
});
