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
	id SERIAL PRIMARY KEY,
	flea_market_id INT NOT NULL,
	is_available BOOLEAN NOT NULL,
	area REAL,
	CONSTRAINT fk_slot_flea_market FOREIGN KEY (flea_market_id) REFERENCES flea_market(id)
);

-- Création de la table person
CREATE TABLE person (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	address VARCHAR(200),
	phone_number VARCHAR(15),
	email VARCHAR(40) NOT NULL,
	last_edit_date TIMESTAMP,
	password VARCHAR NOT NULL,
	profile_picture VARCHAR(100),
	is_admin BOOLEAN NOT NULL DEFAULT false,
	is_timed_out BOOLEAN NOT NULL DEFAULT false
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
	id SERIAL PRIMARY KEY,
	dealer_id INT NOT NULL REFERENCES dealer(person_id),
	title VARCHAR(150),
	description VARCHAR(1000),
	entry_date TIMESTAMP,
	cost NUMERIC(10, 2),
	condition VARCHAR(50)
);

-- Insérer des marchés aux puces
INSERT INTO flea_market (address, date_start, date_end, title, theme, is_charity, average_rating, review_count)
VALUES
('123 Rue de la Paix, Paris', '2024-12-01 09:00:00', '2024-12-01 18:00:00', 'Marché de Noël', 'Artisanat', TRUE, 4.8, 50),
('456 Avenue des Champs, Lyon', '2024-12-15 10:00:00', '2024-12-15 20:00:00', 'Marché Vintage', 'Antiquités', FALSE, 4.5, 30),
('789 Boulevard Saint-Michel, Marseille', '2025-01-10 08:00:00', '2025-01-10 17:00:00', 'Marché de Printemps', 'Plantes', TRUE, 4.9, 20);

-- Insérer des emplacements (slots)
INSERT INTO slot (flea_market_id, is_available, area)
VALUES
(1, TRUE, 10.5),
(1, FALSE, 15.0),
(2, TRUE, 8.0),
(3, TRUE, 12.0),
(3, FALSE, 20.0);

-- Insérer des personnes
INSERT INTO person (name, first_name, last_name, address, phone_number, email, last_edit_date, password, profile_picture, is_admin)
VALUES
('Test', 'Test', 'Test', '22 Rue aucune, Null', '0612345678', 'test.keto@example.com', '2024-11-10 12:30:00', 'pw', 'test.jpg', FALSE),
('Dupont', 'Jean', 'Dupont', '22 Rue Lafayette, Paris', '0612345678', 'jean.dupont@example.com', '2024-11-10 12:30:00', 'hashed_password_1', 'jean.jpg', FALSE),
('Martin', 'Sophie', 'Martin', '45 Rue de Lyon, Lyon', '0623456789', 'sophie.martin@example.com', '2024-11-12 15:45:00', 'hashed_password_2', 'sophie.png', TRUE),
('Durand', 'Paul', 'Durand', '78 Boulevard Haussmann, Marseille', '0634567890', 'paul.durand@example.com', '2024-11-15 09:00:00', 'hashed_password_3', 'paul.jpeg', FALSE);

-- Insérer des intérêts
INSERT INTO interest (flea_market_id, person_id, is_interested, is_dealer, participation)
VALUES
(1, 1, TRUE, FALSE, 1),
(1, 2, TRUE, TRUE, 2),
(3, 3, FALSE, TRUE, 0),
(2, 4, TRUE, FALSE, 1);

-- Insérer des marchands
INSERT INTO dealer (person_id, type, description, signup_date, average_rating, review_count)
VALUES
(2, 'Artisan', 'Création de bijoux faits main.', '2024-09-01 10:00:00', 4.7, 25),
(3, 'Collectionneur', 'Vente de pièces vintage et dantiquités', '2024-10-10 11:30:00', 4.5, 15);

--  Insérer des articles

INSERT INTO article (dealer_id, title, description, entry_date, cost, condition)
VALUES
(2, 'Collier en argent', 'Collier fait main avec des pierres précieuses.', '2024-11-01 14:00:00', 120.00, 'Neuf'),
(2, 'Bracelet en perles', 'Bracelet artisanal en perles naturelles.', '2024-11-05 10:00:00', 45.00, 'Neuf'),
(3, 'Montre vintage', 'Montre à gousset du XIXe siècle.', '2024-11-10 16:30:00', 300.00, 'Très bon état'),
(3, 'Table ancienne', 'Petite table en bois datant de 1920.', '2024-11-15 09:45:00', 150.00, 'Bon état');
