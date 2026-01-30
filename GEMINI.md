# Project Overview

This project is a simple web application that displays a catalog of cheeses. It's built with Node.js, Express, and Sequelize on the backend, and uses plain HTML, CSS, and JavaScript on the frontend. The database is MySQL.

## File Descriptions

*   `server.js`: The main entry point of the application. It sets up the Express server, defines the API endpoints, and initializes the database.
*   `db/connection.js`: Configures the connection to the MySQL database using Sequelize.
*   `db/models/cheese.js`: Defines the `Cheese` model for the `cheeses` table in the database.
*   `public/index.html`: The main HTML file for the frontend.
*   `public/script.js`: The JavaScript file for the frontend. It fetches the cheese data from the API and displays it on the page.
*   `public/style.css`: The CSS file for the frontend.
*   `package.json`: Contains the project's dependencies and scripts.
*   `GEMINI.md`: This file, which provides an overview of the project.

## Building and Running

### Prerequisites

*   Node.js and npm
*   MySQL

### Installation

1.  Clone the repository.
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a MySQL database named `cheeses_shop_db`.
4.  Update the database credentials in `db/connection.js` if they are different from the defaults (user: `root`, password: '').

### Running the Application

*   To start the server:
    ```bash
    npm start
    ```
*   To start the server in development mode with auto-reloading:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3002`.

### Testing

*   To run the tests:
    ```bash
    npm test
    ```

## Development Conventions

*   The backend code is written in JavaScript.
*   The frontend code is in the `public` directory.
*   The database models are in the `db/models` directory.
*   The database connection is configured in `db/connection.js`.
*   The main server file is `server.js`.
*   Some comments and variable names are in Russian.

## TODO

*   [ ] Add more tests.
*   [ ] Add a way to add, edit, and delete cheeses.
*   [ ] Add user authentication.
