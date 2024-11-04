# How To Run It

!!! In order to run this project locally follow theese steps:
1. Download the project locally in your computer
2. Create a database using the scripts from the queries.sql file (and configure pg.Client according to your database's user, password, etc...)
3. Run npm init in your terminal
4. In index.js, change the data from the pg.Client with your own
5. Run the project with node / nodemon .\index.js


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Description

WorkoutWonder is a node.js + express.js fitness application where a user can log exercises and keep track of their progress (how many repetitions and weight they lifted for each exercise on each day), log their meals and keep track of calories and macronutrients and calculate their caloric needs.

## Languages / Technologies used

Frontend programming languages used : html, css, javascript
          
Frontend technologies used :  

1. bootstrap (for responsiveness and a constant style) 
                               
2. ejs (to make it easier to comunicate with the backend and make the html pages dynamic)

Backend programming languases used - javascript, sql
         
Backend technologies used: 

1. node.js (to utilise javascript server-side) 
                           
2. express.js (utilised for the server)
                           
3. ejs (to make it easier to comunicate with frontend)
                           
4. postgre (for the database)
                           
5. passport.js (used as middleware for authentication)

6. bcrypt (for hashing the passwords)


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Application Walkthrough

The user is greeted on a page that permits only an overview of features and login/signup - or the view of the about page.

The page is home.ejs and stands in the views folder.

![image](https://github.com/alexmihai33/WorkoutWonder/assets/127803655/f607fad3-7f06-4c79-b798-ca9ce3b24c55)


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


The login.ejs and register.ejs are viewed in the views folder

On registering, the data is stored in the users table from the Fitness database (see queries.sql). Passwords are crypted using bcrypt.hash with 10 saltRounds.

After logging in, the user is greeted with the main page of the website, where he can create a template for his workouts (adding exercises for each day on cards).

![image](https://github.com/alexmihai33/WorkoutWonder/assets/127803655/e98e01cc-71c0-46d0-8541-3b9497f74296)


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


After logging in, the header changes - he can access 3 more pages: workouts, nutrition and caloriescalculator

The header is divided in 2 : headerlogged and headerunlogged (views -> partials)

![image](https://github.com/alexmihai33/WorkoutWonder/assets/127803655/24061d84-b219-45a1-8462-727145e7686d)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


The Workouts page contains a Workout Manager: a form where he can add exercises with their weight and repetitions which were performed, and the certain day that this was performed on.

The ejs file that corresponds with this is workout.ejs in the views folder.

All the data from this page is stored in the workouts table.

![image](https://github.com/alexmihai33/WorkoutWonder/assets/127803655/9bdfab65-5e36-419d-8224-bfaa6e85ebf5)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


The Nutrtition page is built in a similar fashion, containing a form where the user inputs the meal with it's macronutrients, and then views meals in the history - and obviously can reset that.

The ejs file that corresponds with this is nutrition.ejs in the views folder.

![image](https://github.com/alexmihai33/WorkoutWonder/assets/127803655/eca41020-f9bf-44cd-b71d-644eeefc0573)


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


The CaloriesCalculator page is the only page where the data is not stored in the database.

The reason for this is the fact that there is no point in storing this data, because it changes all the time and the user should re-calculate it constantly.

It contains a form where the user inputs height, age, weight and activity level and receives his maintenance calories and how muche he should eat to gain/lose 0.5kg a week.

![image](https://github.com/alexmihai33/WorkoutWonder/assets/127803655/114cbfd7-04ab-4543-94d4-72318a83c97c)



