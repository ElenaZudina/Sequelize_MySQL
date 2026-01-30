// Import Sequelize and DataTypes for model definition and manipulation
const { Sequelize, DataTypes } = require('sequelize');

// Mock db/connection.js to return a Sequelize instance with an in-memory SQLite database
// This ensures that our tests are isolated and don't interact with a real MySQL database.
jest.mock('../../../db/connection.js', () => {
  // We import Sequelize here to ensure it's available within the mock factory function's scope
  const { Sequelize } = require('sequelize');
  const sequelizeInstance = new Sequelize('sqlite::memory:', {
    logging: false, // Disable logging to keep test output clean
  });
  return sequelizeInstance;
}, { virtual: true }); // Use virtual: true to allow mocking of modules that might not exist directly as a file

// Import the Cheese model after the connection mock is established,
// so it uses our mocked in-memory Sequelize instance.
const Cheese = require('../../../db/models/cheese');

// Describe block for the Cheese Model tests
describe('Cheese Model', () => {
  let sequelize; // This variable will hold our mocked Sequelize instance for consistent access

  // beforeAll hook: Runs once before all tests in this describe block
  beforeAll(async () => {
    // Get the mocked sequelize instance that db/connection.js now exports
    sequelize = require('../../../db/connection.js');
    // Sync the model with the in-memory database, forcing table recreation for a clean slate
    await sequelize.sync({ force: true });
  });

  // afterAll hook: Runs once after all tests in this describe block are finished
  afterAll(async () => {
    // Close the Sequelize connection to release resources
    await sequelize.close();
    // Restore all Jest mocks to their original implementations
    jest.restoreAllMocks();
  });

  // Test case: Verify that the Cheese model has the correct attributes defined
  test('should define the Cheese model with correct attributes', () => {
    // Check if each expected attribute exists in the model's raw attributes
    expect(Cheese.rawAttributes.name).toBeDefined();
    expect(Cheese.rawAttributes.origin).toBeDefined();
    expect(Cheese.rawAttributes.price).toBeDefined();
    expect(Cheese.rawAttributes.imageUrl).toBeDefined();
    expect(Cheese.rawAttributes.description).toBeDefined();
    expect(Cheese.rawAttributes.category).toBeDefined();

    // Verify the data type for each attribute
    expect(Cheese.rawAttributes.name.type instanceof DataTypes.STRING).toBe(true);
    expect(Cheese.rawAttributes.origin.type instanceof DataTypes.STRING).toBe(true);
    expect(Cheese.rawAttributes.price.type instanceof DataTypes.FLOAT).toBe(true);
    expect(Cheese.rawAttributes.imageUrl.type instanceof DataTypes.STRING).toBe(true);
    expect(Cheese.rawAttributes.description.type instanceof DataTypes.TEXT).toBe(true);
    expect(Cheese.rawAttributes.category.type instanceof DataTypes.TEXT).toBe(true);

    // Verify constraints: ensure 'allowNull' is false for all attributes
    expect(Cheese.rawAttributes.name.allowNull).toBe(false);
    expect(Cheese.rawAttributes.origin.allowNull).toBe(false);
    expect(Cheese.rawAttributes.price.allowNull).toBe(false);
    expect(Cheese.rawAttributes.imageUrl.allowNull).toBe(false);
    expect(Cheese.rawAttributes.description.allowNull).toBe(false);
    expect(Cheese.rawAttributes.category.allowNull).toBe(false);
  });

  // Test case: Verify that a new cheese entry can be created successfully
  test('should create a new cheese entry successfully', async () => {
    // Create a new cheese instance with valid data
    const newCheese = await Cheese.create({
      name: 'Test Cheese',
      origin: 'Testland',
      price: 10.99,
      imageUrl: '/images/test.jpg',
      description: 'A delicious test cheese.',
      category: 'soft'
    });
    // Assert that the created cheese has an ID (meaning it was saved to the DB)
    expect(newCheese.id).toBeDefined();
    // Assert that the name matches what was provided
    expect(newCheese.name).toBe('Test Cheese');
  });

  // Test case: Verify that a cheese cannot be created without a 'name' (due to allowNull: false)
  test('should not create a cheese without a name', async () => {
    // Expect the creation attempt to reject (throw an error)
    await expect(
      Cheese.create({
        origin: 'Testland',
        price: 10.99,
        imageUrl: '/images/test.jpg',
        description: 'A delicious test cheese.',
        category: 'soft'
      })
    ).rejects.toThrow(); // Sequelize will throw an error for missing non-nullable fields
  });

  // Add more tests for other 'allowNull: false' constraints (e.g., missing origin, price, etc.)
  test('should not create a cheese without an origin', async () => {
    await expect(
      Cheese.create({
        name: 'Test Cheese 2',
        price: 10.99,
        imageUrl: '/images/test2.jpg',
        description: 'Another test cheese.',
        category: 'hard'
      })
    ).rejects.toThrow();
  });

  test('should not create a cheese without a price', async () => {
    await expect(
      Cheese.create({
        name: 'Test Cheese 3',
        origin: 'Testland',
        imageUrl: '/images/test3.jpg',
        description: 'Third test cheese.',
        category: 'semi-hard'
      })
    ).rejects.toThrow();
  });

  test('should not create a cheese without an imageUrl', async () => {
    await expect(
      Cheese.create({
        name: 'Test Cheese 4',
        origin: 'Testland',
        price: 10.99,
        description: 'Fourth test cheese.',
        category: 'fresh'
      })
    ).rejects.toThrow();
  });

  test('should not create a cheese without a description', async () => {
    await expect(
      Cheese.create({
        name: 'Test Cheese 5',
        origin: 'Testland',
        price: 10.99,
        imageUrl: '/images/test5.jpg',
        category: 'fresh'
      })
    ).rejects.toThrow();
  });

  test('should not create a cheese without a category', async () => {
    await expect(
      Cheese.create({
        name: 'Test Cheese 6',
        origin: 'Testland',
        price: 10.99,
        imageUrl: '/images/test6.jpg',
        description: 'Sixth test cheese.'
      })
    ).rejects.toThrow();
  });
});
