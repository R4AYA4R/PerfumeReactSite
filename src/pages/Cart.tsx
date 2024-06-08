import { useEffect, useState } from "react";
import PerfumeItemBasket from "../components/PerfumeItemBasket";
import { apiBasket } from "../store/apiBasket";
import { IPerfumesData } from "../types/types";

const Cart=()=>{

    const [totalCheck,setTotalCheck] = useState<number>();

    const {data} = apiBasket.useGetAllPerfumesBasketQuery(null); // указываем нашу функцию запроса на сервер(в данном случае это getAllPerfumesBasket),который rtk query автоматически создал для нашего эндпоинта,берем поля из rtk query(в данном случае из нашего эндпоинта берем поля,которые автоматически создает rtk query(isLoading,data-данные запроса на сервер)),указываем null в параметре useGetAllProductsBasketQuery,так как используем typescript,можно указать undefined

    const dataCheck = data?.reduce((prev:any,curr:any)=>prev + curr.count * curr.price,0); // проходимся по массиву объектов корзины и на каждой итерации увеличиваем переменную prev(это число,и мы указали,что в начале оно равно 0 и оно будет увеличиваться на каждой итерации массива объектов,запоминая старое состояние числа и увеличивая его на новое значение) на curr(текущий итерируемый объект).count * curr.price,это чтобы посчитать общую сумму цены всех товаров

    useEffect(()=>{
        setTotalCheck(dataCheck);
    },[data])

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

                            <div className="sectionCar__table-perfumesItems">
                                {data?.length ? 
                                    data.map(perfume=>
                                        <PerfumeItemBasket key={perfume.id} perfume={perfume}/>
                                    ) : <h2 className="perfumesItems__titleEmpty">Cart is empty</h2>
                                }
                            </div>
                            
                        </div>
                        <div className="sectionCart__totalCheckBlock">
                            {/* если товары в корзине есть,то показываем текст,в другом случае пустая строка(то есть не показываем),если не указать другой случай пустая строка,то вместо текста будет показан 0,для totalCheck используем toFixed(2),чтобы показывало число максимум 2 точки после запятой */}
                            {data?.length ?
                                <h3 className="totalCheck__title">Total Check: ${totalCheck?.toFixed(2)}</h3>
                                : ''
                            }
                             
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Cart;