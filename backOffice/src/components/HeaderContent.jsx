//css présent dans navbar.css
// HeaderContent car Header est un element pré-existant de react
import "./HeaderContent.css";

function HeaderContent () {
    return (
        <>
            <div className="headerContent">
                <img src="/logo.png" alt="logo" />
                <h2>AppBrocante - Menu Administrateur</h2>
            </div>
        </>
    )
}

export default HeaderContent;