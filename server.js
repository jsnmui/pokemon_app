 
  // Loads express
  const express = require("express");
  // import the controller function
  
  
  const pokemon = require("./Models/pokemon");

  //*==============SETUP create an instance of express
  const app = express();
  const PORT = 3000;

  // Middleware functions
  // they update the request as soon as they come in.
  app.use((req, res, next) => {
    console.log(`Running middleware function!!!`);
    next(); // got to the next middleware or to the response
  });
  // JSON Middleware parses the form
  app.use(express.json())
  // if we dont need to read data from the url 
  app.use(express.urlencoded({extended: false}))


  // Setup view engine
  app.set("view engine", "ejs");
  app.set("views", "./Views");

  //* ROUTES

  // Root route 
  app.get("/", (req, res) => {
    res.send('Welcome to the Pokemon App!');
      
    });

 

  // display all pokemon
    //  res.send(pokemon)
    app.get("/pokemon", (req, res) => {
          res.render("Index", {  pageTitle: 'Pokemon',
                                pageHeader: "See All The Pokemon!",
                                data: pokemon
          });
    }); 



      // HTML Form
   app.get("/pokemon/new", (req, res) => {
    res.render("newpokemon");
  });

  // Create a new Fruit
  app.post("/pokemon", (req, res) => {
    console.log(req);
    pokemon.push(req.body)
    res.redirect('/pokemon')
  });

 
//show views of each pokemon
  app.get("/pokemon/:id", (req, res) => {
          
   res.render("show", {  pageHeader:"Gotta Catch 'Em All", 
                         data: pokemon[req.params.id] 
    } );
      
  }); 

 

    // App Listener
  app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });