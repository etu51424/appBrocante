-- Sélectionner la base de données n'est pas nécessaire en PostgreSQL.
-- Il suffit d'être connecté à la bonne base de données.

-- Suppression des tables si elles existent déjà
-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS article CASCADE;
DROP TABLE IF EXISTS dealer CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS interest CASCADE;
DROP TABLE IF EXISTS slot CASCADE;
DROP TABLE IF EXISTS flea_market CASCADE;

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
	username VARCHAR(50) UNIQUE NOT NULL,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	address VARCHAR(200),
	phone_number VARCHAR(15),
	email VARCHAR(40) NOT NULL,
	last_edit_date TIMESTAMP,
	password VARCHAR(100) NOT NULL,
	profile_picture VARCHAR(100),
	is_admin BOOLEAN NOT NULL DEFAULT false,
	is_timed_out BOOLEAN NOT NULL DEFAULT false,
	recovery_code VARCHAR(100) DEFAULT NULL
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

-- Insérer des brocantes
INSERT INTO flea_market (address, date_start, date_end, title, theme, is_charity, average_rating, review_count)
VALUES
('123 Rue de la Paix, Paris', '2024-12-01 09:00:00', '2024-12-01 18:00:00', 'Marché de Noël', 'Artisanat', TRUE, 4.8, 50),
('456 Avenue des Champs, Lyon', '2024-12-15 10:00:00', '2024-12-15 20:00:00', 'Marché Vintage', 'Antiquités', FALSE, 4.5, 30),
('789 Boulevard Saint-Michel, Marseille', '2025-01-10 08:00:00', '2025-01-10 17:00:00', 'Marché de Printemps', 'Plantes', TRUE, 4.9, 20),

('Grand-Place, Mons, Belgique', '2024-12-20 09:00:00', '2024-12-20 18:00:00', 'Marché Solidaire de Noël', 'Volontariat', TRUE, 4.7, 45),
('Rue de Fer 25, Namur, Belgique', '2024-12-22 10:00:00', '2024-12-22 16:00:00', 'Bourse aux Vêtements Hivernaux', 'Mode', TRUE, 4.6, 32),
('Parc Astrid, Charleroi, Belgique', '2025-01-14 08:00:00', '2025-01-14 14:00:00', 'Brocante du Nouvel An', 'Antiquités', FALSE, 4.8, 28),
('Place Saint-Pierre, Bastogne, Belgique', '2025-04-08 09:00:00', '2025-04-08 16:00:00', 'Brocante de Printemps', 'Jouets', TRUE, 4.5, 25),
('Rue des Prés 18, Dinant, Belgique', '2025-05-12 10:00:00', '2025-05-12 15:00:00', 'Marché de la Solidarité', 'Livres', TRUE, 4.6, 19),
('Place du Marché, La Louvière, Belgique', '2025-06-18 08:30:00', '2025-06-18 14:30:00', 'Brocante du Quartier', 'Objets Divers', FALSE, 4.7, 35),
('Rue du Château, Chimay, Belgique', '2025-07-20 09:00:00', '2025-07-20 13:00:00', 'Fête de Village et Brocante', 'Traditions Locales', TRUE, 4.9, 42),


('Markt 1, Bruges, Belgique', '2024-12-15 09:00:00', '2024-12-15 17:00:00', 'Marché des Créateurs', 'Artisanat', TRUE, 4.9, 60),
('Korenmarkt, Gand, Belgique', '2025-01-05 10:00:00', '2025-01-05 18:00:00', 'Foire de la Ville', 'Écologie', FALSE, 4.5, 42),
('Vrijdagmarkt, Anvers, Belgique', '2025-02-10 08:30:00', '2025-02-10 15:00:00', 'Brocante de Luxe', 'Produits de Luxe', FALSE, 4.8, 50),
('Place du Bourg, Ypres, Belgique', '2025-03-14 09:30:00', '2025-03-14 17:00:00', 'Marché des Trouvailles', 'Antiquités', FALSE, 4.6, 38),
('Rue des Tisserands, Courtrai, Belgique', '2025-04-22 10:00:00', '2025-04-22 16:00:00', 'Marché Vintage', 'Mode', TRUE, 4.7, 28),
('Place de l''Église, Aalst, Belgique', '2025-05-30 08:00:00', '2025-05-30 14:00:00', 'Brocante de Quartier', 'Objets Variés', FALSE, 4.5, 20),
('Place de la Gare, Ostende, Belgique', '2025-06-25 09:00:00', '2025-06-25 17:00:00', 'Brocante Marine', 'Nautisme', FALSE, 4.8, 34),


('Place Guillaume II, Luxembourg', '2025-01-12 09:00:00', '2025-01-12 17:00:00', 'Marché aux Trésors', 'Bijoux', FALSE, 4.7, 35),
('Rue Philippe II, Luxembourg', '2025-02-01 10:00:00', '2025-02-01 16:00:00', 'Brocante Gourmande', 'Gastronomie', FALSE, 4.6, 25),
('Parc Municipal, Esch-sur-Alzette, Luxembourg', '2025-03-08 09:00:00', '2025-03-08 13:00:00', 'Concours Entre Villages : Brocante et Jeux', 'Traditions Locales', TRUE, 4.9, 40),
('Place du Marché, Differdange, Luxembourg', '2025-04-10 09:30:00', '2025-04-10 14:30:00', 'Marché Printanier', 'Plantes', TRUE, 4.5, 18),
('Place de l''Étoile, Luxembourg', '2025-05-15 10:00:00', '2025-05-15 17:00:00', 'Brocante de Ville', 'Objets Divers', FALSE, 4.7, 22),


('Halle des Foires, Liège, Belgique', '2025-02-20 09:00:00', '2025-02-20 19:00:00', 'Salon du Bien-Être', 'Santé', FALSE, 4.8, 55),
('Parc du Cinquantenaire, Bruxelles, Belgique', '2025-03-15 08:00:00', '2025-03-15 18:00:00', 'Brocante Printanière', 'Jardinage', TRUE, 4.9, 75),
('Place Communale, Bastogne, Belgique', '2025-04-01 07:00:00', '2025-04-01 14:00:00', 'Kermesse et Brocante de Village', 'Culture Locale', TRUE, 4.6, 38),
('Place du Perron, Verviers, Belgique', '2025-06-12 09:00:00', '2025-06-12 16:00:00', 'Marché d''Été', 'Produits Artisanaux', TRUE, 4.8, 40),
('Place des Tilleuls, Marche-en-Famenne, Belgique', '2025-07-08 08:30:00', '2025-07-08 13:30:00', 'Foire au Troque', 'Objets Divers', FALSE, 4.6, 29),
('Place de la République, Arlon, Belgique', '2025-08-20 09:00:00', '2025-08-20 17:00:00', 'Marché du Patrimoine', 'Histoire', TRUE, 4.7, 24),
('Place de la Cathédrale, Tournai, Belgique', '2025-03-15 09:00:00', '2025-03-15 16:00:00', 'Brocante Religieuse de Carême', 'Religion', TRUE, 4.7, 20),
('Parvis de l’Église Saint-Joseph, Namur, Belgique', '2025-04-02 10:00:00', '2025-04-02 17:00:00', 'Marché de la Foi', 'Religion', TRUE, 4.8, 15),
('Campus de Louvain-la-Neuve, Belgique', '2025-05-10 09:00:00', '2025-05-10 18:00:00', 'Brocante Étudiante', 'Universitaire', FALSE, 4.5, 42),
('Place de l’Opéra, Liège, Belgique', '2025-06-01 12:00:00', '2025-06-01 22:00:00', 'Marché des Mélomanes', 'Musique', TRUE, 4.9, 30),
('Place Communale, Charleroi, Belgique', '2025-07-14 10:00:00', '2025-07-14 16:00:00', 'Salon Geek & Brocante', 'Fan-Themed', FALSE, 4.8, 48),
('Parc Léopold, Bruxelles, Belgique', '2025-08-20 08:00:00', '2025-08-20 14:00:00', 'Brocante Littéraire', 'Culture', TRUE, 4.7, 33),
('Place du Marché, Waterloo, Belgique', '2025-09-10 10:00:00', '2025-09-10 17:00:00', 'Marché des Historiens', 'Histoire', FALSE, 4.6, 25),
('Salle Communale, Binche, Belgique', '2025-10-20 09:00:00', '2025-10-20 16:00:00', 'Brocante du Carnaval', 'Culture Locale', TRUE, 4.9, 40),
('Place de l’Évêché, Arlon, Belgique', '2025-11-15 09:00:00', '2025-11-15 15:00:00', 'Marché Médiéval', 'Culture', FALSE, 4.8, 28),
('Église Saint-Martin, Bastogne, Belgique', '2025-12-12 09:00:00', '2025-12-12 16:00:00', 'Brocante et Chorale de Noël', 'Musique', TRUE, 4.8, 37),
('Place des Francs, Mons, Belgique', '2025-12-20 10:00:00', '2025-12-20 18:00:00', 'Marché de la Bande Dessinée', 'Fan-Themed', FALSE, 4.7, 19),
('Quai du Commerce, Bruxelles, Belgique', '2025-01-10 09:00:00', '2025-01-10 17:00:00', 'Brocante Geek', 'Fan-Themed', FALSE, 4.9, 50),
('Place de la Concorde, Namur, Belgique', '2025-02-05 10:00:00', '2025-02-05 16:00:00', 'Marché de la Diversité', 'Culture', TRUE, 4.7, 21),
('Rue de la Liberté, Liège, Belgique', '2025-03-12 08:00:00', '2025-03-12 14:00:00', 'Brocante des Cinéphiles', 'Fan-Themed', FALSE, 4.6, 29),

('Rue Haute 100, Bruxelles, Belgique', '2024-12-18 09:00:00', '2024-12-18 17:00:00', 'Marché aux Puces des Marolles', 'Objets Variés', FALSE, 4.7, 150),
('Quai de la Batte, Liège, Belgique', '2024-12-24 08:00:00', '2025-12-24 13:00:00', 'Marché aux Puces de la Batte', 'Antiquités', FALSE, 4.8, 120),
('Place Verte, Ath, Belgique', '2025-05-18 09:00:00', '2025-05-18 14:00:00', 'Marché aux Puces Rural', 'Objets Divers', TRUE, 4.6, 31);


-- Insérer des emplacements (slots)
INSERT INTO slot (flea_market_id, is_available, area)
VALUES
(1, TRUE, 10.5),
(1, FALSE, 15.0),
(2, TRUE, 8.0),
(3, TRUE, 12.0),
(3, FALSE, 20.0);

-- Insérer des personnes
INSERT INTO person (username, first_name, last_name, address, phone_number, email, last_edit_date, password, profile_picture, is_admin)
VALUES
('Test', 'Test', 'Test', '22 Rue aucune, Null', '0612345678', 'test.keto@example.com', '2025-11-10 12:30:00', 'pw', 'test.jpg', TRUE),
('Dupont', 'Jean', 'Dupont', '22 Rue Lafayette, Paris', '0612345678', 'jean.dupont@example.com', '2024-11-10 12:30:00', 'hashed_password_1', 'jean.jpg', FALSE),
('Martin', 'Sophie', 'Martin', '45 Rue de Lyon, Lyon', '0623456789', 'sophie.martin@example.com', '2024-11-12 15:45:00', 'hashed_password_2', 'sophie.png', TRUE),
('Durand', 'Paul', 'Durand', '78 Boulevard Haussmann, Marseille', '0634567890', 'paul.durand@example.com', '2024-11-15 09:00:00', 'hashed_password_3', 'paul.jpeg', FALSE),
('Lord', null, null, null, null, 'lord.darkduja@gmailc.com', null, 'brocante', null, TRUE);

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
(3, 'Collectionneur', 'Vente de pièces vintage et dantiquités', '2024-10-10 11:30:00', 4.5, 15),
(5, 'Gros Con', 'Vente du caca', '2024-10-10 11:30:00', 4.5, 15);

--  Insérer des articles

INSERT INTO article (dealer_id, title, description, entry_date, cost, condition)
VALUES
(2, 'Collier en argent', 'Collier fait main avec des pierres précieuses.', '2024-11-01 14:00:00', 120.00, 'Neuf'),
(2, 'Bracelet en perles', 'Bracelet artisanal en perles naturelles.', '2024-11-05 10:00:00', 45.00, 'Neuf'),
(3, 'Montre vintage', 'Montre à gousset du XIXe siècle.', '2024-11-10 16:30:00', 300.00, 'Très bon état'),
(3, 'Table ancienne', 'Petite table en bois datant de 1920.', '2024-11-15 09:45:00', 150.00, 'Bon état');
