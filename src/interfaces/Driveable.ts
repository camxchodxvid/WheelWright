/**
 * Defines standard operations for any driveable vehicle
 * This interface establishes the core functionality required for vehicle movement
 */

// Valid turning directions
type Direction = 'left' | 'right';

/**
 * Interface for vehicle movement capabilities
 * Must be implemented by any class representing a driveable vehicle
 */
interface Driveable {
  /**
   * Indicates whether the vehicle's engine is running
   */
  started: boolean;
  
  /**
   * Current velocity of the vehicle in miles per hour
   */
  currentSpeed: number;
  
  /**
   * Engage the vehicle's engine
   */
  start(): void;
  
  /**
   * Increase the vehicle's speed
   * @param increment - Amount to increase speed by in mph
   */
  accelerate(increment: number): void;
  
  /**
   * Decrease the vehicle's speed
   * @param decrement - Amount to decrease speed by in mph
   */
  decelerate(decrement: number): void;
  
  /**
   * Bring the vehicle to a complete stop and turn off engine
   */
  stop(): void;
  
  /**
   * Change the vehicle's direction
   * @param direction - Direction to turn the vehicle
   */
  turn(direction: Direction | string): void;
  
  /**
   * Put the vehicle in reverse gear
   */
  reverse(): void;
}

export default Driveable;