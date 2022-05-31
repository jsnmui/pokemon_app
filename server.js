 
  // Loads express
  const express = require("express");
  // import the controller function
  const getData = require("./Controllers/getData");
  // call getData
  const studentsData = getData();

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
      res.render("home", {
        pageTitle: "Students Home Page",
        pageHeader: "Welcome to Students Home Page",
      });
    });

  // display all students
    app.get("/learners", (req, res) => {
      res.render("learners", { data: studentsData, pageTitle: "Students Page" });
    }); 

  

  // display one student
  app.get("/learners/:id", (req, res) => {
  
    const result = studentsData.filter(item => item.id === Number( req.params.id))
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