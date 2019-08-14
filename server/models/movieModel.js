//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb');
const mongoose = require('mongoose');


module.exports = {
    getSearch: (data) => {
        console.log("get search down heeeeere");
    },
    getGenres: (data) => {
        let genreSchema = mongoose.Schema({
            id: Number,
            name: String
          });
        let Genre = mongoose.model('Genre', genreSchema);
        let promises = data.map(item => {
            return Genre.findOneAndUpdate(item.query, {id: item.id, name: item.name}, {'upsert': true}).exec();
        }) 
        Promise.all(promises)
            .then(data => {
                //console.log(data)
            })
            .catch(err => {
                if(err) {
                    console.log("error! didn't correctly send data to database");
                }
            })
    },
    saveMovie: (req) => {

    },
    deleteMovie: (req) => {

    }
}