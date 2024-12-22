const nlDictionary = {
    "date_format":"nl-NL",
    "home":"Home",
    "welcome":"Welkom bij de backoffice",
    "loading":"Laden...",
    "app_brocante":"AppBrocante - Beheermenu",
    "stats": {
        "title":"Aantal rommelmarkten per maand",
        "simple_title":"Statistieken",
        "month_start":"Beginmaand",
        "month_end":"Eindmaand"
    },
    "error":"Fout",
    "yes":"Ja",
    "no":"Nee",
    "table_no_data":"Opgelet, deze tabel is leeg!",
    "fleaMarketCountGraphLegend":"Aantal rommelmarkten",
    "tables":{
        "flea_market": {
            "title":"Rommelmarkt",
            "columns":{
                "id": "Rommelmarkt-ID",
                "address": "Adres",
                "date_start": "Begindatum",
                "date_end": "Einddatum",
                "title": "Titel",
                "theme": "Thema",
                "is_charity": "Liefdadigheid",
                "average_rating": "Gemiddelde beoordeling",
                "review_count": "Aantal beoordelingen"
            }
        },
        "slot": {
            "title":"Standplaats",
            "columns": {
                "id": "Standplaats-ID",
                "flea_market_id": "Rommelmarkt-ID",
                "is_available": "Beschikbaarheid",
                "area": "Oppervlakte"
            }
        },
        "user": {
            "title": "Gebruiker",
            "columns": {
                "id":"Gebruikers-ID",
                "name": "Naam",
                "first_name": "Voornaam",
                "last_name": "Achternaam",
                "address": "Adres",
                "phone_number": "Telefoonnummer",
                "email": "E-mail",
                "last_edit_date": "Laatste wijzigingsdatum",
                "password": "Wachtwoord",
                "profile_picture": "Profielfoto",
                "is_admin": "Is beheerder",
                "is_timed_out": "Is geblokkeerd",
                "recovery_code": "Herstelcode"
            }
        },
        "interest": {
            "title":"Interesse",
            "columns": {
                "flea_market_id": "Rommelmarkt-ID",
                "person_id": "Persoons-ID",
                "is_interested": "Is geïnteresseerd",
                "is_dealer": "Is handelaar",
                "participation": "Deelname"
            }
        },
        "dealer": {
            "title":"Handelaar",
            "columns":{
                "person_id": "Persoons-ID",
                "type": "Type",
                "description": "Beschrijving",
                "signup_date": "Inschrijfdatum",
                "average_rating": "Gemiddelde beoordeling",
                "review_count": "Aantal beoordelingen"
            }
        },
        "article": {
            "title":"Artikel",
            "columns":{
                "id": "Artikel-ID",
                "dealer_id": "Handelaars-ID",
                "title": "Titel",
                "description": "Beschrijving",
                "entry_date": "Toevoegdatum",
                "cost": "Kosten",
                "condition": "Toestand"
            }
        }
    }
};

export default nlDictionary;