 
  // Loads express
  const express = require("express");
  // import the controller function
  
  
  const pokemon = require("./Models/pokemon");

  // create an instance of express
  const app = express();
  const PORT = 3000;

  // Middleware functions
  // they update the request as soon as they come in.
  app.use((req, res, next) => {
    console.log(`Running middleware function!!!`);
    next(); // got to the next middleware or to the response
  });
  // JSON Middleware
  app.use(express.json())
  // if we dont need to read data from the url 
  app.use(express.urlencoded({extended: false}))


  // Setup view engine
  app.set("view engine", "ejs");
  app.set("views", "./Views");

  // Root route
  app.get("/", (req, res) => {
    res.send('Welcome to the Pokemon App!');
      
    });

 // display all pokemon
   app.get("/pokemon", (req, res) => {
    res.send(pokemon)
 }); 


  // display all students
    app.get("/Index", (req, res) => {
      res.render("Index", { data: pokemon, pageHeader: "See All The Pokemon!" });
    }); 

  

  // display one student
  app.get("/pokemon/:id", (req, res) => {
    res.send(req.params.id)  
    const result = pokemon.filter(item => item.id === Number( req.params.id))
    if (result[0] == undefined){
      res.status(404).render("404");
     } else {
          res.render("show", { student: result[0], pageTitle: `Details for ${result[0].name}`  });
     } 
  }); 

    // App Listener
  app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });