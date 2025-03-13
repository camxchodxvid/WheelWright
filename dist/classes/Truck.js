/**
 * Heavy-duty vehicle with towing capabilities
 */
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

/**
 * Represents a truck that can tow other vehicles
 * @extends Vehicle
 */
class Truck extends Vehicle {
  /**
   * Initialize a new truck
   */
  constructor(vin, color, make, model, year, weight, topSpeed, wheels, towingCapacity) {
    // Initialize base vehicle
    super();
    
    // Set truck-specific attributes
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;
    
    // Ensure truck has all four wheels
    this.wheels = this._validateWheels(wheels);
  }

  /**
   * Validate and create wheels if needed
   * @private
   */
  _validateWheels(wheels) {
    // Check if we have the correct number of wheels
    const hasValidWheels = Array.isArray(wheels) && wheels.length === 4;
    
    // Return existing wheels or create new set
    return hasValidWheels ? wheels : Array(4).fill().map(() => new Wheel());
  }

  /**
   * Attempt to tow another vehicle
   */
  tow(vehicle) {
    // Get vehicle description
    const vehicleName = this._getVehicleName(vehicle);
    
    // Check if we can tow it based on weight
    if (this._canTow(vehicle)) {
      console.log(`${vehicleName} is being towed.`);
    } else {
      console.log(`${vehicleName} is too heavy to be towed!`);
    }
  }
  
  /**
   * Get readable name for the vehicle
   * @private
   */
  _getVehicleName(vehicle) {
    return (vehicle.make && vehicle.model) 
      ? `${vehicle.make} ${vehicle.model}`
      : 'vehicle';
  }
  
  /**
   * Check if vehicle weight is within towing capacity
   * @private
   */
  _canTow(vehicle) {
    return vehicle.weight <= this.towingCapacity;
  }

  /**
   * Display all truck information
   * @override
   */
  printDetails() {
    // Print base vehicle info
    super.printDetails();
    
    // Print truck specs
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} MPH`);
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    
    // Print wheel information
    this._printWheelDetails();
  }
  
  /**
   * Format and display wheel information
   * @private
   */
  _printWheelDetails() {
    this.wheels.forEach((wheel, index) => {
      const position = index + 1;
      console.log(`Wheel ${position}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`);
    });
  }
}

export default Truck;