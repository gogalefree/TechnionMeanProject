## Technion MEAN Project - Guy Freedman

#### This repo contains of both node.js server code and Angular client code, each in a seperate folder.

For a live demo of the app on heroku server using mongo cloud platform, please visit:

https://teach-mean-guy-freedman.herokuapp.com

The project uses Angular Material and BS4 as layout guides.
To run locally, do as follows:

1. Clone this repo.
2. Open your terminal and navigate to the Server folder.
3. Run `node install`.
4. Run `npm start`.
5. Navigate to the .env file and replace the `DATABASE_URL` value with your local one.
6. Navigate to the Client folder and run `node install`.
7. run `ng serve -o`.

**Please note that the a mongoDB server should run on your local machine, with a DB named "users" and a "users" collection in it.**
