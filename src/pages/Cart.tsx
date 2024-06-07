import PerfumeItemBasket from "../components/PerfumeItemBasket";

const Cart=()=>{
    return(
        <main className="main">
            <div className="container">
                <section className="sectionCart">
                    <div className="sectionCart__inner">
                        <p className="sectionCart__subtitle">
                            Home {'>'} Perfumes {'>'} Shopping Cart
                        </p>
                        <h1 className="sectionCart__title">Shopping Cart</h1>
                        <div className="sectionCart__table">
                            <ul className="sectionCart__table-list">
                                <li className="table__list-item">
                                    <p className="table__item-title">Product</p>
                                </li>
                                <li className="table__list-item">
                                    <p className="table__item-title">Price</p>
                                </li>
                                <li className="table__list-item">
                                    <p className="table__item-title">Amount</p>
                                </li>
                                <li className="table__list-item">
                                    <p className="table__item-title">Total</p>
                                </li>
                            </ul>

                            <PerfumeItemBasket/>

                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Cart;