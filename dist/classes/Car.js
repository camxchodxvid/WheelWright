// Importing required classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

/**
 * Car class that inherits from Vehicle
 */
class Car extends Vehicle {
  /**
   * Creates a new Car instance
   * @param {string} vin - Vehicle identification number
   * @param {string} color - Car color
   * @param {string} make - Car manufacturer
   * @param {string} model - Car model
   * @param {number} year - Manufacturing year
   * @param {number} weight - Car weight in pounds
   * @param {number} topSpeed - Maximum speed in mph
   * @param {Array<Wheel>} wheels - Array of Wheel objects
   */
  constructor(vin, color, make, model, year, weight, topSpeed, wheels) {
    // Initialize the parent class
    super();
    
    // Set car properties
    Object.assign(this, {
      vin,
      color,
      make,
      model,
      year,
      weight,
      topSpeed
    });
    
    // Ensure we have exactly 4 wheels
    this.wheels = Array.isArray(wheels) && wheels.length === 4
      ? wheels
      : Array(4).fill().map(() => new Wheel());
  }

  /**
   * Displays detailed information about the car
   * @override
   */
  printDetails() {
    // Print vehicle base details
    super.printDetails();
    
    // Print car-specific details
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    
    // Print wheel information
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`);
    });
  }
}

// Export the Car class
export default Car;