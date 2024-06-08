import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";  // импортируем createApi из этой библиотеки,не из "@reduxjs/toolkit/query",так как она не работает с автоматизацией хуков rtk query
import { IPerfumesData } from "../types/types";

// для запуска своего json сервера нужно ввести команду в терминал json-server db.json(файл с данными для этого сервера) --port 5000(на каком порту его запустить) --watch(для автообновления данных)

// экспортируем и создаем api для подключения к нашему json server для корзины

export const apiBasket = createApi({
    reducerPath:'apiBasket',

    tagTypes:['perfumesBasket'],

    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000/perfumesBasket' // после localhost:5000/ нужно указать название общего объекта,который прописали в файле db.json
    }),

    endpoints:builder => ({
        // указываем название эндпоинта и указываем через builder ему query(для получения данных с сервера) или mutation(для изменения,добавления,удаления данных на сервере),указываем тип для query,первым параметром в generic указываем,что будет приходить из вне(данные из запроса на сервер,которые приходят,в данном случае это массив объектов на основе интерфейса IPerfumesData),а вторым параметром указываем тип параметра в функции query ниже,то есть параметр,который будем передавать в хук,при вызове хука для запроса на сервер(например,если бы мы передавали id в этот query,то нужно было указывать его тип,но так как мы ничего не передаем,то указываем тип null,для поиска передаем тип string,так как будем передавать параметр для поиска searchTerm)
        getAllPerfumesBasket:builder.query<IPerfumesData[],null>({
            // указываем конкретный url,который добавляется к базовому url(который мы указали),но в данном случае мы уже указали в базовом url конкретный путь для этого эндпоинта,поэтому указываем здесь /
            query:()=>'/',

            // в providesTags(это для запросов query get) указываем тег,который нужно связать с этим запросом(нужный,который мы указывали в tagTypes),это чтобы данные записывались правильно в кеш rtk query и автообновлялись
            providesTags:()=>['perfumesBasket']
        }),

        addPerfumesBasket:builder.mutation<null,IPerfumesData>({
            query:(perfume)=>({
                body:perfume, // указываем тело запроса(те данные,которые будем передавать в параметр при вызове этого эндпоинта в другом файле,которые будут добавлены на сервер,их мы передаем в параметре этой функции (perfume))
                
                url:'/', // указываем конкретный url,который добавляется к базовому url(который мы указали),но в данном случае мы уже указали в базовом url конкретный путь для этого эндпоинта,поэтому указываем здесь /

                method:'POST' // указываем метод,который будет использоваться для запроса,при mutation, в данном случае это метод POST
            }),

            // в invalidatesTags(это для запросов query mutation) указываем тег в поле type,который нужно связать с этим запросом(нужный,который мы указывали в tagTypes),это чтобы данные записывались правильно в кеш rtk query и автообновлялись
            invalidatesTags:()=>[{
                type:'perfumesBasket'
            }]
        }),

        deletePerfumeBasket:builder.mutation<null,IPerfumesData>({
            query:(perfume)=>({
                url:`/${perfume.id}`, // указываем тут id user,которого хотим удалить

                method:'DELETE' // указываем тут метод DELETE для удаления данных на сервере
            }),

            invalidatesTags:()=>[{
                type:'perfumesBasket'
            }]
        }),

        updatePerfumeBasketCount:builder.mutation<null,IPerfumesData>({
            query:(perfume)=>({
                url:`/${perfume.id}`, // указываем тут id user, у которого хотим обновить данные,

                method:'PUT', // указываем тут метод PUT для обновления данных на сервере

                body:perfume // указываем тело запроса(те данные,которые будут изменены на сервере (perfume.count))
            }),

            invalidatesTags:()=>[{
                type:'perfumesBasket'
            }]
        })
    })
})