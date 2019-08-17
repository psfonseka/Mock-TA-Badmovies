//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb');
const mongoose = require('mongoose');


module.exports = {
    getSearch: (data, genre, callback) => {
        console.log("get search down heeeeere");
        let info = data.map((item) => {
            return {mID: item.id, mRating: item.vote_average, mName: item.title, mGenre: item.genre_ids[0], mIMG: item.poster_path, mDate: item.release_date.slice(0,4)};
        });
        for (let i = 0; i < info.length; i++) {
            //sqlDb.query()
            let id = info[i].mID;
            sqlDb.query('SELECT * FROM movielist WHERE mID = ?', id, function (error, results, fields) {
                if (error) {
                    console.log(error);
                } else {
                    if (results.length >= 1) {
                        //console.log(results);
                    } else {
                        sqlDb.query('INSERT INTO movielist SET ?', info[i], function (error, results, fields) {
                            if (error) {
                                console.log(error);
                            }
                            // Neat!
                        });
                    }
                    
                }
                if (i === info.length-1) {
                    sqlDb.query('SELECT * FROM movielist WHERE mGenre = ?', genre, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        } else {
                            callback(null, results);
                        }
                    })
                }
            });
        }
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