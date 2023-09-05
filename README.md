# How to run

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 2: Start Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: How to use
- To delete a post: swipe the list item to the left direction and push the delete button.
- To make a post favorite: tap the star icon on the details screen.
- To refresh the list of posts: tap the refresh icon on the navigation bar.
- To show only the favorite posts: push the filter icon on the navigation bar.

# About the solution

## Architecture overview
The application's architecture combines `Redux Toolkit` with the `Container-View pattern`, creating a powerful and maintainable foundation.

- Redux Toolkit to reduce boilerplates, to abstracts away the complexities of making API calls, handling caching, and maintaining a normalized store for your application's data
- Container-View pattern, also known as the "smart and dumb" or "container and presentation" pattern. This pattern enforces a clear separation of concerns between components, ensuring your application remains scalable and maintainable as it grows. 
  - The "screen" components are responsible for navigation and the interaction with Redux.
  - The "view" components are responsible for the visual representation.

## Third-party libraries
- [@react-navigation](https://reactnative.dev/docs/navigation) - A community solution for managing navigation
  - Provides a straightforward navigation solution, with the ability to present common stack navigation and tabbed navigation patterns on both Android and iOS.
- [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) - lets you inject your environment variables into your Javascript environment
    - Using a separate file makes it easier to configure your application for different environments (e.g., development, staging, production) without modifying the application code.
    - Keeping environment variables in a dedicated file centralizes their management. You can document them clearly and update them as needed without digging through code files.
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) 
    - A vast collection of icon sets.
    - You can customize the size, color, and style.
    - Vector icons are resolution-independent.
- [i18next](https://react.i18next.com/) - An internationalization framework for React and React Native.
- [React Native Elements](https://reactnativeelements.com/) - UI kit for creating apps in react native
    - Used `ListItem.Swipeable` and `Button` components for their great customization abilities

