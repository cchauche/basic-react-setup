# Create React App From Scratch
> This repo was designed for use in a demo for students about how to initialize a React app from scratch

## Initialize Project with NPM

- Start by creating a new folder for this project.  We can call it `reactFromScratch`
- Using the terminal navigate to the folder we just created and execute the following command:
  ```
  npm init
  ```
- This command will initialize a new package for you. Answer the questions you are asked as you go and it will set up a new `package.json` file for you
- You can now use npm to install dependencies as you usually would

## Create Folder structure

- Add two folders one called `client` and another folder called `public`
> The specific names are not keywords so you can use different names if you choose.  You will just have to modify code later if you work through this repo.
- Inside the `client` folder make a new file called `example.js` and paste the following content in to the file
  ``` javascript
  const example2 = require('./example2');
  console.log(example2)
  // Using ES6 class syntax
  class Alarm {
    constructor(time, event) {
      this.event = event;
      this.time = time;
    }
    ring() {
      let {event, time} = this; // Using ES6 object destructuring
      console.log(`Wake up! It's ${time}. Time for ${event}!`)
    }
  }
  let alarm = new Alarm('1:00pm', 'Basketball');
  alarm.ring();
  ```
- Next make a file called `example2.js` in the `client` folder and paste in the following code:
  ```javascript
  module.exports = 'This is from another file'
  ```
- Notice that we are using ES6 syntax in `example.js` and also we are requiring a second javascript file called `example2.js`

## Install Webpack and Build bundle.js

### What is Webpack?
- Websites are not built in plain HTML for the most part, they often involve lots of javascript and in the case of React are basically written completely in javascript
- Webpack is a module bundler which is going to package your code so its ready for the browser
- It has much more depth than that but for our purposes its enough to say that webpack packs your files up for the browser

### Add Webpack to our project
- To use webpack at minimum we need to install two npm packages:
  - `webpack` which does all the magic
  - `webpack-cli` which gives use a command line interface to interact with webpack.
- Lets install both packages as development dependencies use the command
  ```
  npm install webpack webpack-cli --save-dev
  ```
  > Since we only need webpack for development purposes we save it as a dev-dependency, this is not critical but a good practice to aim for.  You can easily change this after the fact so don't stress about it
- We need to provide webpack with some configurations so that it knows what to do with our files, we will write those instructions in a new file called `webpack.config.js` in the root directory of the repo.  Paste the following code in to that file
  ```javascript
  const path = require('path');

  module.exports = {
    entry: path.resolve(__dirname, 'client/example.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
  };
  ```
- Lets add a build script to `package.json` so we can easily run webpack. Look for `"scripts"` parameter and change it to look like this:
  ```json
  "scripts": {
    "build": "webpack --mode none"
  }
  ```
- Now lets run the build script and see what happens
  ```
  npm run build
  ```
- Notice that webpack has created a new file where we told it to called `bundle.js` and if you look inside that file you should see that it contains the content of both of our example files.  Webpack has bundled `example.js` and all of it's dependencies (other javascript files that are imported in `example.js`) in to one single file.

- Next we will look at how we can extend the capabilities of webpack by using a loader, in this case we will be using teh Babel loader.

## Use Babel with Webpack

### What is Babel?
- Babel is a transpiler. It is going to take your code and apply some kind of conversion to it then output the result. It can be configured in many ways but mostly when we are dealing with it we are using it to transpile jsx for React in to javascript as well as using it to convert our ECMAScript2015+(ES6) code to equivalent ES5 code that all browsers can understand.

### Installing Babel

- For using Babel with javascript and React you will need to install the following packages using npm:
  - `babel-loader` - This connects Babel and Webpack
  - `@babel/core` - Transpile ES2015+ (ES6) to backwards compatible JavaScript
  - `@babel/preset-env` - Provides smart default presets for converting your ES6 to ES5
  - `@babel/preset-react` - Provides default presets for processing React code
  ```
  npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
  ```
  > Again we are saving these as development dependencies

### Configuring Webpack and Babel

- Edit `webpack.config.js` by adding the following code to the exports object
  ```javascript
  module.exports = {
    ...
    // Add the code from here...
    module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //regex to test for .js or .jsx file endings
        exclude: /node_modules/, //regex that specifies node_modules folder
        use: {
          //Loader to use on files specified by 'test' above
          loader: 'babel-loader',
          // Additional options specific to the loader
          options: { 
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
  // to here
    ...
  }
  ```
  > Here we are instructing webpack to use Babel to transpile any files that end with .js or .jsx and Babel will use the presets we've set in options to perform those transformations. We are also telling it not to look in `node_modules/` folder for any files.
- Now lets run our build script again and see what happens to our bundle
  ```
  npm run build
  ```
- Notice that the code in `bundle.js` which used to look pretty familiar has now been changed significantly.  Especially looking at the transpiled `Alarm` class you can see that Babel has converted our ES6 class to a functional class.  Also notice that all variable declarations now use `var`.  Babel has modified our code so that it is now compatible with older browsers that might not have adopted ES6 yet.

## Tie In React

### Install React

- To use react you need to install two packages
  - `react` - This is the core library of React
  - `react-dom` - Plugs React in to the webpage's DOM
  ```
  npm install --save react react-dom
  ```
  > This time we used --save because these dependencies are always needed for our code to work not just used during development

### Create Basic React Boilerplate
Ok this `example.js` file is all well and good but we came here to build single page web-apps with React. Well the good news is that our project is now set up to build for React we just have to add a couple of files to get a basic React App up and running. 
- First lets delete `client/example.js` and `client/example2.js`.  They served their purpose well but now are just clutter.
- In `public/` create a file called `index.html` and paste the following code in to it
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="styles.css">
    <title>React From Scratch</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
  </html>
  ```
- In `public/` create a file called `styles.css` and paste the following code in to it
  ```css
  body {
    text-align: center;
  }
  h1 {
    color: blue;
  }
  ```
- In `client/` create a file called `index.js` and paste the following code in to it
  ```jsx
  import React from "react";
  import ReactDOM from "react-dom";
  import App from "./App.jsx";

  ReactDOM.render(<App />, document.getElementById("app"));
  ```
- In `client/` create a file called `App.jsx` and paste the following code in to it
  ```jsx
  import React from "react";

  class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        message: "Check out this bundle.js"
      }
    }
    render(){
      return(
        <div className="App">
          <h1>{this.state.message}</h1>
        </div>
      );
    }
  }

  export default App;
  ```
- You should now have a file structure that looks like this
  ```
  reactFromScratch
  ├── client 
  │   └── index.js
  │   └── App.jsx
  └── public 
  │   └── index.html
  │   └── styles.css
  ├── node_modules
  ├── .gitignore
  ├── package-lock.json
  ├── package.json
  ├── webpack.config.js
  └── README.md

  ```

### Update Webpack Configuration
Now that we have modified our files to create a basic React app we need to make a few tweaks to our webpack configuration.  

- In `webpack.config.js` change the entry point to the root of our React app `client/index.js`
  ```javascript
  module.exports = {
    ...
    entry: path.resolve(__dirname, 'client/index.js'),
    ...
  };
  ```
- Since we are still developing our React app we are going to add a couple of options to the webpack configuration that will help us during development. Add these two properties to your `webpack.config.js` file
  ```javascript
  module.exports = {
    ...
    mode: 'development', // add mode option
    devtool: 'eval-source-map', // add devtool option
    ...
  }
  ```
  > Setting `mode` to `'development'` tells webpack to prioritize ease of development when building the bundle.  This is to make it easier to debug your code should you need to find a bug

  > Setting `devtool` to `'eval-source-map'` adds a source map to your bundle.  This means that when you pause your code with the debugger the code you will be looking at will look like the code you've written instead of the often more confusing bundle code.

- In `package.json` we are going to slightly modify our build script and add a  start script to make development easier. Modify the `"scripts"` parameter so it looks like this
  ```
  "scripts": {
    "start": "live-server public/",
    "build": "webpack --watch"
  },
  ```
  > The `--watch` flag will keep webpack running in the background watching the files for any changes.  If it detects changes to the files it run and build the files again

  > `live-server` is a quick an easy to server your React app and will automatically refresh your browser when it detects a file change

### Test Our New React App
- If you don't have `live-server` installed globally run
  ```
  npm install --save-dev live-server
  ```
- Run the build script
  ```
  npm run build
  ```
- Lets start up our development server
  ```
  npm start
  ```
## Congratulations! You've set up a React development environnement from scratch! 🎉

*Remember that there are many different ways to configure all of these tools and depending on your projects needs you may need add/modify various parts of the configuration. This is not meant to be an exhaustive or definitive guide instead the hope is that you are left better understanding what the different parts of the tool-chain are doing, how to configure these tools and why those configurations are necessary*

## Build Scripts
> If you have gotten to here you have a good base to start developing a new React App.  Content past here is not necessary for development but may come in handy when thinking about deploying your app

Remember how we specified the `mode` option as 'development' in the `webpack.config.js` file, turns out that webpack makes some tradeoffs when it bundles your code for development.  The trade of off for more legible/easier to debug code is slower performance and a larger file size. When we are developing an new app for the most part that is a worthwhile trade off but once we move to deploying our app our priorities change.  Now we want to prioritize user experience which means we want to prioritize performance as well as file size (smaller files load faster). 

Ideally we don't want to have to re-write our webpack configuration when we are actively developing our app and when we are deploying the app. We can accomplish this by writing different scripts for production and for development. In `package.json` lets add a new script called 'build-prod'.
```
"build-prod": "webpack --mode production --no-devtool"
```
> This script runs webpack setting the `mode` option to `'production'` and adds the `--no-devtool` flag which instructs webpack not to create a source map for easier debugging



## [Optional] Add A Server

# Resources
- [Creating a React App...From Scratch](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) - Walk through linked to by React Docs though its a bit old now (2018)
- [Create App](https://createapp.dev/) - Web-app that helps you build your webpack and babel config files
- 