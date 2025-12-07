const  request =  require('supertest');
const  actors = require('../routes/actorsRoute');
const  movies = require('../routes/movieRoute');
const  directors = require('../routes/directorsRoute');
const  genres = require('../routes/genresRoute');

const mongoose = require('mongoose');
const express = require('express');
const app = express()
app.use(express.json());
const port = process.env.PORT || 8000;

//ROUTES SETUP
app.use("/actors", actors);
app.use("/movies", movies);
app.use("/directors", directors);
app.use("/genres", genres);

describe('GET /actors',()=>{
    test('It should respond with an array of actors', async()=>{
        const response = await request(app).get('/actors/');
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    })
})









