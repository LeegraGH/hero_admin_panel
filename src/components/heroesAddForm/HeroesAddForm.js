

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';

import {translateFilter} from "../../utils";
import {heroesFetching, heroesFetched, heroesFetchingError} from "../../actions";


const HeroesAddForm = () => {
    const [hero, setHero] = useState({
        id: uuidv4(),
        name: "",
        description: "",
        element: ""
    });
    const {heroes, filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    
    const onChangeHero=(e)=>{
        setHero(hero=>{
            return {
                ...hero,
                [e.target.name]: e.target.value
            }
        });
    }

    const onSubmitHero=(e)=>{
        e.preventDefault();
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
        .then(()=>dispatch(heroesFetched([
            ...heroes,
            hero
        ])))
        .catch(()=>dispatch(heroesFetchingError()));
        setHero({
            id: uuidv4(),
            name: "",
            description: "",
            element: ""
        });
    }

    const onSelectLoaded = () => {
        const values = filters.filter(filter => filter!=="all").map((filter, i) => {
            return <option key={i} value={filter}>{translateFilter(filter)}</option>
        });

        return (
            <select 
                required
                className="form-select" 
                id="element" 
                name="element"
                value={hero.element}
                onChange={onChangeHero}
                >
                <option disabled>Я владею элементом...</option>
                {values}
            </select>
        )
    }

    const elements = onSelectLoaded();
    return (
        <form className="border p-4 shadow-lg rounded" method="POST" onSubmit={onSubmitHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={hero.name}
                    onChange={onChangeHero}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={hero.description}
                    onChange={onChangeHero}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                {elements}
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;