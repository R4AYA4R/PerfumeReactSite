import { IPerfumesData } from "../types/types";

interface IPerfumeProps{
    perfume:IPerfumesData
}

const PerfumeItem = ({perfume}:IPerfumeProps) => {
    return (
        <div className="mainBlock__perfumesBlock-item">
            <img src="/images/sectionPerfumes/Rectangle 1142.png" alt="" className="perfumesBlock__item-img" />
            <h2 className="perfumesBlock__item-title">{perfume.title}</h2>
            <p className="perfumesBlock__item-text">Luminizing Clay</p>
            {/* <div className="perfumesBlock__countBlock">
                <button className="perfumesBlock__countBlock-btnPlus">{'+'}</button>
                <input type="number" className="perfumesBlock__item-inputCount" min="1" max="100" />
                <button className="perfumesBlock__countBlock-btnMinus">{'-'}</button>
            </div> */}
            <p className="perfumesBlock__item-price">${perfume.price}</p>
            <button className="perfumesBlock__item-btn">Add to Cart</button>
        </div>
    )
}

export default PerfumeItem;