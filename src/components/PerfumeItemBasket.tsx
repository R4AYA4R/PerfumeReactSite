
const PerfumeItemBasket = () => {
    return (
        <div className="sectionCart__table-product">
            <div className="table__product-itemFirstBlock">
                <img src="/images/sectionPerfumes/Rectangle 1142.png" alt="" className="table__product-img" />
                <div className="table__product-info">
                    <h2 className="product__info-title">Bulgari Extreme</h2>
                    <p className="product__info-subtitle">Luminizing Clay</p>
                    <p className="product__info-category">Spicy</p>
                </div>
            </div>
            <div className="table__product-priceBlock">
                <p className="table__product-price">$54.99</p>
            </div>
            <div className="table__product-amountBlock">
                <div className="product__amountBlock-amountInputBlock">
                    <input type="number" className="product__amountBlock-input" min="1" max="100" />
                    <button className="product__amountBlock-plusBtn">{'+'}</button>
                    <button className="product__amountBlock-minusBtn">{'-'}</button>
                </div>
            </div>
            <div className="table__product-totalPriceBlock">
                <p className="table__product-totalPrice">$54.99</p>
            </div>
            <div className="table__product-deleteBtnBlock">
                <button className="table__product-deleteBtn">{'x'}</button>
            </div>
        </div>
    )
}

export default PerfumeItemBasket;