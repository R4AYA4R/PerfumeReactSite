import { Link, NavLink } from "react-router-dom";
import { apiBasket } from "../store/apiBasket";

const Header = ()=>{

    const {data} = apiBasket.useGetAllPerfumesBasketQuery(null);

    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__inner-logo">
                        <img src="/images/header/Frame 2493.png" alt="" className="logo__img" />
                    </Link>
                    <ul className="header__inner-menu">
                        <li className="header__menu-item">
                            <NavLink to="/" className={({isActive}) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>HOME</NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink to="/perfumes" className={({isActive}) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>PERFUMES</NavLink>
                        </li>
                        <li className="header__menu-item">
                            <NavLink to="/cart" className={({isActive}) => isActive ? 'menu__item-link menu__item-linkCart menu__item-link--active' : 'menu__item-link menu__item-linkCart'}>
                                <img src="/images/header/Card.png" alt="" className="menu__link-img" />
                                <span className="menu__link-spanCart">{data?.length}</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;