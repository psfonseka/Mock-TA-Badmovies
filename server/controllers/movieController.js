const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre     
    console.log("get search");
    //movieModel.getSearch(req);
    apiHelpers.movies(req, (data) => {
      movieModel.getSearch(data, req.query.genre, (err, genres) => {
        res.statusCode = 200;
        res.send(genres);
      });
    });
    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    console.log("get genres");
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    apiHelpers.genres(req, (data) => {
      movieModel.getGenres(data, (err, genres) => {
        if(err) {
          console.log(err);
        } else {
          //console.log(genres);
          res.statusCode = 200;
          res.send(genres);
        }
      });
    });
    //res.statusCode = 200;
    //res.send();
    // send back
  },
  saveMovie: (req, res) => {

  },
  deleteMovie: (req, res) => {

  }
}