

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__top">
                        <div className="footer__customer-support">
                            <h1 className="customer__support-title">CUSTOMER SUPPORT</h1>
                            <ul className="customer__support-list">
                                <li className="customer__support-item">
                                    <a href="#" className="customer__support-link">Gift Certificates</a>
                                </li>
                                <li className="customer__support-item">
                                    <a href="#" className="customer__support-link">Gift Certificate Balance</a>
                                </li>
                                <li className="customer__support-item">
                                    <a href="#" className="customer__support-link">Accessibility Policy</a>
                                </li>
                                <li className="customer__support-item">
                                    <a href="#" className="customer__support-link">Terms of Use</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__quickLinks">
                            <h2 className="footer__quickLinks-title">Quick Links</h2>
                            <ul className="footer__quickLinks-list">
                                <li className="footer__quickLinks-item">
                                    <a href="#" className="footer__quickLinks-link">Home</a>
                                </li>
                                <li className="footer__quickLinks-item">
                                    <a href="#" className="footer__quickLinks-link">Perfumes</a>
                                </li>
                                <li className="footer__quickLinks-item">
                                    <a href="#" className="footer__quickLinks-link">Cart</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__bottom-info">
                            <p className="footer__bottom-text">PerfumeShop.com is an independent retailer carrying genuine brand name Perfumes, skincare, haircare, candles and makeup.
                            PerfumeShop and PerfumeShop.com are trademarks of PerfumeShop, Inc. and are Registered in the US Patent & Trademark Office.</p>
                            <p className="footer__rights">All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;