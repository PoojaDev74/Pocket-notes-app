// Read data from localStorage
export const getData = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Error reading from localStorage", err);
      return null;
    }
  };
  
  // Write data to localStorage
  export const setData = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error saving to localStorage", err);
    }
  };