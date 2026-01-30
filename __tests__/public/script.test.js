// Describe block for the script.js tests
describe('script.js', () => {
  let cheeseListContainer; // Variable to hold the reference to the cheese list container

  // beforeEach hook: Runs before each test in this describe block
  beforeEach(() => {
    // Set up a basic DOM structure similar to public/index.html in the JSDOM environment
    document.body.innerHTML = `
      <main class="container mt-4">
        <h1 class="mb-4 text-center">Каталог сыров</h1>
        <div id="cheese-list" class="row gy-4"></div>
      </main>
    `;
    // Get a reference to the container where cheese cards will be rendered
    cheeseListContainer = document.getElementById('cheese-list');

    // Clear all Jest mocks before each test to ensure isolation
    jest.clearAllMocks();
  });

  // Helper function to mock the global fetch API
  const mockFetch = (data, success = true) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data), // Mock the .json() method of the response
        ok: success, // Simulate network success/failure
        status: success ? 200 : 500 // Simulate HTTP status
      })
    );
  };

  // Test case: Verify rendering of cheese cards when data is fetched successfully
  test('should render cheese cards when fetch is successful with data', async () => {
    // Define mock data for cheeses
    const mockCheeses = [
      { id: 1, name: 'Parmesan', origin: 'Italy', price: 25.99, imageUrl: '/images/parmesan.jpg', description: 'Hard Italian cheese.', category: 'hard' },
      { id: 2, name: 'Brie', origin: 'France', price: 19.50, imageUrl: '/images/brie.jpg', description: 'Soft white mold cheese.', category: 'soft' },
    ];
    // Set up the mock fetch to return our mock cheeses successfully
    mockFetch(mockCheeses);

    // Import and execute script.js. This will run its DOMContentLoaded listener.
    require('../../public/script.js');

    // Manually trigger DOMContentLoaded. This is often necessary in JSDOM environments.
    document.dispatchEvent(new Event('DOMContentLoaded'));

    // Wait for all asynchronous operations (like fetch and subsequent DOM updates) to complete
    await new Promise(process.nextTick); // Jest's microtasks queue clear is often sufficient

    // Assertions:
    expect(global.fetch).toHaveBeenCalledWith('/api/cheeses'); // Verify fetch was called with the correct URL
    expect(cheeseListContainer.children.length).toBe(2); // Check if two cheese cards were rendered
    expect(cheeseListContainer.innerHTML).toContain('Parmesan'); // Verify content of the first cheese
    expect(cheeseListContainer.innerHTML).toContain('Brie'); // Verify content of the second cheese
    expect(cheeseListContainer.innerHTML).not.toContain('Сыры не найдены.'); // Ensure empty message is not present
    expect(cheeseListContainer.innerHTML).not.toContain('Не удалось загрузить каталог.'); // Ensure error message is not present
  });

  // Test case: Verify display of "No cheeses found" message when fetch returns an empty array
  test('should display "Сыры не найдены." when fetch returns an empty array', async () => {
    // Set up mock fetch to return an empty array
    mockFetch([]);

    require('../../public/script.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(process.nextTick);

    // Assertions:
    expect(global.fetch).toHaveBeenCalledWith('/api/cheeses');
    expect(cheeseListContainer.children.length).toBe(1); // Expect one child (the paragraph with the message)
    expect(cheeseListContainer.innerHTML).toContain('Сыры не найдены.'); // Verify empty message is displayed
    expect(cheeseListContainer.innerHTML).not.toContain('Не удалось загрузить каталог.'); // Ensure error message is not present
  });

  // Test case: Verify display of an error message when fetch fails
  test('should display error message when fetch fails', async () => {
    // Set up mock fetch to simulate a network error (rejected promise)
    global.fetch = jest.fn(() => Promise.reject('API is down'));

    require('../../public/script.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    await new Promise(process.nextTick);

    // Assertions:
    expect(global.fetch).toHaveBeenCalledWith('/api/cheeses');
    expect(cheeseListContainer.children.length).toBe(1); // Expect one child (the paragraph with the error message)
    expect(cheeseListContainer.innerHTML).toContain('Не удалось загрузить каталог.'); // Verify error message is displayed
    expect(cheeseListContainer.innerHTML).not.toContain('Сыры не найдены.'); // Ensure empty message is not present
  });

  // You could add more specific tests here for the structure of each card,
  // checking individual elements like img src, card-title, etc.
});
