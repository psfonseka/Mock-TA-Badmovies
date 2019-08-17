const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

module.exports = {
    genres: (req, callback) => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
        .then(data => {
            //console.log(data);
            callback(data.data.genres);
        })
        .catch(err => {
            if(err) {
                console.log("ERROR! genres");
            }
        })
    },
    movies: (req, callback) => {
        let selected = req.query.genre;
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&vote_count.gte=10&with_genres=${selected}`)
        .then(data => {
            //console.log(data.data);
            callback(data.data.results);
        })
        .catch(err => {
            if(err) {
                console.log("ERROR! search");
            }
        })
    }
}

// Don't forget to export your functions and require them within your server file