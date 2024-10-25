-- DROP DATABASE AppBrocante;
-- CREATE DATABASE AppBrocante;

USE AppBrocante;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS dealer;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS interest;
DROP TABLE IF EXISTS flea_market;
DROP TABLE IF EXISTS slot;

CREATE TABLE flea_market (
	id INT IDENTITY PRIMARY KEY,
	address VARCHAR(200) NOT NULL,
	date_start DATETIME2 NOT NULL,
	date_end DATETIME2 NOT NULL,
	title VARCHAR(50),
	theme VARCHAR(50),
	is_charity INT,
	average_rating FLOAT NOT NULL,
	review_count INT NOT NULL
);

CREATE TABLE slot (
	id INT IDENTITY,
	flea_market_id INT NOT NULL,
	is_available INT NOT NULL,
	area FLOAT,   --techniquement pourrait dependre de flea_market_id mais on s'y interesse pas
	PRIMARY KEY (id, flea_market_id),
	CONSTRAINT fk_flot_flea_market FOREIGN KEY (flea_market_id) REFERENCES flea_market(id)
);
--1FN: ok
--2FN: ok car pas de 2eme clé
--3FN: ?

-- user est un mot réservé donc la table est nommée person à la place
CREATE TABLE person (
	id INT IDENTITY PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	address VARCHAR(200),
	phone_number VARCHAR(15),
	email VARCHAR(40) NOT NULL,
	last_edit_date DATETIME2,
	-- stocke une photo au format varbinary (si <256k bytes) car + efficient que blob. 
	-- idéalement devrait être dans sa propre table pour rendre "person" + efficace. Devrais-t-on le faire ?
	profile_picture VARBINARY(max)
);

CREATE TABLE interest (
	flea_market_id INT IDENTITY REFERENCES flea_market(id),
	person_id INT NOT NULL REFERENCES person(id),
	is_interested INT,
	is_dealer INT NOT NULL,
	participation INT,
	PRIMARY KEY (flea_market_id, person_id),
);

CREATE TABLE dealer (
	person_id INT IDENTITY PRIMARY KEY REFERENCES person(id),
	type VARCHAR(50),
	description VARCHAR(200), 
	signup_date DATETIME2,
	average_rating FLOAT NOT NULL,
	review_count INT NOT NULL
);

CREATE TABLE article (
	id INT IDENTITY,
	dealer_id INT REFERENCES dealer(person_id),
	title VARCHAR(150),
	description VARCHAR(1000),
	entry_date DATETIME2,
	cost FLOAT(2),
	condition VARCHAR(50),
	PRIMARY KEY (dealer_id, id)
);
