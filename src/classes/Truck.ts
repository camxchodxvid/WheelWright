/**
 * Heavy-duty vehicle with towing capabilities
 * Extends the base Vehicle class and implements AbleToTow interface
 */
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// Define types for towing operations
type TowableVehicle = Car | Motorbike | Truck;

/**
 * Represents a truck with towing functionality
 */
class Truck extends Vehicle implements AbleToTow {
  /**
   * Truck properties
   */
  readonly vin: string;
  readonly make: string;
  readonly model: string;
  readonly year: number;
  readonly color: string;
  readonly weight: number;
  readonly topSpeed: number;
  readonly towingCapacity: number;
  wheels: Wheel[];

  /**
   * Create a new truck instance
   */
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    // Initialize base vehicle
    super();
    
    // Set truck-specific properties
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;
    
    // Ensure truck has four wheels
    this.wheels = this.validateWheels(wheels);
  }

  /**
   * Ensure truck has exactly four wheels
   * @param suppliedWheels - Initial wheel set
   * @returns Valid set of four wheels
   */
  private validateWheels(suppliedWheels: Wheel[]): Wheel[] {
    if (suppliedWheels.length === 4) {
      return suppliedWheels;
    }
    
    // Create default wheel set if needed
    return Array(4).fill(null).map(() => new Wheel());
  }

  /**
   * Attempt to tow another vehicle
   * @param vehicle - Vehicle to be towed
   */
  tow(vehicle: TowableVehicle): void {
    const vehicleName = this.getVehicleDescription(vehicle);
    
    if (this.canTowVehicle(vehicle)) {
      console.log(`${vehicleName} is being towed.`);
    } else {
      console.log(`${vehicleName} is too heavy to be towed!`);
    }
  }
  
  /**
   * Get readable description of a vehicle
   * @param vehicle - Vehicle to describe
   * @returns Human-readable vehicle description
   */
  private getVehicleDescription(vehicle: TowableVehicle): string {
    return (vehicle.make && vehicle.model)
      ? `${vehicle.make} ${vehicle.model}`
      : 'vehicle';
  }
  
  /**
   * Check if vehicle can be towed based on weight
   * @param vehicle - Vehicle to evaluate
   * @returns Whether the truck can tow this vehicle
   */
  private canTowVehicle(vehicle: TowableVehicle): boolean {
    return vehicle.weight <= this.towingCapacity;
  }

  /**
   * Display comprehensive truck information
   * @override
   */
  override printDetails(): void {
    // Show base vehicle information
    super.printDetails();
    
    // Display truck-specific details
    const details = [
      [`VIN`, this.vin],
      [`Color`, this.color],
      [`Make`, this.make],
      [`Model`, this.model],
      [`Year`, this.year],
      [`Weight`, `${this.weight} lbs`],
      [`Top Speed`, `${this.topSpeed} MPH`],
      [`Towing Capacity`, `${this.towingCapacity} lbs`]
    ];
    
    // Print basic properties
    details.forEach(([property, value]) => {
      console.log(`${property}: ${value}`);
    });
    
    // Print wheel information
    this.printWheelDetails();
  }
  
  /**
   * Display information about truck wheels
   */
  private printWheelDetails(): void {
    this.wheels.forEach((wheel, index) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`
      );
    });
  }
}

export default Truck;