// Read Only Memory data

var debug = false;

/*
Units are organized by largest to smallest.
Ratio is factor to convert smaller units to largest.
Largest unit has ratio 1.
Smaller units are defined in terms of how many are in largest unit.
e.g., for energy,
 * GWh is largest unit.  ratio = 1
 * MWh is smaller than GWh.  1,000 MWh = 1 GWh, so ratio = 1000
 * GJ is smaller than MWh. 3,600 GJ = 1 GWh, so ratio = 3600
 * etc.
 * Electronvolt is smallest unit. 2.24694E+31 eV = 1 GWh.

{
  type:
  {
    unit:
    {
      value:
      label:
      ratio:
    }
  }
}
*/
const Units =
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
        label: "Megajoules (MJ)",
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

// For convenience
Units.getTypes =
function () {
  return ['energy','power'];
};

// Return list of conversions of a specific type
Units.getConversions =
function (unitType) {
  if (unitType) {
    debug && console.log("This:", this);
    debug && console.log("Type:", unitType);
    const myUnitsObj = this[unitType];
    debug && console.log("myUnitsObj:", myUnitsObj);
    let myUnits = [];
    for (var prop in myUnitsObj) {
      myUnits.push(myUnitsObj[prop]);
    }
    return myUnits;
  } else {
    return [];
  }
};

// Get ratio of a specific unit
Units.getRatio =
function (unitType,unitName) {
  if (unitType && unitName) {
    const myUnits = this[unitType];
    const myUnit = myUnits[unitName];
    return myUnit.ratio;
  } else {
    return null;
  }
}

export { Units };
