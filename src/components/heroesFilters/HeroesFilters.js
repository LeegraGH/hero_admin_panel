// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";

import { filtersFetching, filtersFetched, filtersFetchingError, heroesFetching, heroesFetched, heroesFetchingError } from "../../actions";
import { translateFilter } from "../../utils";
import classNames from "classnames";

const HeroesFilters = () => {
    const { filters } = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const { request } = useHttp();

    const [activeBtn, setActiveBtn] = useState("all");

    useEffect(() => {
        dispatch("FILTERS_FETCHING");
        request("http://localhost:3001/filters")
            .then((data) => dispatch(filtersFetched(data)))
            .catch(()=>dispatch(filtersFetchingError()));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let element = "";
        if (activeBtn !== "all") {
            element = `?element=${activeBtn}`;
        }
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes${element}`)
            .then((data) => dispatch(heroesFetched(data)))
            .catch(()=>dispatch(heroesFetchingError()));
        // eslint-disable-next-line
    }, [activeBtn]);

    const onBtnClick = (e) => {
        setActiveBtn(e.target.name);
    }

    const onButtonsLoaded = () => {
        const values = filters.map((filter, i) => {
            const btnClass = classNames({
                btn: true,
                active: activeBtn === filter,
                "btn-outline-dark": filter === "all",
                "btn-danger": filter === "fire",
                "btn-primary": filter === "water",
                "btn-success": filter === "earth",
                "btn-secondary": filter === "wind"
            });
            return <button key={i} onClick={onBtnClick} name={filter} className={btnClass}>{translateFilter(filter)}</button>
        })
        return (
            <div className="btn-group">
                {values}
            </div>
        )
    }

    const elements = onButtonsLoaded();
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                {elements}
            </div>
        </div>
    )
}

export default HeroesFilters;