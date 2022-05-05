## React Dashboard

This project is scaffolded using CRA and is built using TypeScript, React, Redux Toolkit and more. For better UX, React DnD is used to provide the drag and drop functionality whereas React Resizable is used to allow the user to resize the charts and customize the dashboard layout. The app will indicate all the feasible spots to drop or resize a chart.

## Features

Below are the basic features for the application:

- The user is presented with a pre-configured dashboard with different chart tiles prefilled with mock-up data.
- The user can drag and drop any chart tiles to any unoccupied slots
- The user can resize chart tiles to any unoccupied slots
- The user can drag charts of any sizes from the library and drop it to any feasible slots on the dashboard
- The user can drop any chart to the trash can and remove it from the dashboard


## Roadmap

- Add config persisting capability
- Polish the UI
- Fix responsiveness issue
- Add more customization options for the charts
- Add a server to store the configs at a database
- Add ability to read data from third party APIs

## Available Scripts

In the project directory, you can run:

### `npm install`
Install the necessary modules used by the project.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

