# Receptionist CRUD App

## Overview

This project is a React application designed for managing orders in a funeral service context. It provides a user-friendly interface for receptionists to create, read, update, and delete orders related to clients and deceased individuals.

## Project Structure

The project is organized into several directories and files, each serving a specific purpose:

- **src/assets**: Contains static assets such as images or icons used throughout the application.
- **src/components**: Contains reusable components, including:
  - `NotFound.jsx`: Displays a "Not Found" message for undefined routes.
  - `OrderList.jsx`: Displays a list of existing orders with options to edit or delete them.
- **src/hooks**: Contains custom hooks for managing state and side effects, such as:
  - `useClientData.jsx`: Manages client data fetching and state management.
- **src/layouts**: Contains layout components that structure the application, including:
  - `Navigation.jsx`: Renders the navigation bar.
  - `RootLayout.jsx`: Serves as the main layout for the application.
- **src/pages**: Contains page components for different functionalities, including:
  - `AddUser.jsx`: For adding a new user.
  - `Receptionist.jsx`: Manages new orders, including CRUD functionality for clients and deceased information.
  - Other pages for admin panel, dashboard, and user management.
- **src/services**: Contains service files for handling API calls, including:
  - `api.js`: General API functions.
  - `receptionistService.js`: Functions specifically for CRUD operations related to orders.
- **src/styles**: Contains global styles for the application.
- **src/main.jsx**: Entry point of the React application.
- **public**: Contains static assets like the Vite logo.

## Features

- **CRUD Functionality**: Receptionists can create, read, update, and delete orders.
- **Responsive Design**: The application is designed to be responsive and user-friendly.
- **Error Handling**: Proper error handling is implemented for API calls and form submissions.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd receptionist-crud-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.