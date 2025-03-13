/**
 * Towing capability interface for vehicles
 * Defines requirements for any vehicle that can tow other vehicles
 */

// Import vehicle types
import Car from "../classes/Car.js";
import Motorbike from "../classes/Motorbike.js";
import Truck from "../classes/Truck.js";

// Define a type for towable vehicles
type TowableVehicle = Car | Motorbike | Truck;

/**
 * Interface that specifies towing capabilities
 * Must be implemented by any vehicle class that can tow other vehicles
 */
interface AbleToTow {
  /**
   * Maximum weight the vehicle can safely tow in pounds
   */
  readonly towingCapacity: number;
  
  /**
   * Execute towing operation on another vehicle
   * @param target - The vehicle to be towed
   */
  tow(target: TowableVehicle): void;
}

// Make interface available for implementation
export default AbleToTow;