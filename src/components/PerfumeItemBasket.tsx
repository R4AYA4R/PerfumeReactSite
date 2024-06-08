import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { apiBasket } from "../store/apiBasket";
import { IPerfumesData } from "../types/types";

interface IPerfumeItemBasketProps{
    perfume:IPerfumesData;
}

const PerfumeItemBasket = ({perfume}:IPerfumeItemBasketProps) => {

    const [totalPrice,setTotalPrice] = useState<number | undefined>();

    const {data} = apiBasket.useGetAllPerfumesBasketQuery(null);

    const [deletePerfumeBasket] = apiBasket.useDeletePerfumeBasketMutation();

    const [updatePerfumeBasketCount] = apiBasket.useUpdatePerfumeBasketCountMutation();

    const changeInputValue=async(e:ChangeEvent<HTMLInputElement>)=>{
        // если текущее значение инпута больше 100,то изменяем данные на сервере,изменяем поле perfume.count на значение 100 и изменяем состояние totalPrice,это чтобы нельзя было ввести значение больше 100,проверки ниже аналогичные
        if(+e.target.value > 100){
            await updatePerfumeBasketCount({...perfume,count:100}); // разворачиваем в объект все поля perfume и изменяем поле count на +e.target.value(ставим + перед e.target.value,чтобы перевести e.target.value в тип number) и таким образом обновляем поле perfume.count на сервере,прописываем await в этой асинхронной функции changeInputValue,чтобы код ниже работал только после завершения работы функции updatePerfumeBasketCount

            setTotalPrice(perfume.count * perfume.price); // изменяем состояние totalPrice на perfume.count *(умножить) на perfume.price
        }else if(+e.target.value <= 0){
            await updatePerfumeBasketCount({...perfume,count:0}); // разворачиваем в объект все поля perfume и изменяем поле count на +e.target.value(ставим + перед e.target.value,чтобы перевести e.target.value в тип number) и таким образом обновляем поле perfume.count на сервере,прописываем await в этой асинхронной функции changeInputValue,чтобы код ниже работал только после завершения работы функции updatePerfumeBasketCount

            setTotalPrice(perfume.count * perfume.price); // изменяем состояние totalPrice на perfume.count *(умножить) на perfume.price
        }else{
            await updatePerfumeBasketCount({...perfume,count:+e.target.value}); // разворачиваем в объект все поля perfume и изменяем поле count на +e.target.value(ставим + перед e.target.value,чтобы перевести e.target.value в тип number) и таким образом обновляем поле perfume.count на сервере,прописываем await в этой асинхронной функции changeInputValue,чтобы код ниже работал только после завершения работы функции updatePerfumeBasketCount

            setTotalPrice(perfume.count * perfume.price); // изменяем состояние totalPrice на perfume.count *(умножить) на perfume.price
        }
        
    }  
    
    // изменяем состояние totalPrice при изменении data(при изменении объектов в корзине,чтобы при изменении поля perfume.count все считалось корректно и без задержки)
    useEffect(()=>{
        setTotalPrice(perfume.count * perfume.price);
    },[data])

    const handlePlusBtn=async()=>{
        if(perfume.count < 99 && perfume.count >= 0){
            await updatePerfumeBasketCount({...perfume,count:perfume.count + 1}); // делаем запрос на сервер,изменяя данные,разворачиваем в объект все поля perfume и изменяем поле count на perfume.count + 1

            setTotalPrice(perfume.count * perfume.price); // изменяем состояние totalPrice на perfume.count *(умножить) на perfume.price
        }else{
            await updatePerfumeBasketCount({...perfume,count:100});
        }
        
    }

    const handleMinusBtn=async()=>{
        if(perfume.count >= 1){
            await updatePerfumeBasketCount({...perfume,count:perfume.count - 1}); 

            setTotalPrice(perfume.count * perfume.price); // изменяем состояние totalPrice на perfume.count *(умножить) на perfume.price
        }else{
            await updatePerfumeBasketCount({...perfume,count:0});
        }
        
    }

    return (
        <div className="sectionCart__table-product">
            <div className="table__product-itemFirstBlock">
                <img src="/images/sectionPerfumes/Rectangle 1142.png" alt="" className="table__product-img" />
                <div className="table__product-info">
                    <h2 className="product__info-title">{perfume.title}</h2>
                    <p className="product__info-subtitle">Luminizing Clay</p>
                    <p className="product__info-category">{perfume.category}</p>
                </div>
            </div>
            <div className="table__product-priceBlock">
                <p className="table__product-price">${perfume.price}</p>
            </div>
            <div className="table__product-amountBlock">
                <div className="product__amountBlock-amountInputBlock">
                    <input type="number" className="product__amountBlock-input" min="1" max="100" value={perfume.count} onChange={changeInputValue}/>
                    <button className="product__amountBlock-plusBtn" onClick={handlePlusBtn}>{'+'}</button>
                    <button className="product__amountBlock-minusBtn" onClick={handleMinusBtn}>{'-'}</button>
                </div>
            </div>
            <div className="table__product-totalPriceBlock">
                <p className="table__product-totalPrice">${totalPrice?.toFixed(2)}</p> {/* используем toFixed(2),чтобы число показвало максимум 2 цифры после запятой */}
            </div>
            <div className="table__product-deleteBtnBlock">
                <button className="table__product-deleteBtn" onClick={()=>deletePerfumeBasket(perfume)}>{'x'}</button>
            </div>
        </div>
    )
}

export default PerfumeItemBasket;