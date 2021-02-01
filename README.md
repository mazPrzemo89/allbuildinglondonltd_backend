# allbuildinglondonltd_backend 
This Express server is deployed to a unmanaged VPS running on Ububtu 18.04, it serves a ReactJS production build.



## Database

Before starting the app need a running instance of mongoDB database running on your VPS. For that MongoDB must be previously installed.

## Mongoose 

In this app MongooseJS library is used for Object Data Modeling and connecting to the underlying MongoDB database.

## Mongoose models

Every mongoose model is bases on a mongoose schema.
Apart from user model the all of them consist simple of Strings, Numbers and Booleans.
The user model is slightly more complicated. It has methods and virtual fields necessary to hash the users password using crypto which is a nodejs native module.

## Controllers

Controllers contain the necessary functionality needed to perform all the CRUD operations used by the app.
Every controller module funcion is a named export later imported by the route modules to be invoked on a request.

## Routes

Route modules are an invocation of a express.Router() function saved in a variable and then exported.
Each route module has HTTP methods assigned to it with corresponding route strings and methods imported from controller modules.


## App

The invocation of expressJS library and connecting to the mongoDB database happens in the app module. It also import and assing all other necessasy middlewares.

## Server.js file

Server.js file contains only app.listen(port) fucntion invocation which starts the whole server.


#Deployment

To run the app firstly make sure you've got npm and nodejs(at least version 14) installed on yout machine.

To serve the ReacjJS production build we need to modify our server a little bit.
First you need to install nodeJS path module.
Run ``` npm i --save path ``` command from the apps root directory.
Require it on the top of the app.js file.

``` const path = require('path') ```

Then you have to show express where your build is, just add the snippet below to the middlewares also in app.js file

``` app.use(express.static(path.join(__dirname, 'build'))) ```

After that replace 

```
app.get('/', (req, res) => {
  res.json('App Server')
})

```

with

```
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
```

That will serve all the html from your production build.

Run ``` npm start ``` and you app is up running, enjoy the fireworks!
