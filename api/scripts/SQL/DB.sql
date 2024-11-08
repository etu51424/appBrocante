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
	is_charity INT,
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
	profile_picture BYTEA -- Utilisation de BYTEA pour stocker des fichiers binaires en PostgreSQL
);

-- Création de la table interest
CREATE TABLE interest (
	flea_market_id INT REFERENCES flea_market(id),
	person_id INT NOT NULL REFERENCES person(id),
	is_interested INT,
	is_dealer INT NOT NULL,
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

-- Insertion de données dans la table flea_market
INSERT INTO flea_market (address, date_start, date_end, title, theme, is_charity, average_rating, review_count)
VALUES
    ('123 Main St', '2024-05-01 09:00', '2024-05-01 17:00', 'Spring Market', 'Vintage', 1, 4.5, 150),
    ('456 Oak St', '2024-06-15 10:00', '2024-06-15 18:00', 'Summer Fest', 'Art', 0, 4.2, 85),
    ('789 Maple Ave', '2024-09-10 08:00', '2024-09-10 16:00', 'Antique Show', 'Antique', 1, 4.8, 200);

-- Insertion de données dans la table person
INSERT INTO person (name, first_name, last_name, address, phone_number, email, last_edit_date, profile_picture)
VALUES
    ('Doe', 'John', 'Doe', '123 Elm St', '555-1234', 'jdoe@example.com', '2024-01-15', NULL),
    ('Smith', 'Jane', 'Smith', '456 Pine St', '555-5678', 'jsmith@example.com', '2024-02-20', NULL),
    ('Brown', 'Charlie', 'Brown', '789 Cedar Ave', '555-8765', 'cbrown@example.com', '2024-03-10', NULL);

-- Insertion de données dans la table dealer
INSERT INTO dealer (person_id, type, description, signup_date, average_rating, review_count)
VALUES
    (1, 'Professional', 'Experienced dealer specializing in vintage items', '2023-05-10', 4.7, 130),
    (2, 'Hobbyist', 'Part-time dealer with an eye for unique finds', '2023-06-22', 4.3, 75);

-- Insertion de données dans la table slot
INSERT INTO slot (flea_market_id, is_available, area)
VALUES
    (1, 1, 25.5),
    (1, 0, 30.0),
    (2, 1, 20.0),
    (3, 1, 35.5);

-- Insertion de données dans la table interest
INSERT INTO interest (flea_market_id, person_id, is_interested, is_dealer, participation)
VALUES
    (1, 1, 1, 1, 10),
    (1, 2, 1, 0, 5),
    (2, 3, 0, 1, 15);

-- Insertion de données dans la table article
INSERT INTO article (dealer_id, title, description, entry_date, cost, condition)
VALUES
    (1, 'Vintage Lamp', 'A beautiful vintage lamp from the 1950s.', '2024-01-05', 150.00, 'Good'),
    (1, 'Antique Chair', 'A wooden chair with intricate carvings.', '2024-02-18', 300.00, 'Excellent'),
    (2, 'Art Deco Clock', 'A stylish Art Deco clock in working condition.', '2024-03-25', 200.00, 'Fair');