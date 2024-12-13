import { React } from "react";
import Page from "./Page.jsx";
import { usersData } from "../fetchAPI/CRUD/users.js";

function Users() {

    const title = "Users";
    const elementClassNameSingular = "user";
    const elementClassNamePlural = "users";

    // async car du pov de Page.jsx, fetcher data reste une opération I/O
    const fetchUsers = async () => {
        return usersData;
    };

// dataElem.map(dataElem => //react requiert une clé unique pour chaque enfant d'un appel à map() car ils sont dynamiquement générés
    const renderTableBody = (user) => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.address}</td>
                <td>{user.phone_number}</td>
                <td>{user.email}</td>
                <td>{user.last_edite_date}</td>
                <td>{user.password}</td>
                <td>{user.profile_picture}</td>
                <td>{user.is_admin}</td>
                <td>{user.is_timed_out}</td>
                <td>{user.recovery_code}</td>
            </tr>
        );
    }

    // renvoit le rendu d'une page auquel on passe les parties personnalisées via props (paramètres)
    return <Page 
        fetchElementsData={fetchUsers}
        renderTableBody={renderTableBody}
        title={title}
        elementClassNameSingular={elementClassNameSingular}
        elementClassNamePlural={elementClassNamePlural}
    />;
}

export default Users;

