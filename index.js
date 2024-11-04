import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt"; 
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;

app.set('view engine', 'ejs');

const db = new pg.Client({
  user: "your-user",
  host: "your-host",
  database: "your-database",
  password: "your-password",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static('images'));
app.use("/public", express.static('public'))

app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized : true

}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => { 
  res.render("register.ejs");
}); 

app.get("/aboutunlogged", (req, res) => { 
  res.render("aboutunlogged.ejs");
}); 

app.get("/aboutlogged", (req, res) => { 
  if(req.isAuthenticated){
    res.render('aboutlogged.ejs');
  }
  else{
    res.redirect("/login");
  }
});

app.get("/caloriescalculator", (req, res) => { 
  if(req.isAuthenticated){
    res.render('caloriescalculator.ejs');
  }
  else{
    res.redirect("/login");
  }
});



app.post("/register", async (req, res) => {
    const email = req.body.username;
    const loginPassword = req.body.password;
    const name = req.body.name;
  
    try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (checkResult.rows.length > 0) {
        res.send("Email already exists. Try logging in.");
      } else {
        //Password hash
        bcrypt.hash(loginPassword, saltRounds, async (err, hash) => {
          if (err) {
            console.log("Error hashing password:", err);
          }
          const result = await db.query(
            "INSERT INTO users (email, password, nume) VALUES ($1, $2, $3)",
            [email, hash, name]
          );
          console.log(result);
          res.render("home.ejs");
        })
      }
    } catch (err) {
      console.log(err);
    }
  });

app.post("/login", passport.authenticate("local", {
  successRedirect: "/main",
  failureRedirect: "/login"
}));

passport.use(new Strategy(async function verify(username, password, cb){

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashPassword = user.password;
  
      bcrypt.compare(password, storedHashPassword, (err, result) => {
        if (err) {
          return cb(err)
        } else {
          if (result) {
            return cb(null, user)
          } else {
            return cb(null, false);
          }
        }
      });
    } else {
      return cb("User not found");
    }
  } catch (err) {
    console.log(err);
  }
}));

app.get("/main", async (req,res) => {

  const result = await db.query(`SELECT exercise_name FROM exercises WHERE (exercise_day, email) = ($1, $2)`, ["Monday", req.user.email]);
  const exercise_names1 = result.rows.map(row => row.exercise_name);
  
  const result2 = await db.query(`SELECT exercise_name FROM exercises WHERE (exercise_day, email) = ($1, $2)`, ["Tuesday", req.user.email]);
  const exercise_names2 = result2.rows.map(row => row.exercise_name);

  const result3 = await db.query(`SELECT exercise_name FROM exercises WHERE (exercise_day, email) = ($1, $2)`, ["Wednesday", req.user.email]);
  const exercise_names3 = result3.rows.map(row => row.exercise_name);

  const result4 = await db.query(`SELECT exercise_name FROM exercises WHERE (exercise_day, email) = ($1, $2)`, ["Thursday", req.user.email]);
  const exercise_names4 = result4.rows.map(row => row.exercise_name);

  const result5 = await db.query(`SELECT exercise_name FROM exercises WHERE (exercise_day, email) = ($1, $2)`, ["Friday", req.user.email]);
  const exercise_names5 = result5.rows.map(row => row.exercise_name);

  const result6 = await db.query(`SELECT exercise_name FROM exercises WHERE (exercise_day, email) = ($1, $2)`, ["Saturday", req.user.email]);
  const exercise_names6 = result6.rows.map(row => row.exercise_name);

  const result7 = await db.query(`SELECT exercise_name FROM exercises WHERE (exercise_day, email) = ($1, $2)`, ["Sunday", req.user.email]);
  const exercise_names7 = result7.rows.map(row => row.exercise_name);
  
  const name = req.user.nume;
  
  if(req.isAuthenticated){
    res.render("main.ejs", {
      exercise_names1: exercise_names1,
      exercise_names2: exercise_names2,
      exercise_names3: exercise_names3,
      exercise_names4: exercise_names4,
      exercise_names5: exercise_names5,
      exercise_names6: exercise_names6,
      exercise_names7: exercise_names7,
      name: name
    });
  }
  else{
    res.redirect("/login");
  }
  

  
});

app.post("/main", async (req, res) => {
  const exercise1 = req.body.exercise1;
  const day1 = req.body.day1; 

  if(exercise1){
    const result1 = await db.query("INSERT INTO exercises (exercise_name, exercise_day, email) VALUES ($1, $2, $3)", [exercise1, day1, req.user.email]);
  }

  const exercise2 = req.body.exercise2;
  const day2 = req.body.day2;
  if(exercise2){
  const result2 = await db.query("INSERT INTO exercises (exercise_name, exercise_day, email) VALUES ($1, $2, $3)", [exercise2, day2, req.user.email]);
  }

  const exercise3 = req.body.exercise3;
  const day3 = req.body.day3; 
  if(exercise3){
  const result3 = await db.query("INSERT INTO exercises (exercise_name, exercise_day, email) VALUES ($1, $2, $3)", [exercise3, day3, req.user.email]);
  }

  const exercise4 = req.body.exercise4;
  const day4 = req.body.day4; 
  if(exercise4){
  const result4 = await db.query("INSERT INTO exercises (exercise_name, exercise_day, email) VALUES ($1, $2, $3)", [exercise4, day4, req.user.email]);
  }

  const exercise5 = req.body.exercise5;
  const day5 = req.body.day5;
  if(exercise5){
  const result5 = await db.query("INSERT INTO exercises (exercise_name, exercise_day, email) VALUES ($1, $2, $3)", [exercise5, day5, req.user.email]);
  }

  const exercise6 = req.body.exercise6;
  const day6 = req.body.day6; 
  if(exercise6){
  const result6 = await db.query("INSERT INTO exercises (exercise_name, exercise_day, email) VALUES ($1, $2, $3)", [exercise6, day6, req.user.email]);
  }

  const exercise7 = req.body.exercise7;
  const day7 = req.body.day7; 
  if(exercise7){
  const result7 = await db.query("INSERT INTO exercises (exercise_name, exercise_day, email) VALUES ($1, $2, $3)", [exercise7, day7, req.user.email]);
  }


  res.redirect("/main");
 
});

app.post('/deleteTemplate', async (req, res) => {
  await db.query('DELETE FROM exercises WHERE email = $1', [req.user.email]);
  res.redirect('/main');
});

app.get('/workout', async (req, res) => {
  const selectedDay = req.body.daySelect || null;
  let workouts = [];

  const result = await db.query(`SELECT exercise_day, exercise_name, weight, reps FROM workouts WHERE email = $1`, [req.user.email]);
  workouts = result.rows;

  if(req.isAuthenticated){
    res.render('workout.ejs', {selectedDay:selectedDay, workouts:workouts});
  }
  else{
    res.redirect("/login");
  }
  
});

app.post('/addWorkout', async (req, res) => {
  const selectedDay = req.body.daySelect || null;
  const exercise_name = req.body.exercise_name;
  const weight = req.body.weight;
  const reps = req.body.reps

  const result = await db.query("INSERT INTO workouts (exercise_name, weight, reps, email, exercise_day) VALUES ($1, $2, $3, $4, $5)", [exercise_name, weight, reps, req.user.email, selectedDay])
  

  res.redirect('/workout');
});

app.get('/nutrition', async (req, res) => {
  let meals = [];

  const result = await db.query(`SELECT food_name, calories, protein, fat, carbs FROM meals WHERE email = $1`, [req.user.email]);
  meals = result.rows;
  
  if(req.isAuthenticated){
    res.render('nutrition.ejs', {meals:meals});
  }
  else{
    res.redirect("/login");
  }
  
});

app.post('/addMeal', async (req, res) => {
  const food_name = req.body.food_name;
  const calories = req.body.calories;
  const protein = req.body.protein;
  const fat = req.body.fat;
  const carbs = req.body.carbs;

  const result = await db.query("INSERT INTO meals (food_name, calories, protein, fat, carbs, email) VALUES ($1, $2, $3, $4, $5, $6)", [food_name, calories, protein, fat, carbs, req.user.email])
  

  res.redirect('/nutrition');
});

app.post('/deleteMeals', async (req, res) => {
  await db.query('DELETE FROM meals WHERE email = $1', [req.user.email]);
  res.redirect('/nutrition');
});


passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
