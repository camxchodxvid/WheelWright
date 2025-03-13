/**
 * Vehicle Management CLI
 * Provides interface for creating and managing different vehicle types
 */
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

export default class Cli {
  /**
   * Initialize the CLI with a collection of vehicles
   */
  constructor(vehicles) {
    this.vehicles = vehicles;
    this.exit = false;
    this.selectedVehicleVin = null;
  }

  /**
   * Generate a random vehicle identification number
   */
  static generateVin() {
    const segment1 = Math.random().toString(36).substring(2, 15);
    const segment2 = Math.random().toString(36).substring(2, 15);
    return segment1 + segment2;
  }

  /**
   * Begin the command line interface
   */
  startCli() {
    const options = [
      {
        type: 'list',
        name: 'CreateOrSelect',
        message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
        choices: ['Create a new vehicle', 'Select an existing vehicle'],
      }
    ];

    inquirer.prompt(options).then(response => {
      response.CreateOrSelect === 'Create a new vehicle' 
        ? this.createVehicle() 
        : this.chooseVehicle();
    });
  }

  /**
   * Display vehicle selection menu
   */
  chooseVehicle() {
    const vehicleOptions = this.vehicles.map(vehicle => ({
      name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
      value: vehicle.vin,
    }));
    
    inquirer.prompt([
      {
        type: 'list',
        name: 'selectedVehicleVin',
        message: 'Select a vehicle to perform an action on',
        choices: vehicleOptions,
      }
    ]).then(response => {
      this.selectedVehicleVin = response.selectedVehicleVin;
      this.performActions();
    });
  }

  /**
   * Show vehicle type selection menu
   */
  createVehicle() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'vehicleType',
        message: 'Select a vehicle type',
        choices: ['Car', 'Truck', 'Motorbike'],
      }
    ]).then(response => {
      const vehicleCreators = {
        'Car': () => this.createCar(),
        'Truck': () => this.createTruck(),
        'Motorbike': () => this.createMotorbike()
      };
      
      vehicleCreators[response.vehicleType]();
    });
  }

  /**
   * Create a new car
   */
  createCar() {
    const questions = [
      { type: 'input', name: 'color', message: 'Enter Color' },
      { type: 'input', name: 'make', message: 'Enter Make' },
      { type: 'input', name: 'model', message: 'Enter Model' },
      { type: 'input', name: 'year', message: 'Enter Year' },
      { type: 'input', name: 'weight', message: 'Enter Weight' },
      { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' }
    ];

    inquirer.prompt(questions).then(answers => {
      const car = new Car(
        Cli.generateVin(), 
        answers.color, 
        answers.make, 
        answers.model, 
        parseInt(answers.year), 
        parseInt(answers.weight), 
        parseInt(answers.topSpeed), 
        []
      );
      
      this.vehicles.push(car);
      this.selectedVehicleVin = car.vin;
      this.performActions();
    });
  }

  /**
   * Create a new truck
   */
  createTruck() {
    const questions = [
      { type: 'input', name: 'color', message: 'Enter Color' },
      { type: 'input', name: 'make', message: 'Enter Make' },
      { type: 'input', name: 'model', message: 'Enter Model' },
      { type: 'input', name: 'year', message: 'Enter Year' },
      { type: 'input', name: 'weight', message: 'Enter Weight' },
      { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
      { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' }
    ];

    inquirer.prompt(questions).then(answers => {
      const truck = new Truck(
        Cli.generateVin(), 
        answers.color, 
        answers.make, 
        answers.model, 
        parseInt(answers.year), 
        parseInt(answers.weight), 
        parseInt(answers.topSpeed), 
        [], 
        parseInt(answers.towingCapacity)
      );
      
      this.vehicles.push(truck);
      this.selectedVehicleVin = truck.vin;
      this.performActions();
    });
  }

  /**
   * Create a new motorbike
   */
  createMotorbike() {
    const questions = [
      { type: 'input', name: 'color', message: 'Enter Color' },
      { type: 'input', name: 'make', message: 'Enter Make' },
      { type: 'input', name: 'model', message: 'Enter Model' },
      { type: 'input', name: 'year', message: 'Enter Year' },
      { type: 'input', name: 'weight', message: 'Enter Weight' },
      { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
      { type: 'input', name: 'frontWheelDiameter', message: 'Enter Front Wheel Diameter' },
      { type: 'input', name: 'frontWheelBrand', message: 'Enter Front Wheel Brand' },
      { type: 'input', name: 'rearWheelDiameter', message: 'Enter Rear Wheel Diameter' },
      { type: 'input', name: 'rearWheelBrand', message: 'Enter Rear Wheel Brand' }
    ];

    inquirer.prompt(questions).then(answers => {
      const wheels = [
        new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
        new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)
      ];
      
      const motorbike = new Motorbike(
        Cli.generateVin(), 
        answers.color, 
        answers.make, 
        answers.model, 
        parseInt(answers.year), 
        parseInt(answers.weight), 
        parseInt(answers.topSpeed), 
        wheels
      );
      
      this.vehicles.push(motorbike);
      this.selectedVehicleVin = motorbike.vin;
      this.performActions();
    });
  }

  /**
   * Select a vehicle for towing
   */
  findVehicleToTow(truck) {
    const vehicleOptions = this.vehicles.map(vehicle => ({
      name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
      value: vehicle,
    }));
    
    inquirer.prompt([
      {
        type: 'list',
        name: 'vehicleToTow',
        message: 'Select a vehicle to tow',
        choices: vehicleOptions,
      }
    ]).then(response => {
      if (response.vehicleToTow.vin === truck.vin) {
        console.log('Truck cannot tow itself!');
      } else {
        truck.tow(response.vehicleToTow);
      }
      this.performActions();
    });
  }

  /**
   * Menu for vehicle actions
   */
  performActions() {
    const actionOptions = [
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
    ];
    
    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action',
        choices: actionOptions,
      }
    ]).then(response => {
      // Find the selected vehicle
      const selectedVehicle = this.getSelectedVehicle();
      
      // Handle the action
      if (this.handleAction(response.action, selectedVehicle)) {
        return; // Action handled separately (async flow)
      }
      
      // Continue or exit
      if (!this.exit) {
        this.performActions();
      }
    });
  }
  
  /**
   * Handle the selected action
   * @returns {boolean} true if handled separately (async)
   */
  handleAction(action, vehicle) {
    const actionMap = {
      'Print details': () => vehicle && vehicle.printDetails(),
      'Start vehicle': () => vehicle && vehicle.start(),
      'Accelerate 5 MPH': () => vehicle && vehicle.accelerate(5),
      'Decelerate 5 MPH': () => vehicle && vehicle.decelerate(5),
      'Stop vehicle': () => vehicle && vehicle.stop(),
      'Turn right': () => vehicle && vehicle.turn('right'),
      'Turn left': () => vehicle && vehicle.turn('left'),
      'Reverse': () => vehicle && vehicle.reverse(),
      
      'Tow': () => {
        if (vehicle instanceof Truck) {
          this.findVehicleToTow(vehicle);
          return true; // Handled separately
        } else {
          console.log('This can only be done with a truck');
        }
      },
      
      'Wheelie': () => {
        if (vehicle instanceof Motorbike) {
          vehicle.wheelie();
        } else {
          console.log('This can only be done with a Motorbike');
        }
      },
      
      'Select or create another vehicle': () => {
        this.startCli();
        return true; // Handled separately
      },
      
      'Exit': () => this.exit = true
    };
    
    // Execute the action
    return actionMap[action] ? actionMap[action]() : false;
  }
  
  /**
   * Helper to find the currently selected vehicle
   */
  getSelectedVehicle() {
    return this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
  }
}