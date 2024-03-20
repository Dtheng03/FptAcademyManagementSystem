import styles from "./NavItem.module.scss";
import classNames from "classnames/bind";
import * as Icons from "../../../Common/Icons/NavMenuIcons";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function NavItem(props) {
    const [showSubNav, setShowSubNav] = useState(false);

    return (
        <div>
            {props.to !== "" ?
                <Link
                    className={cx("nav-item")}
                    to={props.to}
                    onClick={() => setShowSubNav(!showSubNav)}
                >
                    <div className={props.collapsed ? cx("icon") : ""}>{props.icon}</div>
                    {!props.collapsed &&
                        (
                            <>
                                <div className={cx("title")}>{props.title}</div>
                                {props.children.length > 0 ?
                                    (<div>{showSubNav ? <Icons.NavLeftIcon /> : <Icons.NavDownIcon />}</div>

                                    ) : ""}
                            </>
                        )}
                </Link>
                :
                <div
                    className={cx("nav-item")}
                    onClick={() => setShowSubNav(!showSubNav)}
                >
                    <div className={props.collapsed ? cx("icon") : ""}>{props.icon}</div>
                    {!props.collapsed &&
                        (
                            <>
                                <div className={cx("title")}>{props.title}</div>
                                {props.children.length > 0 ?
                                    (<div>{showSubNav ? <Icons.NavLeftIcon /> : <Icons.NavDownIcon />}</div>

                                    ) : ""}
                            </>
                        )}
                </div>
            }
            {(props.children.length > 0 && showSubNav == true && !props.collapsed) &&
                (
                    <>
                        {props.children.map(child => (
                            <Link
                                className={cx("sub-nav")}
                                key={child.title}
                                to={child.to != "" && child.to}
                            >
                                {child.title}
                            </Link>
                        ))}
                    </>
                )}
        </div>
    );
}

export default NavItem;