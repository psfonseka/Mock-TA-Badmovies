-- SET UP SCHEMA HERE
CREATE DATABASE IF NOT EXISTS badmovies;

USE  badmovies;

CREATE TABLE IF NOT EXISTS movielist (
  /* Describe your table here.*/
  mID int NOT NULL,
  mRating float NOT NULL,
  mName varchar(255) NOT NULL,
  mGenre int NOT NULL,
  mIMG varchar(255) NOT NULL,
  mDate varchar(255) NOT NULL,
  PRIMARY KEY (mID)
);

--    mysql -u root -p < db/sql/moviesSchema.sql
