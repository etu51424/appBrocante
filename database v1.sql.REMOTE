CREATE DATABASE AppBrocante;
USE AppBrocante;

CREATE TABLE slot (
	id INTEGER,
	flea_market_id INTEGER NOT NULL,
	is_available INTEGER NOT NULL,
	area FLOAT,
	PRIMARY KEY (id)
);

CREATE TABLE flea_market (
	id INTEGER,
	address VARCHAR(200) NOT NULL,
	date_start DATETIME2 NOT NULL,
	date_end DATETIME2 NOT NULL,
	title VARCHAR(50),
	theme VARCHAR(50),
	is_charity INTEGER,
	average_rating FLOAT NOT NULL,
	review_count INTEGER NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE person (
	id INTEGER NOT NULL,
	name VARCHAR(50) NOT NULL,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	address VARCHAR(200),
	phone_number VARCHAR(15),
	email VARCHAR(40) NOT NULL,
	last_edit_date DATETIME2,
	PRIMARY KEY(id)
);

CREATE TABLE interest (
	flea_market_id INTEGER NOT NULL,
	person_id INTEGER NOT NULL,
	is_interested INTEGER,
	is_dealer INTEGER NOT NULL,
	participation INTEGER,
	PRIMARY KEY (flea_market_id, person_id),
	FOREIGN KEY (flea_market_id) REFERENCES flea_market(id),
	FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE dealer (
	person_id INTEGER NOT NULL,
	type VARCHAR(50),
	average_rating FLOAT NOT NULL,
	review_count INTEGER NOT NULL,
	PRIMARY KEY (person_id),
	FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE article (
	id INTEGER NOT NULL,
	dealer_id INTEGER,
	title VARCHAR(150),
	description VARCHAR(1000),
	entry_date DATETIME2,
	cost FLOAT(2),
	condition VARCHAR(50),
	PRIMARY KEY (dealer_id, id),
	FOREIGN KEY(dealer_id) REFERENCES dealer(person_id)
);
