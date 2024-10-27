# Creating Custom hook -> For Random GIFs

- Love Babbar Advance class 4
- Installed the `Tailwind + axios`
  - In axios no need for Json conversion as done in the fetch function

# Notes: Theory

### What is custom hook?

- Utility function to perform some task

### What is the usage of `.env` file?

- In React, variables stored in .env must be prefixed with REACT*APP*. This requirement helps ensure that only variables you intend to expose are available in the client-side code. You can access these variables using process.env.
- In React, you don’t need to manually import the .env file. The Create React App (CRA) setup automatically loads variables from the .env file into process.env during the build or development process.
  - Hence, we can directly use `process.env.REACT_APP_YOUR_VARIABLE` in your code.

### Method used by the axios():

- get('url'): for getting the url
