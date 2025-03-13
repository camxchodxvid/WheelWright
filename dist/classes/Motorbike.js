/**
 * Module for two-wheeled vehicle representation
 */
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

/**
 * Represents a motorcycle with two wheels
 * @extends Vehicle
 */
class Motorbike extends Vehicle {
  /**
   * Creates a new motorcycle instance
   * @param {string} vin - Vehicle identification number
   * @param {string} color - Motorcycle color
   * @param {string} make - Manufacturer
   * @param {string} model - Model name
   * @param {number} year - Production year
   * @param {number} weight - Weight in pounds
   * @param {number} topSpeed - Maximum speed in mph
   * @param {Array<Wheel>} wheels - Front and rear wheels
   */
  constructor(vin, color, make, model, year, weight, topSpeed, wheels) {
    // Initialize parent vehicle class
    super();
    
    // Store motorcycle properties
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    
    // Ensure we have exactly two wheels
    this.wheels = Array.isArray(wheels) && wheels.length === 2 
      ? wheels 
      : [new Wheel(), new Wheel()];
  }
  
  /**
   * Performs a wheelie stunt
   */
  wheelie() {
    const bikeInfo = `${this.make} ${this.model}`;
    console.log(`Motorbike ${bikeInfo} is doing a wheelie!`);
  }
  
  /**
   * Displays all motorcycle details
   * @override
   */
  printDetails() {
    // Print base vehicle information first
    super.printDetails();
    
    // Print motorcycle-specific information
    const details = [
      [`VIN`, this.vin],
      [`Color`, this.color],
      [`Make`, this.make],
      [`Model`, this.model],
      [`Year`, this.year],
      [`Weight`, `${this.weight} lbs`],
      [`Top Speed`, `${this.topSpeed} mph`],
      [`Front Wheel`, `${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`],
      [`Rear Wheel`, `${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`]
    ];
    
    // Log each detail on its own line
    details.forEach(([label, value]) => {
      console.log(`${label}: ${value}`);
    });
  }
}

export default Motorbike;