import {useHttp} from '../../hooks/http.hook';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { fetchHeroes } from '../../redux/slice/heroesSlice';
import {heroDeleted, selectAll} from '../../redux/slice/heroesSlice';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const heroes = useSelector(selectAll);
    const activeFilter = useSelector(state=>state.filters.activeFilter);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        let element = "";
        if (activeFilter !== "all") {
            element = `?element=${activeFilter}`;
        }
        dispatch(fetchHeroes(element));
        // eslint-disable-next-line
    }, [activeFilter]);

    const onDeleteItem = (id) => {
        request(`http://localhost:3001/heroes/${id}`,"DELETE")
            .then(() => {
                dispatch(heroDeleted(id));
            })
            .catch((error) => console.log(error));
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem 
                        key={id} 
                        {...props}
                        onDelete={()=>onDeleteItem(id)}/>
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;