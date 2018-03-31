import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Units =
{
  energy:
    {
      GWh:
      {
        value: "GWh",
        label: "Gigawatt hours (GWh)",
        ratio: 1
      },
      MWh:
      {
        value: "MWh",
        label: "Megawatt hours (MWh)",
        ratio: 1000
      },
      GJ:
      {
        value: "GJ",
        label: "Gigajoules (GJ)",
        ratio: 3600
      },
      thermEC:
      {
        value: "thermEC",
        label: "Therms (thermEC) EC",
        ratio: 34121.2822019601
      },
      thermUK:
      {
        value: "thermUK",
        label: "Therms (thermUK) UK",
        ratio: 34121.4163327839
      },
      therm:
      {
        value: "therm",
        label: "Therms (therm) US",
        ratio: 34129.5634070406
      },
      kWh:
      {
        value: "kWh",
        label: "Kilowatt hours (kWh)",
        ratio: 1000000
      },
      MJ:
      {
        value: "MJ",
        label: "megajoules (MJ)",
        ratio: 3600000
      },
      Wh:
      {
        value: "Wh",
        label: "Watt hours (Wh)",
        ratio: 1000000000
      },
      BTUiso:
      {
        value: "BTUiso",
        label: "British Thermal Units (BTU ISO) ISO",
        ratio: 3412128220.19601
      },
      BTUit:
      {
        value: "BTUit",
        label: "British Thermal Units (BTU IT) International Steam Table",
        ratio: 3412141479.89694
      },
      BTU:
      {
        value: "BTU",
        label: "British Thermal Units (BTU) 59F",
        ratio: 3412956340.70406
      },
      kJ:
      {
        value: "kJ",
        label: "Kilojoules (kJ)",
        ratio: 3600000000
      },
      Calth:
      {
        value: "Calth",
        label: "kilocalorie (Calth) thermochemical",
        ratio: 15062400000
      },
      CalIT:
      {
        value: "CalIT",
        label: "kilocalorie (CalIT) International Steam Table",
        ratio: 15072480000
      },
      footpound:
      {
        value: "footpound",
        label: "Foot-pound force (ft-lbf)",
        ratio: 2655223737398.16
      },
      J:
      {
        value: "J",
        label: "Joules (J)",
        ratio: 3600000000000
      },
      calth:
      {
        value: "calth",
        label: "gram calorie (calth) thermochemical",
        ratio: 15062400000000
      },
      calIT:
      {
        value: "calIT",
        label: "gram calorie (calIT) International Steam Table",
        ratio: 15072480000000
      },
      erg:
      {
        value: "erg",
        label: "erg",
        ratio: 3.6E+19
      },
      eV:
      {
        value: "eV",
        label: "Electronvolt",
        ratio: 2.24694E+31
      }

    },
  power:
  {
    GW:
    {
      value: "GW",
      label: "Gigawatts (GW)",
      ratio: 1
    },
    MW:
    {
      value: "MW",
      label: "Megawatts (MW)",
      ratio: 1000
    },
    hpS:
    {
      value: "hpS",
      label: "Boiler horsepower (hpS)",
      ratio: 101910.828025478
    },
    kW:
    {
      value: "kW",
      label: "Kilowatts (kW)",
      ratio: 1000000
    },
    hpe:
    {
      value: "hpe",
      label: "Electrical horsepower (hpE)",
      ratio: 1340482.57372654
    },
    hpi:
    {
      value: "hpi",
      label: "Mechanical horsepower (hpI)",
      ratio: 1341022.08959503
    },
    hpm:
    {
      value: "hpm",
      label: "Metric horsepower (hpM)",
      ratio:  1359621.6173039
    },
    ftlbs:
    {
      value: "ftlbs",
      label: "Foot-pound per second (lb-sf/s)",
      ratio: 737562149.277266
    },
    watts:
    {
      value: "watts",
      label: "Watts",
      ratio: 1000000000
    },
    btuh:
    {
      value: "btuh",
      label: "BTU per hour (btuh)",
      ratio: 3411464968.15287
    }
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
