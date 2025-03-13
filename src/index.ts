// Import required classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";

// Define a type for the vehicles array
type Vehicle = Car | Truck | Motorbike;

// Create an array of vehicles with proper typing
const vehicles: Vehicle[] = [];

// Create a truck instance
const truck1 = new Truck(
  Cli.generateVin(),
  "red", 
  "Ford", 
  "F-150", 
  2021, 
  5000, 
  120, 
  [], // Will use default wheels
  10000
);

// Create a car instance
const car1 = new Car(
  Cli.generateVin(),
  'blue',
  'Toyota',
  'Camry',
  2021,
  3000,
  130,
  []
);

// Create custom wheels for the motorcycle
const motorbike1Wheels = [
  new Wheel(17, "Michelin"), 
  new Wheel(17, "Michelin")
];

// Create a motorbike instance
const motorbike1 = new Motorbike(
  Cli.generateVin(), 
  "black", 
  "Harley Davidson", 
  "Sportster", 
  2021, 
  500, 
  125, 
  motorbike1Wheels
);

// Add all vehicles to the array
vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorbike1);

// Initialize and start the CLI interface
const cli = new Cli(vehicles);
cli.startCli();