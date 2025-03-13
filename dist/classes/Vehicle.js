/**
 * Base vehicle implementation that follows the Driveable interface
 * Provides core functionality for all vehicle types
 */

class Vehicle {
    /**
     * Initialize a new vehicle in stopped state
     */
    constructor() {
      this.state = {
        running: false,
        velocity: 0
      };
    }
  
    /**
     * Display current vehicle status information
     */
    printDetails() {
      const status = [
        `Vehicle status: ${this.state.running ? 'Running' : 'Off'}`,
        `Current velocity: ${this.state.velocity} mph`
      ];
      
      status.forEach(detail => console.log(detail));
    }
  
    /**
     * Engage vehicle engine
     */
    start() {
      this.state.running = true;
      console.log('Vehicle started');
    }
  
    /**
     * Increase vehicle speed by specified amount
     * @param {number} increment - Speed change in mph
     */
    accelerate(increment) {
      if (this._checkEngineStatus()) {
        this.state.velocity += increment;
        console.log(`Vehicle accelerated to ${this.state.velocity} mph`);
      }
    }
  
    /**
     * Decrease vehicle speed by specified amount
     * @param {number} decrement - Speed change in mph
     */
    decelerate(decrement) {
      if (this._checkEngineStatus()) {
        this.state.velocity -= decrement;
        console.log(`Vehicle decelerated to ${this.state.velocity} mph`);
      }
    }
  
    /**
     * Power down vehicle completely
     */
    stop() {
      this.state.velocity = 0;
      this.state.running = false;
      console.log('Vehicle stopped');
    }
  
    /**
     * Change vehicle direction
     * @param {string} direction - Direction to turn ('left' or 'right')
     */
    turn(direction) {
      if (this._checkEngineStatus()) {
        console.log(`Vehicle turned ${direction}`);
      }
    }
  
    /**
     * Engage reverse gear
     */
    reverse() {
      if (this._checkEngineStatus()) {
        console.log('Vehicle reversed');
      }
    }
  
    /**
     * Verify engine is running before operations
     * @private
     * @returns {boolean} Whether operation can proceed
     */
    _checkEngineStatus() {
      if (!this.state.running) {
        console.log('Start the vehicle first');
        return false;
      }
      return true;
    }
  }
  
  export default Vehicle;