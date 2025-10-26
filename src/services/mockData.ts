// services/mockData.js
const mockDatabase = {
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ],
    posts: [
      { id: 1, title: "Hello World", content: "This is a mock post." },
      { id: 2, title: "Next.js Rocks", content: "Another mock post." },
    ],
  };
  
  /**
   * Simulate an API call using a promise and optional delay
   */
  export const useMockData = (endpoint, delay = 500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDatabase[endpoint]);
      }, delay);
    });
  };
  