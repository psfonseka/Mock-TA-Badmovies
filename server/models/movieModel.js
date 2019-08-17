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
    getGenres: (data, callback) => {
        let genreSchema = mongoose.Schema({
            id: Number,
            name: String
          });
        let Genre = mongoose.model('Genre', genreSchema);
        let promises = data.map(item => {
            return Genre.findOneAndUpdate(item.query, {id: item.id, name: item.name}, {'upsert': true}).exec();
        }) 
        Promise.all(promises)
            .then(() => {
                // let newData = data.map(item => {
                //     return {id: item.id, name: item.name};
                // });
                let findAll = Genre.find({}).exec();
                findAll.then((ndata) => {
                    let finalData = ndata.map(item => {
                        return {id: item.id, name: item.name};
                    });
                    callback(null, finalData.slice(0,19));
                })
            })
            .catch(err => {
                if(err) {
                    console.log("error! didn't correctly send data to database");
                    callback(err);
                }
            })
    },
    saveMovie: (req) => {

    },
    deleteMovie: (req) => {

    }
}