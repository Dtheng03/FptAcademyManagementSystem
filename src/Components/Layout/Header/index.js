import "./Header.scss"
import { Avatar } from "antd";

function Header() {
    return (
        <header className="header">
            <div className="logo" />
            <div className="body">
                <div className="mini-logo">
                    <div className="gate-logo" />
                    <span className="caption2">uniGate</span>
                </div>
                <div className="user">
                    <Avatar size={"large"} />
                    <div className="action">
                        <p className="caption1">Warrior Tran</p>
                        <p className="caption2">Log out</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;