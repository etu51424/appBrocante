-- Sélectionner la base de données n'est pas nécessaire en PostgreSQL.
-- Il suffit d'être connecté à la bonne base de données.

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS article CASCADE;
DROP TABLE IF EXISTS dealer CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS interest CASCADE;
DROP TABLE IF EXISTS flea_market CASCADE;
DROP TABLE IF EXISTS slot CASCADE;

-- Création de la table flea_market
CREATE TABLE flea_market (
	id SERIAL PRIMARY KEY,
	address VARCHAR(200) NOT NULL,
	date_start TIMESTAMP NOT NULL,
	date_end TIMESTAMP NOT NULL,
	title VARCHAR(50),
	theme VARCHAR(50),
	is_charity BOOLEAN,
	average_rating REAL NOT NULL,
	review_count INT NOT NULL
);

-- Création de la table slot
CREATE TABLE slot (
	id SERIAL,
	flea_market_id INT NOT NULL,
	is_available INT NOT NULL,
	area REAL,   -- la remarque reste valide ici
	PRIMARY KEY (id, flea_market_id),
	CONSTRAINT fk_slot_flea_market FOREIGN KEY (flea_market_id) REFERENCES flea_market(id)
);

-- Création de la table person
CREATE TABLE person (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	address VARCHAR(200),
	phone_number VARCHAR(15),
	email VARCHAR(40) NOT NULL,
	last_edit_date TIMESTAMP,
	password VARCHAR NOT NULL,
	profile_picture VARCHAR(100), -- on stocke le nom du fichier qui sera dans les dossiers de l'api
	is_admin BOOLEAN NOT NULL
);

-- Création de la table interest
CREATE TABLE interest (
	flea_market_id INT REFERENCES flea_market(id),
	person_id INT NOT NULL REFERENCES person(id),
	is_interested BOOLEAN,
	is_dealer BOOLEAN NOT NULL,
	participation INT,
	PRIMARY KEY (flea_market_id, person_id)
);

-- Création de la table dealer
CREATE TABLE dealer (
	person_id INT PRIMARY KEY REFERENCES person(id),
	type VARCHAR(50),
	description VARCHAR(200),
	signup_date TIMESTAMP,
	average_rating REAL NOT NULL,
	review_count INT NOT NULL
);

-- Création de la table article
CREATE TABLE article (
	id SERIAL,
	dealer_id INT REFERENCES dealer(person_id),
	title VARCHAR(150),
	description VARCHAR(1000),
	entry_date TIMESTAMP,
	cost NUMERIC(10, 2), -- Format plus précis pour la gestion de montants monétaires
	condition VARCHAR(50),
	PRIMARY KEY (dealer_id, id)
);

