import { useQuery } from "@tanstack/react-query";
import PerfumeItem from "../components/PerfumeItem";
import axios from "axios";
import { IPerfumesData } from "../types/types";

const Perfumes = () => {

    const {data,isLoading} = useQuery({
        queryKey:['perfumes'],
        queryFn:async ()=>{
            const response = await axios.get<IPerfumesData[]>('http://localhost:5000/perfumes');

            return response;
        }
    })

    const filteredSpicy = data?.data.filter(p=>p.category === 'Spicy'); // фильтруем полученный от сервера массив данных(массив объектов наших порфюмов),оставляем в массиве только те,у которых поле category = 'Spicy',и помещаем этот отфильтрованый массив в переменную

    const filteredSweet = data?.data.filter(p=>p.category === 'Sweet');

    const filteredBitter = data?.data.filter(p=>p.category === 'Bitter');

    const filteredVigorous = data?.data.filter(p=>p.category === 'Vigorous');
    

    return (
        <main className="main">
            <div className="container">
                <section className="sectionPerfumes">
                    <div className="sectionPerfumes__inner">
                        <div className="sectionPerfumes__filterBar">
                            <h3 className="filterBar__title">Categories</h3>
                            <ul className="filterBar__list">
                                <li className="filterBar__list-item">
                                    <p className="filterBar__item-text">All ({data?.data.length})</p>
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
                                <p className="mainBlock__searchBlock-text">{data?.data.length} products</p>
                                <input type="text" className="mainBlock__searchBlock-input" placeholder="Search" />
                            </div>
                            <div className="mainBlock__perfumesBlock">
                                {
                                    isLoading ? 
                                        <h5>Loading...</h5> 
                                        :
                                    data?.data.length ? data?.data.map(perfume => 
                                        <PerfumeItem key={perfume.id} perfume={perfume}/>
                                    ) : <h4>Not found</h4>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Perfumes;