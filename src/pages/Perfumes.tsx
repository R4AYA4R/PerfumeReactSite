import { useQuery } from "@tanstack/react-query";
import PerfumeItem from "../components/PerfumeItem";
import axios from "axios";
import { IPerfumesData } from "../types/types";
import { ChangeEvent, useEffect, useState } from "react";
import { getPagesArray } from "../utils/getPagesArray";

const Perfumes = () => {

    const [page, setPage] = useState(1); // состояние для страницы,на какой странице сейчас пользователь

    const [limit, setLimit] = useState<number>(4); // состояние для лимита страниц

    const [totalPages, setTotalPages] = useState(0); // состояние для общего количества страниц

    const [searchValue, setSearchValue] = useState('');

    // делаем еще один запрос уже без лимита,чтобы отобразить все товары без лимита
    const {data:dataWithoutLimit,refetch:refetchWithoutLimit} = useQuery({
        queryKey:['perfumesWithoutLimit'],
        queryFn:async () => {
            const response = await axios.get<IPerfumesData[]>(`http://localhost:5000/perfumes?title_like=${searchValue}`);

            return response;
        }
    })

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['perfumes'],
        queryFn: async () => {
            const response = await axios.get<IPerfumesData[]>(`http://localhost:5000/perfumes?title_like=${searchValue}`, {
                params: {
                    _limit: limit,
                    _page: page
                }
            }); // на своем json server не работает поиск по title_like пока что,потому что его не сделали еще в последней версии json server,нужно установить версию 0.17.4 json-server,чтобы работало 

            const totalCount = data?.headers['x-total-count']; // записываем общее количество объектов(в данном случае объектов для порфюмов),полученных от сервера в переменную

            setTotalPages(Math.ceil(totalCount / limit)); //с помощью Math.ceil округляем получившееся значение в большую сторону,например,если элементов 105,а лимит 10,то округляем получившееся деление до 11,чтобы получить 11 страниц и вывести потом оставшиеся элементы на эту (11-ую в данном случае) страницу

            return response;
        }
    })

    const filteredSpicy = dataWithoutLimit?.data.filter(p => p.category === 'Spicy'); // фильтруем полученный от сервера массив данных(массив объектов наших порфюмов),оставляем в массиве только те,у которых поле category = 'Spicy',и помещаем этот отфильтрованый массив в переменную

    const filteredSweet = dataWithoutLimit?.data.filter(p => p.category === 'Sweet');

    const filteredBitter = dataWithoutLimit?.data.filter(p => p.category === 'Bitter');

    const filteredVigorous = dataWithoutLimit?.data.filter(p => p.category === 'Vigorous');

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setPage(1);
    }

    const prevPage = ()=>{
        // если текущая страница больше или равна 2
        if(page >= 2){
            setPage((prev)=> prev - 1); // изменяем состояние текущей страницы на - 1(то есть в setPage берем prev(предыдущее значение,то есть текущее) и отнимаем 1)
        }
    }

    const nextPage = ()=>{
        // если текущая страница меньше или равна общему количеству страниц - 1(чтобы после последней страницы не переключалось дальше)
        if(page <= totalPages - 1){
            setPage((prev)=> prev + 1); // изменяем состояние текущей страницы на + 1(то есть в setPage берем prev(предыдущее значение,то есть текущее) и прибавляем 1)
        }
    }

    // делаем запрос через useQuery еще раз,при изменении page(состояния текущей страницы),и data?.data (массив пользователей),и изменении инпута поиска
    useEffect(() => {

        refetch();

        refetchWithoutLimit(); // обновляем данные о всех товарах без лимита

    }, [searchValue, page, data?.data])

    let pagesArray = getPagesArray(totalPages, page);

    return (
        <main className="main">
            <div className="container">
                <section className="sectionPerfumes">
                    <div className="sectionPerfumes__inner">
                        <div className="sectionPerfumes__filterBar">
                            <h3 className="filterBar__title">Categories</h3>
                            <ul className="filterBar__list">
                                <li className="filterBar__list-item">
                                    <p className="filterBar__item-text">All ({dataWithoutLimit?.data.length})</p>
                                </li>
                                <li className="filterBar__list-item">
                                    <p className="filterBar__item-text">Spicy ({filteredSpicy?.length})</p>
                                </li>
                                <li className="filterBar__list-item">
                                    <p className="filterBar__item-text">Sweet ({filteredSweet?.length})</p>
                                </li>
                                <li className="filterBar__list-item">
                                    <p className="filterBar__item-text">Bitter ({filteredBitter?.length})</p>
                                </li>
                                <li className="filterBar__list-item">
                                    <p className="filterBar__item-text">Vigorous ({filteredVigorous?.length})</p>
                                </li>
                            </ul>
                            <h4 className="filterBar__titleAbout">About Women`s perfume</h4>
                            <p className="filterBar__text">
                                The Only Place To Shop The Latest Designer Perfumes At Discounts Up To 80% Off Department Store Price.We Offer The Largest Selection Of The Latest Brand Name Perfumes And Discount Perfume Products.Shop And Save On All Women`s Perfume Today.
                            </p>
                        </div>
                        <div className="sectionPerfumes__mainBlock">
                            <div className="sectionPerfuems__mainBlock-info">
                                <p className="mainBlock__info-subtitle">Home {'>'} Perfumes</p>
                                <h1 className="mainBlock__info-title">Women`s perfume</h1>
                                <p className="mainBlock__info-text">The Only Place To Shop The Latest Designer Perfumes At Discounts Up To 80% Off Department Store Price.We Offer The Largest Selection Of The Latest Brand Name Perfumes And Discount Perfume Products.Shop And Save On All Women`s Perfume Today.</p>
                            </div>
                            <div className="mainBlock__searchBlock">
                                <p className="mainBlock__searchBlock-text">{dataWithoutLimit?.data.length} products</p>
                                <input type="text" className="mainBlock__searchBlock-input" placeholder="Search" value={searchValue} onChange={inputChangeHandler} />
                            </div>
                            <div className="mainBlock__perfumesBlock">
                                {
                                    isLoading ?
                                        <h5>Loading...</h5>
                                        :
                                        data?.data.length ? data?.data.map(perfume =>
                                            <PerfumeItem key={perfume.id} perfume={perfume} />
                                        ) : <h4>Not found</h4>
                                }
                            </div>

                            <div className="mainBlock__pages">

                                <button className="mainBlock__pages-prevPage"
                                onClick={prevPage}>
                                    {'<'}
                                </button>

                                {pagesArray.map(p =>
                                    <button
                                        key={p}

                                        onClick={() => setPage(p)} // отслеживаем на какую кнопку нажал пользователь и делаем ее активной,передаем в функцию changePage значение элемента массива pagesArray(то есть страницу,на которую нажал пользователь)

                                        className={page === p ? 'mainBlock__pages-page mainBlock__pages-page--active' : 'mainBlock__pages-page'} //если состояние номера страницы page равно значению элементу массива pagesArray,то отображаем такие классы,в другом случае другие
                                    >
                                        {p}
                                    </button>
                                )}


                                {/* если общее количество страниц больше 3 и текущая страница меньше общего количества страниц - 1,то отображаем три точки */}
                                {totalPages > 5 && page < totalPages - 2 && <div className="mainBlock__pages-dots">...</div>}

                                {/* если общее количество страниц больше 3 и текущая страница меньше общего количества страниц - 1,то отображаем кнопку последней страницы */}
                                {totalPages > 3 && page < totalPages - 1 && <button className="mainBlock__pages-lastPage"
                                onClick={()=>setPage(totalPages)}>{totalPages}</button>}

                                <button className="mainBlock__pages-nextPage"
                                onClick={nextPage}
                                >
                                    {'>'}
                                </button>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Perfumes;