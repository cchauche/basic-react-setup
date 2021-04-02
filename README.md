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
  > Since we only need webpack for development purposes we save it as a dev-dependency, this is not critical but a good practice to aim for
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

- For using React you will need to install the following packages using npm:
  - `babel-loader` - This connects Babel and Webpack
  - `@babel/core` - Transpile ES2015+ (ES6) to backwards compatible JavaScript
  - `@babel/preset-env` - Provides smart default presets for converting your ES6 to ES5
  - `@babel/preset-react` - Provides default presets for processing React code
  ```
  npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
  ```

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
          loader: 'babel-loader', //On the files specified by test above use this loader
          options: { // Additional options specific to the loader
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

### Install react and react-DOM

### Create Basic React Boilerplate
- Ok this `example.js` file is all well and good but we came here to build single page web-apps with React. Well the good news is that our project is now set up to build for React we just have to add a couple of files to get a basic React App up and running. 
- First lets delete `client/example.js` and `client/example2.js`.  They served their purpose well but now are just clutter.
- 

## Build Scripts

## [Optional] Add A Server

# Resources
- [Creating a React App...From Scratch](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) - Walk through linked to by React Docs though its a bit old now (2018)
- [Create App](https://createapp.dev/) - Web-app that helps you build your webpack and babel config files
- 