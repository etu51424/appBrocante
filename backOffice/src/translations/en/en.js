const enDictionary = {
    "home":"Home",
    "tables":{
        "flea_market": {
            "title":"Flea Market",
            "columns": {
                "id":"Flea Market ID",
                "address":"Address",
                "date_start":"Starting Date",
                "date_end":"Ending Date",
                "title":"Title",
                "theme":"Theme",
                "is_charity":"Charity",
                "average_rating":"Average Rating",
                "review_count":"Review Count"
            }
        },
        "slot":{
            "title":"Slot",
            "columns": {
                "id":"Slot ID",
                "flea_market_id":"Flea Market ID",
                "is_available":"Availability",
                "area":"Area"
            }
        },
        "user": {
            "title":"User",
            "columns": {
                "id":"Person ID",
                "name":"Name",
                "first_name":"First Name",
                "last_name":"Last Name",
                "address":"Address",
                "phone_number": "Phone Number",
                "email": "Email",
                "last_edit_date": "Last Edit Date",
                "password": "Password",
                "profile_picture": "Profile Picture",
                "is_admin": "Is Admin",
                "is_timed_out": "Is Timed Out",
                "recovery_code": "Recovery Code"
            }
        },
        "interest": {
            "title":"Interest",
            "columns": {
                "flea_market_id": "Flea Market ID",
                "person_id": "Person ID",
                "is_interested": "Is Interested",
                "is_dealer": "Is Dealer",
                "participation": "Participation"
            }
        },
        "dealer": {
            "title":"Dealer",
            "columns": {
                "person_id": "Person ID",
                "type": "Type",
                "description": "Description",
                "signup_date": "Signup Date",
                "average_rating": "Average Rating",
                "review_count": "Review Count"
            }
        },
        "article": {
            "title":"Article",
            "columns": {
                "id": "Article ID",
                "dealer_id": "Dealer ID",
                "title": "Title",
                "description": "Description",
                "entry_date": "Entry Date",
                "cost": "Cost",
                "condition": "Condition"
            }
        }
    }
};

export default enDictionary;