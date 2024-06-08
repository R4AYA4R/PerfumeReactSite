import { apiBasket } from "../store/apiBasket";
import { IPerfumesData } from "../types/types";

interface IPerfumeProps{
    perfume:IPerfumesData
}

const PerfumeItem = ({perfume}:IPerfumeProps) => {

    const [addPerfumesBasket] = apiBasket.useAddPerfumesBasketMutation();// берем функцию запроса на сервер из нашего api(apiBasket) с помощью нашего хука useAddProductsBasketMutation,вторым элементом,который можно взять у этого хука,это все состояния,которые rtk query автоматически создает,а также data(данные запроса)

    const {data} = apiBasket.useGetAllPerfumesBasketQuery(null); // делаем запрос на сервер для получения всех объектов в корзине,чтобы сделать проверку на существующий товар в корзине

    const isExistsBasket = data?.some(p => p.title === perfume.title); // делаем проверку методом some и результат записываем в переменную isExistsBasket,если в data(в массиве объектов корзины) есть элемент title которого равен perfume title(perfume - объект, который мы передали в пропсы этого компонента)

    const handleAddPerfumeBasket = async () => {
        await addPerfumesBasket({title:perfume.title,category:perfume.category,price:perfume.price,count:perfume.count,totalPrice:perfume.totalPrice} as IPerfumesData); // передаем в addPerfumesBasket объект типа IPerfumesData только таким образом,разворачивая в объект все необходимые поля(то есть наш perfume,в котором полe title,делаем поле title со значением,как и у этого perfume и остальные поля также),указываем тип этого объекта, созданный нами тип IPerfumesData,при создании на сервере не указываем конкретное значение id,чтобы он сам автоматически генерировался на сервере и потом можно было удалить этот объект
    }

    return (
        <div className="mainBlock__perfumesBlock-item">
            <img src="/images/sectionPerfumes/Rectangle 1142.png" alt="" className="perfumesBlock__item-img" />
            <h2 className="perfumesBlock__item-title">{perfume.title}</h2>
            <p className="perfumesBlock__item-text">Luminizing Clay</p>
            <p className="perfumesBlock__item-category">{perfume.category}</p>
            <p className="perfumesBlock__item-price">${perfume.price}</p>

            {isExistsBasket ? 
                <h3 className="perfumesBlock__cartTitle">Already in Cart</h3>
                :
                <button className="perfumesBlock__item-btn" onClick={handleAddPerfumeBasket}>Add to Cart</button>
            }
            
        </div>
    )
}

export default PerfumeItem;