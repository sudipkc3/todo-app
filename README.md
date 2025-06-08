# Todo App

This is a simple Todo application built using React Native and Expo. The app allows users to manage their tasks by adding, deleting, marking them as done, and searching through the list of tasks. The app uses `AsyncStorage` for local data persistence.

## Features

- Add new tasks to the todo list.
- Mark tasks as done or undone.
- Delete tasks from the list.
- Search tasks by title.
- Persistent storage using `AsyncStorage`.

## Prerequisites

Before running the app, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

## Installation

1. Clone the repository or download the source code.

   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the App

1. Start the Expo development server:

   ```bash
   npm start
   ```

2. Follow the instructions in the terminal to open the app:

   - Use the Expo Go app on your physical device (scan the QR code).
   - Use an Android emulator or iOS simulator.

### Running on Specific Platforms

- **Android**:

  ```bash
  npm run android
  ```

- **iOS**:

  ```bash
  npm run ios
  ```

- **Web**:

  ```bash
  npm run web
  ```

## Exporting the App

### Exporting to APK (Android)

1. Build the APK using Expo:

   ```bash
   npx expo build:android
   ```

2. Follow the instructions to download the APK file.

### Exporting to IPA (iOS)

1. Build the IPA using Expo:

   ```bash
   npx expo build:ios
   ```

2. Follow the instructions to download the IPA file.

## Project Structure

- `app/index.tsx`: Main entry point of the app.
- `assets/`: Contains images and fonts used in the app.
- `scripts/reset-project.js`: Script to reset the project.

## Learn More

To learn more about developing with Expo and React Native, check out the following resources:

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

## License

This project is licensed under the MIT License.
