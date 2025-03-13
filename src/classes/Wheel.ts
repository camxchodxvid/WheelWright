/**
 * Vehicle wheel component with tire specifications
 * Provides diameter and brand information for vehicle wheels
 */

// Wheel configuration interface
interface WheelSpecs {
  readonly size: number;
  readonly brand: string;
}

/**
 * Represents a wheel component with tire information
 */
class Wheel {
  // Internal wheel data
  #specs: WheelSpecs;
  
  /**
   * Create a new wheel with specified dimensions and tire brand
   * @param size - Wheel diameter in inches (defaults to 18)
   * @param brand - Tire manufacturer name (defaults to "GoodYear")
   */
  constructor(size: number = 18, brand: string = "GoodYear") {
    this.#specs = {
      size,
      brand
    };
  }
  
  /**
   * Get the wheel's diameter measurement
   */
  get getDiameter(): number {
    return this.#specs.size;
  }
  
  /**
   * Get the tire manufacturer name
   */
  get getTireBrand(): string {
    return this.#specs.brand;
  }
}

export default Wheel;