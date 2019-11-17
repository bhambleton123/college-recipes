DROP DATABASE IF EXISTS recipes;

CREATE DATABASE recipes;

USE recipes;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  user_name text,
  password text,
  salt text,
  PRIMARY KEY(id)
);

CREATE TABLE recipes (
  id int NOT NULL AUTO_INCREMENT,
  title text,
  user_id int REFERENCES users(id),
  PRIMARY KEY(id)
);

CREATE TABLE recipe_steps (
  step_number SMALLINT,
  step_description text,
  recipe_id MEDIUMINT REFERENCES recipes(id)
);