import "./NavItem.scss"
import * as Icons from "../../../Common/Icons/NavMenuIcons";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavItem(props) {
    const [showSubNav, setShowSubNav] = useState(false);

    return (
        <div>
            <Link
                className="nav-item"
                to={props.to}
                onClick={() => setShowSubNav(!showSubNav)}
            >
                <div className={props.collapsed ? "icon" : ""}>{props.icon}</div>
                {!props.collapsed ?
                    (
                        <>
                            <div className="title caption1">{props.title}</div>
                            {props.children.length > 0 ?
                                (<div>{showSubNav ? <Icons.NavLeftIcon /> : <Icons.NavDownIcon />}</div>

                                ) : ""}
                        </>
                    ) : ""}
            </Link>
            {props.children.length > 0 && showSubNav == true && !props.collapsed ?
                (
                    <>
                        {props.children.map(child => (
                            <Link
                                className="sub-nav caption2"
                                key={child.title}
                                to={child.to}
                            >
                                {child.title}
                            </Link>
                        ))}
                    </>
                ) : ""}
        </div>
    );
}

export default NavItem;