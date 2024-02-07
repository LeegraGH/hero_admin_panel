import character from "../../assets/character-icon.png";

const HeroesListItem = ({ name, description, element, onDelete }) => {

    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-success bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        <li
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src={character}
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ 'objectFit': 'cover', 'borderRadius': '5px' }} />
            <div className="card-body">

                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close" onClick={onDelete}></button>
            </span>
        </li>
    )
}

export default HeroesListItem;