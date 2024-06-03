
const Header = ()=>{
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <a href="#" className="header__inner-logo">
                        <img src="/images/header/Frame 2493.png" alt="" className="logo__img" />
                    </a>
                    <ul className="header__inner-menu">
                        <li className="header__menu-item">
                            <a href="#" className="menu__item-link">HOME</a>
                        </li>
                        <li className="header__menu-item">
                            <a href="#" className="menu__item-link">PERFUMES</a>
                        </li>
                        <li className="header__menu-item">
                            <a href="#" className="menu__item-link menu__item-linkCart">
                                <img src="/images/header/Card.png" alt="" className="menu__link-img" />
                                <span className="menu__link-spanCart">0</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;