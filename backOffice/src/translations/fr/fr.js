const frDictionary = {
    "home":"Accueil",
    "welcome":"Bienvenue sur le back-office",
    "loading":"Chargement...",
    "app_brocante":"AppBrocante - Menu Administrateur",
    "graph_title":"Nombre de brocantes par mois",
    "tables":{
        "flea_market": {
            "title":"Brocante",
            "columns":{
                "id": "Identifiant Brocante",
                "address": "Adresse",
                "date_start": "Date de début",
                "date_end": "Date de fin",
                "title": "Titre",
                "theme": "Thème",
                "is_charity": "Charité",
                "average_rating": "Avis moyen",
                "review_count": "Nombre d'avis"
            }
        },
        "slot": {
            "title":"Emplacement",
            "columns": {
                "id": "Identifiant Emplacement",
                "flea_market_id": "Identifiant Brocante",
                "is_available": "Disponibilité",
                "area": "Superficie"
            }
        },
        "user": {
            "title": "Utilisateur",
            "columns": {
                "name": "Nom",
                "first_name": "Prénom",
                "last_name": "Nom de famille",
                "address": "Adresse",
                "phone_number": "Numéro de téléphone",
                "email": "Email",
                "last_edit_date": "Date de dernière modification",
                "password": "Mot de passe",
                "profile_picture": "Photo de profil",
                "is_admin": "Est administrateur",
                "is_timed_out": "Est bloqué",
                "recovery_code": "Code de récupération"
            }
        },
        "interest": {
            "title":"Intérêt",
            "columns": {
                "flea_market_id": "Identifiant Brocante",
                "person_id": "Identifiant Personne",
                "is_interested": "Est intéressé",
                "is_dealer": "Est brocanteur",
                "participation": "Participation"
            }
        },
        "dealer": {
            "title":"Brocanteur",
            "columns":{
                "person_id": "Identifiant Personne",
                "type": "Type",
                "description": "Description",
                "signup_date": "Date d'inscription",
                "average_rating": "Avis moyen",
                "review_count": "Nombre d'avis"
            }
        },
        "article": {
            "title":"Article",
            "columns":{
                "id": "Identifiant Article",
                "dealer_id": "Identifiant Commerçant",
                "title": "Titre",
                "description": "Description",
                "entry_date": "Date d'ajout",
                "cost": "Coût",
                "condition": "État"
            }
        }
    }
};

export default frDictionary;