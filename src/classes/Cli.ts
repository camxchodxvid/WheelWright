/**
 * Vehicle Management System - Command Line Interface
 * Handles user interaction for creating and managing various vehicle types
 */

import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Type definitions
type VehicleTypes = Car | Truck | Motorbike;
type Direction = 'left' | 'right';
type VehicleAction = 
  | 'Print details' 
  | 'Start vehicle' 
  | 'Accelerate 5 MPH'
  | 'Decelerate 5 MPH'
  | 'Stop vehicle'
  | 'Turn right'
  | 'Turn left'
  | 'Reverse'
  | 'Tow'
  | 'Wheelie'
  | 'Select or create another vehicle'
  | 'Exit';

export default class Cli {
  // Class properties
  private vehicles: VehicleTypes[];
  private selectedVehicleVin?: string;
  private exit: boolean;

  /**
   * Initialize the CLI system
   */
  constructor(vehicles: VehicleTypes[]) {
    this.vehicles = vehicles;
    this.exit = false;
  }

  /**
   * Generate a unique vehicle identification number
   */
  static generateVin(): string {
    const randomSegment = (): string => Math.random().toString(36).substring(2, 15);
    return randomSegment() + randomSegment();
  }

  /**
   * Launch the command interface
   */
  public startCli(): void {
    this.promptMainMenu();
  }

  /**
   * Display main menu options
   */
  private promptMainMenu(): void {
    const options = {
      type: 'list',
      name: 'CreateOrSelect',
      message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
      choices: ['Create a new vehicle', 'Select an existing vehicle']
    };

    inquirer.prompt([options]).then(response => {
      response.CreateOrSelect === 'Create a new vehicle'
        ? this.promptVehicleType()
        : this.promptSelectVehicle();
    });
  }

  /**
   * Show vehicle selection list
   */
  private promptSelectVehicle(): void {
    inquirer.prompt([{
      type: 'list',
      name: 'selectedVehicleVin',
      message: 'Select a vehicle to perform an action on',
      choices: this.vehicles.map(vehicle => ({
        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
        value: vehicle.vin
      }))
    }]).then(response => {
      this.selectedVehicleVin = response.selectedVehicleVin;
      this.promptActionMenu();
    });
  }

  /**
   * Display vehicle type selection
   */
  private promptVehicleType(): void {
    inquirer.prompt([{
      type: 'list',
      name: 'vehicleType',
      message: 'Select a vehicle type',
      choices: ['Car', 'Truck', 'Motorbike']
    }]).then(response => {
      const vehicleCreators = {
        'Car': this.promptCarCreation.bind(this),
        'Truck': this.promptTruckCreation.bind(this),
        'Motorbike': this.promptMotorbikeCreation.bind(this)
      };
      
      vehicleCreators[response.vehicleType as keyof typeof vehicleCreators]();
    });
  }

  /**
   * Collect car information
   */
  private promptCarCreation(): void {
    this.collectVehicleInfo([
      { name: 'color', message: 'Enter Color' },
      { name: 'make', message: 'Enter Make' },
      { name: 'model', message: 'Enter Model' },
      { name: 'year', message: 'Enter Year' },
      { name: 'weight', message: 'Enter Weight' },
      { name: 'topSpeed', message: 'Enter Top Speed' }
    ]).then(info => {
      const car = new Car(
        Cli.generateVin(),
        info.color,
        info.make,
        info.model,
        parseInt(info.year),
        parseInt(info.weight),
        parseInt(info.topSpeed),
        []
      );
      
      this.vehicles.push(car);
      this.selectedVehicleVin = car.vin;
      this.promptActionMenu();
    });
  }

  /**
   * Collect truck information
   */
  private promptTruckCreation(): void {
    this.collectVehicleInfo([
      { name: 'color', message: 'Enter Color' },
      { name: 'make', message: 'Enter Make' },
      { name: 'model', message: 'Enter Model' },
      { name: 'year', message: 'Enter Year' },
      { name: 'weight', message: 'Enter Weight' },
      { name: 'topSpeed', message: 'Enter Top Speed' },
      { name: 'towingCapacity', message: 'Enter Towing Capacity' }
    ]).then(info => {
      const truck = new Truck(
        Cli.generateVin(),
        info.color,
        info.make,
        info.model,
        parseInt(info.year),
        parseInt(info.weight),
        parseInt(info.topSpeed),
        [],
        parseInt(info.towingCapacity)
      );
      
      this.vehicles.push(truck);
      this.selectedVehicleVin = truck.vin;
      this.promptActionMenu();
    });
  }

  /**
   * Collect motorbike information
   */
  private promptMotorbikeCreation(): void {
    this.collectVehicleInfo([
      { name: 'color', message: 'Enter Color' },
      { name: 'make', message: 'Enter Make' },
      { name: 'model', message: 'Enter Model' },
      { name: 'year', message: 'Enter Year' },
      { name: 'weight', message: 'Enter Weight' },
      { name: 'topSpeed', message: 'Enter Top Speed' },
      { name: 'frontWheelDiameter', message: 'Enter Front Wheel Diameter' },
      { name: 'frontWheelBrand', message: 'Enter Front Wheel Brand' },
      { name: 'rearWheelDiameter', message: 'Enter Rear Wheel Diameter' },
      { name: 'rearWheelBrand', message: 'Enter Rear Wheel Brand' }
    ]).then(info => {
      const motorbike = new Motorbike(
        Cli.generateVin(),
        info.color,
        info.make,
        info.model,
        parseInt(info.year),
        parseInt(info.weight),
        parseInt(info.topSpeed),
        [
          new Wheel(parseInt(info.frontWheelDiameter), info.frontWheelBrand),
          new Wheel(parseInt(info.rearWheelDiameter), info.rearWheelBrand)
        ]
      );
      
      this.vehicles.push(motorbike);
      this.selectedVehicleVin = motorbike.vin;
      this.promptActionMenu();
    });
  }

  /**
   * Helper to collect common vehicle information
   */
  private collectVehicleInfo(fields: Array<{name: string, message: string}>): Promise<Record<string, string>> {
    const questions = fields.map(field => ({
      type: 'input',
      name: field.name,
      message: field.message
    }));
    
    return inquirer.prompt(questions);
  }

  /**
   * Display action selection menu
   */
  private promptActionMenu(): void {
    inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Select an action',
      choices: [
        'Print details',
        'Start vehicle',
        'Accelerate 5 MPH',
        'Decelerate 5 MPH',
        'Stop vehicle',
        'Turn right',
        'Turn left',
        'Reverse',
        'Tow',
        'Wheelie',
        'Select or create another vehicle',
        'Exit'
      ]
    }]).then(response => {
      this.handleSelectedAction(response.action as VehicleAction);
    });
  }

  /**
   * Process the selected action
   */
  private handleSelectedAction(action: VehicleAction): void {
    // Get the selected vehicle
    const selectedVehicle = this.findSelectedVehicle();
    
    if (!selectedVehicle && action !== 'Select or create another vehicle' && action !== 'Exit') {
      console.log('No vehicle selected.');
      this.promptActionMenu();
      return;
    }

    // Handle the action
    switch (action) {
      case 'Print details':
        selectedVehicle?.printDetails();
        break;
        
      case 'Start vehicle':
        selectedVehicle?.start();
        break;
        
      case 'Accelerate 5 MPH':
        selectedVehicle?.accelerate(5);
        break;
        
      case 'Decelerate 5 MPH':
        selectedVehicle?.decelerate(5);
        break;
        
      case 'Stop vehicle':
        selectedVehicle?.stop();
        break;
        
      case 'Turn right':
        selectedVehicle?.turn('right');
        break;
        
      case 'Turn left':
        selectedVehicle?.turn('left');
        break;
        
      case 'Reverse':
        selectedVehicle?.reverse();
        break;
        
      case 'Tow':
        if (selectedVehicle instanceof Truck) {
          this.promptVehicleToTow(selectedVehicle);
          return; // Early return to avoid recursive call
        } else {
          console.log('This can only be done with a truck');
        }
        break;
        
      case 'Wheelie':
        if (selectedVehicle instanceof Motorbike) {
          selectedVehicle.wheelie();
        } else {
          console.log('This can only be done with a Motorbike');
        }
        break;
        
      case 'Select or create another vehicle':
        this.promptMainMenu();
        return; // Early return to avoid recursive call
        
      case 'Exit':
        this.exit = true;
        return; // Exit the program
    }
    
    // Continue with actions unless we're exiting
    if (!this.exit) {
      this.promptActionMenu();
    }
  }

  /**
   * Find the vehicle with the selected VIN
   */
  private findSelectedVehicle(): VehicleTypes | undefined {
    return this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
  }

  /**
   * Display tow target selection menu
   */
  private promptVehicleToTow(truck: Truck): void {
    inquirer.prompt([{
      type: 'list',
      name: 'vehicleToTow',
      message: 'Select a vehicle to tow',
      choices: this.vehicles.map(vehicle => ({
        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
        value: vehicle
      }))
    }]).then(response => {
      const targetVehicle = response.vehicleToTow;
      
      if (targetVehicle.vin === truck.vin) {
        console.log('Truck cannot tow itself!');
      } else {
        truck.tow(targetVehicle);
      }
      
      this.promptActionMenu();
    });
  }
}