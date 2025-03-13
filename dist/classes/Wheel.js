/**
 * Represents a vehicle wheel component with tire information
 * Used by various vehicle types to manage wheel specifications
 */

class Wheel {
    /**
     * Create a new wheel with specified dimensions and tire brand
     * @param {number} size - Wheel diameter in inches
     * @param {string} brand - Tire manufacturer name
     */
    constructor(size = 18, brand = "GoodYear") {
      // Store wheel properties
      this._specifications = {
        size: size,
        brand: brand
      };
    }
    
    /**
     * Retrieve the wheel's diameter measurement
     * @return {number} Diameter in inches
     */
    get getDiameter() {
      return this._specifications.size;
    }
    
    /**
     * Retrieve the tire manufacturer
     * @return {string} Brand name
     */
    get getTireBrand() {
      return this._specifications.brand;
    }
  }
  
  // Make wheel component available for import
  export default Wheel;