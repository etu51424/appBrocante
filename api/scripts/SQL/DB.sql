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

('Rue Haute 100, Bruxelles, Belgique', '2025-12-18 09:00:00', '2024-12-18 17:00:00', 'Marché aux Puces des Marolles', 'Objets Variés', FALSE, 4.7, 150),
('Quai de la Batte, Liège, Belgique', '2025-12-24 08:00:00', '2025-12-24 13:00:00', 'Marché aux Puces de la Batte', 'Antiquités', FALSE, 4.8, 120),
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
('Admin', null, null, 'Namur', null, 'xavier.dujardin1@gmail.com', null, 'brocante', null, TRUE),
('User', null, null, null, null, 'xavier.dujardin1@gmail.com', null, 'bidondon', null, TRUE),
('UserDealer', null, null, null, null, 'xavier.dujardin1@gmail.com', null, 'brocanteur', null, TRUE),
('CalmentJo', 'Joanna', 'Calment', '1 Rue Silence, Gembloux', '0619045651', 'joanna.calment@example.com', '2024-10-09 12:30:00', 'lutecia', 'joannacalment.jpg', FALSE),
('Leclercq', 'Marie', 'Leclercq', '12 Avenue Louise, Bruxelles', '0468123456', 'marie.leclercq@example.be', '2024-12-01 10:00:00', 'hashed_password_4', 'marie.jpg', FALSE),
('Vermeulen', 'Thomas', 'Vermeulen', '15 Place Royale, Namur', '0479234567', 'thomas.vermeulen@example.be', '2024-11-22 14:30:00', 'hashed_password_5', 'thomas.jpg', FALSE),
('Dumont', 'Claire', 'Dumont', '9 Rue du Parc, Liège', '0487345678', 'claire.dumont@example.be', '2024-11-20 16:45:00', 'hashed_password_6', 'claire.png', FALSE),
('DeSmet', 'Luc', 'De Smet', '50 Avenue de la Toison d’Or, Bruxelles', '0471345678', 'luc.desmet@example.be', '2024-11-25 11:20:00', 'hashed_password_7', 'luc.jpeg', FALSE),
('Peeters', 'Anne', 'Peeters', '33 Chaussée de Charleroi, Mons', '0467345678', 'anne.peeters@example.be', '2024-12-05 13:50:00', 'hashed_password_8', 'anne.jpg', FALSE),
('Jansen', 'Robert', 'Jansen', '18 Rue Neuve, Anvers', '0478456789', 'robert.jansen@example.be', '2024-11-18 12:00:00', 'hashed_password_9', 'robert.png', FALSE),
('VanHoutte', 'Elise', 'Van Houtte', '77 Rue des Carmes, Louvain', '0465567890', 'elise.vanhoutte@example.be', '2024-11-28 09:30:00', 'hashed_password_10', 'elise.jpeg', FALSE),
('Dewitte', 'Benoit', 'Dewitte', '21 Rue de Namur, Namur', '0489123456', 'benoit.dewitte@example.be', '2024-11-17 14:15:00', 'hashed_password_11', 'benoit.jpg', FALSE),
('VanDenBossche', 'Hélène', 'Van Den Bossche', '61 Rue Royale, Bruxelles', '0467234567', 'helene.vandenbossche@example.be', '2024-11-30 08:50:00', 'hashed_password_12', 'helene.png', FALSE),
('Meunier', 'Hugo', 'Meunier', '8 Rue Saint-Laurent, Arlon', '0487654321', 'hugo.meunier@example.be', '2024-11-21 18:00:00', 'hashed_password_13', 'hugo.jpeg', FALSE),
('Laurent', 'Isabelle', 'Laurent', '5 Rue des Grands Carmes, Bruxelles', '0471324567', 'isabelle.laurent@example.be', '2024-12-02 12:30:00', 'hashed_password_14', 'isabelle.jpg', FALSE),
('Simon', 'Antoine', 'Simon', '11 Rue Léopold, Tournai', '0489345678', 'antoine.simon@example.be', '2024-12-04 15:10:00', 'hashed_password_15', 'antoine.png', FALSE),
('Dupuis', 'Céline', 'Dupuis', '14 Avenue Foch, Bruges', '0468345678', 'celine.dupuis@example.be', '2024-12-06 11:40:00', 'hashed_password_16', 'celine.jpeg', FALSE),
('DeVos', 'Julien', 'De Vos', '36 Boulevard Anspach, Bruxelles', '0489123457', 'julien.devos@example.be', '2024-12-08 10:30:00', 'hashed_password_17', 'julien.jpg', FALSE),
('VandenBerg', 'Emilie', 'Vanden Berg', '19 Rue de la Paix, Namur', '0467123456', 'emilie.vandenberg@example.be', '2024-12-09 09:20:00', 'hashed_password_18', 'emilie.png', FALSE),
('Delvaux', 'Arnaud', 'Delvaux', '22 Rue de l’Université, Louvain-la-Neuve', '0489345612', 'arnaud.delvaux@example.be', '2024-12-10 14:50:00', 'hashed_password_19', 'arnaud.jpeg', FALSE),
('Renard', 'Florence', 'Renard', '7 Rue du Mont Blanc, Liège', '0478456123', 'florence.renard@example.be', '2024-12-11 11:15:00', 'hashed_password_20', 'florence.jpg', FALSE),
('Maes', 'Eric', 'Maes', '10 Rue des Frères, Gand', '0467234512', 'eric.maes@example.be', '2024-12-12 13:45:00', 'hashed_password_21', 'eric.png', FALSE),
('Goossens', 'Manon', 'Goossens', '28 Rue des Ecoles, Liège', '0489345678', 'manon.goossens@example.be', '2024-12-13 10:50:00', 'hashed_password_22', 'manon.jpeg', FALSE),
('VanDamme', 'Olivier', 'Van Damme', '42 Rue Royale, Bruxelles', '0478456123', 'olivier.vandamme@example.be', '2024-12-14 08:30:00', 'hashed_password_23', 'olivier.jpg', TRUE),
('DeClerck', 'Julie', 'De Clerck', '3 Rue de Namur, Namur', '0467234513', 'julie.declerck@example.be', '2024-12-15 09:40:00', 'hashed_password_24', 'julie.png', FALSE),
('VanDerMeulen', 'Simon', 'Van Der Meulen', '25 Avenue Louise, Bruxelles', '0489345613', 'simon.vandermeulen@example.be', '2024-12-16 12:10:00', 'hashed_password_25', 'simon.jpeg', FALSE),
('DePauw', 'Chloé', 'De Pauw', '6 Rue Saint-Laurent, Arlon', '0478456124', 'chloe.depauw@example.be', '2024-12-17 18:20:00', 'hashed_password_26', 'chloe.jpg', FALSE);

-- Insérer des intérêts
INSERT INTO interest (flea_market_id, person_id, is_interested, is_dealer, participation)
VALUES
(1, 1, TRUE, FALSE, 1),
(1, 2, TRUE, TRUE, 2),
(3, 3, FALSE, TRUE, 0),
(2, 4, TRUE, FALSE, 1),
(2, 22, TRUE, FALSE, 1);

-- Insérer des marchands
INSERT INTO dealer (person_id, type, description, signup_date, average_rating, review_count)
VALUES
(1, 'Collectioneur', 'Achet revente de livres rares', '2024-09-01 10:00:00', 4.0, 25),
(2, 'Artisan', 'Création de bijoux faits main.', '2024-09-01 10:00:00', 4.7, 25),
(3, 'Collectionneur', 'Vente de pièces vintage et dantiquités', '2024-10-10 11:30:00', 4.5, 15),
(4, 'Artisan', 'Vente de figurines', '2024-06-10 11:30:00', 4.5, 15),
(5, 'Fan de BD', 'Revente de comics', '2024-01-10 11:01:00', 4.1, 149),
(6, 'Fan de legos', 'Deposition de legos', '2024-01-10 11:01:00', 3.3, 19),
(7, 'Ebeniste', 'Sculptures en bois', '2024-01-10 11:09:00', 2.3, 100),
(8, 'Bijoutier', 'Bijoux pas cher', '2024-01-10 11:09:00', 4.0, 47),
(9, 'Vendeur de seconde main', 'Vetements usagés', '2024-01-10 11:09:00', 3.9, 47),
(10, 'Vendeur de seconde main', 'Vetements usagés', '2024-01-10 11:09:00', 3.0, 40),
(11, 'Bijoutier', 'Bijoux de luxe', '2024-06-01 11:09:00', 4.0, 37),
(12, 'Artiste', 'Toiles de fond', '2024-06-20 11:09:00', 4.0, 10),
(13, 'Artiste', 'Toiles de joute', '2024-06-20 11:09:00', 1.0, 17),
(14, 'Assistant brocanteur', 'Vente au detail', '2024-07-20 11:09:00', 1.0, 28),
(15, 'Fan de crayons', 'Vente de crayons rares', '2024-01-10 11:01:00', 4.9, 19),
(16, 'Artisan', 'Vente d objets divers', '2024-01-10 11:01:00', 4.8, 55),
(17, 'Artisan', 'Vente d objets divers', '2024-01-10 12:01:00', 4.3, 57),
(18, 'Voyante', 'Materiel occulte', '2024-02-10 03:01:00', 4.0, 50),
(19, 'Artisan', 'Vente d objets divers', '2024-01-19 14:01:00', 4.8, 59),
(20, 'Artisan', 'Vente d objets divers', '2024-05-15 11:01:00', 4.8, 66),
(21, 'Potier', 'Poterie', '2024-06-01 11:09:00', 3.5, 39);


--  Insérer des articles

INSERT INTO article (dealer_id, title, description, entry_date, cost, condition)
VALUES
(1, 'Collier en argent', 'Collier fait main avec des pierres précieuses.', '2024-11-01 14:00:00', 120.00, 'Neuf'),
(2, 'Bracelet en perles', 'Bracelet artisanal en perles naturelles.', '2024-11-05 10:00:00', 45.00, 'Neuf'),
(3, 'Montre vintage', 'Montre à gousset du XIXe siècle.', '2024-11-10 16:30:00', 300.00, 'Très bon état'),
(4, 'Table ancienne', 'Petite table en bois datant de 1920.', '2024-11-15 09:45:00', 150.00, 'Bon état'),
(5, 'Lampe de mineur ancienne', 'Lampe utilisée dans les mines de charbon en Wallonie.', '2024-11-01 09:00:00', 85.00, 'Très bon état'),
(6, 'Livre ancien de recettes', 'Livre de cuisine wallonne du début du XXe siècle.', '2024-11-03 14:00:00', 25.00, 'Bon état'),
(7, 'Panier en osier', 'Panier tressé à la main, idéal pour le marché.', '2024-11-06 11:00:00', 30.00, 'Neuf'),
(8, 'Peinture d’un paysage rural', 'Tableau représentant les champs de Namur.', '2024-11-08 15:30:00', 120.00, 'Très bon état'),
(9, 'Bureau en chêne massif', 'Bureau traditionnel wallon, fin XIXe siècle.', '2024-11-10 09:30:00', 400.00, 'Très bon état'),
(10, 'Coffret à bijoux', 'Coffret artisanal en bois décoré.', '2024-11-12 16:00:00', 50.00, 'Bon état'),
(11, 'Moulin à café vintage', 'Petit moulin en métal des années 1930.', '2024-11-14 10:30:00', 60.00, 'Bon état'),
(12, 'Statue en bronze', 'Petite sculpture représentant un sanglier.', '2024-11-17 13:15:00', 250.00, 'Très bon état'),
(13, 'Vélo de course ancien', 'Vélo de compétition des années 1970.', '2024-11-19 12:45:00', 180.00, 'Bon état'),
(14, 'Horloge murale rustique', 'Horloge en bois sculpté à la main.', '2024-11-20 15:00:00', 90.00, 'Très bon état'),
(15, 'Service à thé en porcelaine', 'Service complet pour 6 personnes, motifs floraux.', '2024-11-22 10:00:00', 120.00, 'Très bon état'),
(16, 'Veste en cuir vintage', 'Veste en cuir noir des années 1980.', '2024-11-23 17:30:00', 70.00, 'Bon état'),
(17, 'Chaise en rotin', 'Chaise confortable tressée à la main.', '2024-11-24 08:30:00', 40.00, 'Bon état'),
(18, 'Collection de timbres belges', 'Timbres rares de la période 1900-1950.', '2024-11-26 14:15:00', 300.00, 'Très bon état'),
(19, 'Porte-bouteilles en métal', 'Porte-bouteilles pouvant contenir 12 bouteilles.', '2024-11-27 16:45:00', 35.00, 'Neuf'),
(20, 'Robe de mariée ancienne', 'Robe en dentelle des années 1940.', '2024-11-29 11:00:00', 200.00, 'Très bon état'),
(21, 'Couteau de poche', 'Couteau pliant artisanal avec manche en bois.', '2024-12-01 09:30:00', 25.00, 'Bon état'),
(2, 'Tapis berbère', 'Tapis tissé à la main avec des motifs colorés.', '2024-12-03 15:45:00', 180.00, 'Neuf'),
(2, 'Lampe à pétrole', 'Lampe vintage en verre et métal.', '2024-12-05 13:30:00', 70.00, 'Très bon état'),
(5, 'Carafe en cristal', 'Carafe pour vin ou eau, design classique.', '2024-12-06 10:15:00', 90.00, 'Très bon état'),
(6, 'Fer à repasser ancien', 'Fer à repasser en fonte des années 1920.', '2024-12-07 14:00:00', 40.00, 'Bon état'),
(7, 'Lustre en fer forgé', 'Lustre artisanal pour une décoration rustique.', '2024-12-09 11:30:00', 150.00, 'Très bon état'),
(8, 'Cheval à bascule', 'Jouet en bois sculpté, idéal pour enfants.', '2024-12-10 16:00:00', 100.00, 'Bon état'),
(9, 'Livres d’histoire locale', 'Ensemble de 5 livres sur l’histoire de la Wallonie.', '2024-12-11 10:45:00', 60.00, 'Très bon état'),
(3, 'Vinyle rare', 'Disque vinyle d’un artiste belge des années 60.', '2024-12-12 18:15:00', 40.00, 'Très bon état'),
(13, 'Sac en cuir', 'Sac à bandoulière en cuir brun.', '2024-12-14 12:00:00', 80.00, 'Neuf'),
(20, 'Cage à oiseaux décorative', 'Cage en métal blanc pour une décoration intérieure.', '2024-12-15 14:30:00', 50.00, 'Très bon état'),
(3, 'Boîte à musique', 'Boîte à musique en bois avec une mélodie douce.', '2024-12-16 09:15:00', 35.00, 'Bon état'),
(4, 'Miroir ancien', 'Miroir avec un cadre en bois doré.', '2024-12-17 13:45:00', 120.00, 'Très bon état'),
(5, 'Jeu de quilles en bois', 'Jeu traditionnel en bois sculpté.', '2024-12-18 11:00:00', 40.00, 'Bon état'),
(6, 'Tablier brodé', 'Tablier en lin avec des motifs floraux.', '2024-12-19 17:00:00', 25.00, 'Neuf'),
(7, 'Set de couteaux de cuisine', 'Ensemble de couteaux en acier inoxydable.', '2024-12-20 08:30:00', 50.00, 'Neuf'),
(8, 'Table basse en marbre', 'Petite table avec un plateau en marbre blanc.', '2024-12-21 15:15:00', 250.00, 'Très bon état'),
(9, 'Lampe d’architecte', 'Lampe réglable pour bureau.', '2024-12-22 10:45:00', 70.00, 'Très bon état'),
(10, 'Livre sur la botanique', 'Guide illustré des plantes de Belgique.', '2024-12-23 12:30:00', 25.00, 'Très bon état'),
(11, 'Machine à écrire', 'Machine à écrire vintage en parfait état de marche.', '2024-12-24 14:45:00', 150.00, 'Très bon état'),
(12, 'Set de verres à vin', 'Lot de 6 verres en cristal.', '2024-12-25 11:15:00', 75.00, 'Neuf'),
(13, 'Pochette en soie', 'Pochette brodée à la main.', '2024-12-26 13:00:00', 40.00, 'Très bon état'),
(14, 'Boîte à thé en métal', 'Boîte avec des motifs traditionnels.', '2024-12-27 16:30:00', 20.00, 'Bon état'),
(15, 'Table ancienne 2', 'Petite table en bois datant de 1920.', '2024-11-15 09:45:00', 150.00, 'Bon état'),
(16, 'Lampe de mineur ancienne 2', 'Lampe utilisée dans les mines de charbon en Wallonie.', '2024-11-01 09:00:00', 85.00, 'Très bon état'),
(17, 'Livre ancien de recettes 2', 'Livre de cuisine wallonne du début du XXe siècle.', '2024-11-03 14:00:00', 25.00, 'Bon état'),
(18, 'Panier en osier 2', 'Panier tressé à la main, idéal pour le marché.', '2024-11-06 11:00:00', 30.00, 'Neuf'),
(19, 'Peinture d’un paysage rural2', 'Tableau représentant les champs de Namur.', '2024-11-08 15:30:00', 120.00, 'Très bon état'),
(10, 'Bureau en chêne massif2', 'Bureau traditionnel wallon, fin XIXe siècle.', '2024-11-10 09:30:00', 400.00, 'Très bon état'),
(11, 'Coffret à bijoux2', 'Coffret artisanal en bois décoré.', '2024-11-12 16:00:00', 50.00, 'Bon état'),
(2, 'Moulin à café vintage2', 'Petit moulin en métal des années 1930.', '2024-11-14 10:30:00', 60.00, 'Bon état'),
(13, 'Statue en bronze2', 'Petite sculpture représentant un sanglier.', '2024-11-17 13:15:00', 250.00, 'Très bon état'),
(4, 'Vélo de course ancien2', 'Vélo de compétition des années 1970.', '2024-11-19 12:45:00', 180.00, 'Bon état'),
(15, 'Horloge murale rustique2', 'Horloge en bois sculpté à la main.', '2024-11-20 15:00:00', 90.00, 'Très bon état'),
(16, 'Service à thé en porcelaine2', 'Service complet pour 6 personnes, motifs floraux.', '2024-11-22 10:00:00', 120.00, 'Très bon état'),
(17, 'Veste en cuir vintage2', 'Veste en cuir noir des années 1980.', '2024-11-23 17:30:00', 70.00, 'Bon état'),
(18, 'Chaise en rotin2', 'Chaise confortable tressée à la main.', '2024-11-24 08:30:00', 40.00, 'Bon état'),
(19, 'Collection de timbres belges2', 'Timbres rares de la période 1900-1950.', '2024-11-26 14:15:00', 300.00, 'Très bon état'),
(10, 'Porte-bouteilles en métal2', 'Porte-bouteilles pouvant contenir 12 bouteilles.', '2024-11-27 16:45:00', 35.00, 'Neuf'),
(1, 'Robe de mariée ancienne2', 'Robe en dentelle des années 1940.', '2024-11-29 11:00:00', 200.00, 'Très bon état'),
(2, 'Couteau de poche2', 'Couteau pliant artisanal avec manche en bois.', '2024-12-01 09:30:00', 25.00, 'Bon état'),
(3, 'Piano droit2', 'Piano d’étude en acajou.', '2024-12-02 18:00:00', 600.00, 'Très bon état'),
(4, 'Tapis berbère2', 'Tapis tissé à la main avec des motifs colorés.', '2024-12-03 15:45:00', 180.00, 'Neuf'),
(21, 'Lampe à pétrole2', 'Lampe vintage en verre et métal.', '2024-12-05 13:30:00', 70.00, 'Très bon état'),
(1, 'Carafe en cristal2', 'Carafe pour vin ou eau, design classique.', '2024-12-06 10:15:00', 90.00, 'Très bon état'),
(7, 'Fer à repasser ancien2', 'Fer à repasser en fonte des années 1920.', '2024-12-07 14:00:00', 40.00, 'Bon état'),
(8, 'Lustre en fer forgé2', 'Lustre artisanal pour une décoration rustique.', '2024-12-09 11:30:00', 150.00, 'Très bon état'),
(9, 'Cheval à bascule2', 'Jouet en bois sculpté, idéal pour enfants.', '2024-12-10 16:00:00', 100.00, 'Bon état'),
(10, 'Livres d’histoire locale2', 'Ensemble de 5 livres sur l’histoire de la Wallonie.', '2024-12-11 10:45:00', 60.00, 'Très bon état'),
(11, 'Vinyle rare2', 'Disque vinyle d’un artiste belge des années 60.', '2024-12-12 18:15:00', 40.00, 'Très bon état'),
(12, 'Sac en cuir2', 'Sac à bandoulière en cuir brun.', '2024-12-14 12:00:00', 80.00, 'Neuf'),
(13, 'Cage à oiseaux décorative2', 'Cage en métal blanc pour une décoration intérieure.', '2024-12-15 14:30:00', 50.00, 'Très bon état'),
(14, 'Boîte à musique2', 'Boîte à musique en bois avec une mélodie douce.', '2024-12-16 09:15:00', 35.00, 'Bon état'),
(15, 'Miroir ancien2', 'Miroir avec un cadre en bois doré.', '2024-12-17 13:45:00', 120.00, 'Très bon état'),
(16, 'Jeu de quilles en bois2', 'Jeu traditionnel en bois sculpté.', '2024-12-18 11:00:00', 40.00, 'Bon état'),
(17, 'Tablier brodé2', 'Tablier en lin avec des motifs floraux.', '2024-12-19 17:00:00', 25.00, 'Neuf'),
(18, 'Set de couteaux de cuisine2', 'Ensemble de couteaux en acier inoxydable.', '2024-12-20 08:30:00', 50.00, 'Neuf'),
(19, 'Table basse en marbre2', 'Petite table avec un plateau en marbre blanc.', '2024-12-21 15:15:00', 250.00, 'Très bon état'),
(20, 'Lampe d’architecte2', 'Lampe réglable pour bureau.', '2024-12-22 10:45:00', 70.00, 'Très bon état'),
(21, 'Livre sur la botanique2', 'Guide illustré des plantes de Belgique.', '2024-12-23 12:30:00', 25.00, 'Très bon état'),
(13, 'Set de verres à vin2', 'Lot de 6 verres en cristal.', '2024-12-25 11:15:00', 75.00, 'Neuf'),
(14, 'Pochette en soie2', 'Pochette brodée à la main.', '2024-12-26 13:00:00', 40.00, 'Très bon état');


