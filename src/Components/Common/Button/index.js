import "./Button.scss"

function Button({ title, firstIcon, secondIcon, type = "normal", onClick = () => { } }) {

    return (
        <button
            className={`btn btn-lg ${type}`}
            onClick={onClick}
        >
            {firstIcon}
            {title && <span className="title">{title}</span>}
            {secondIcon}
        </button>
    );
}

export default Button;