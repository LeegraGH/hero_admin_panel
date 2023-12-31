// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFilters, activeFilterUpdated, selectAll } from "../../redux/slice/filtersSlice";
import { translateFilter } from "../../utils";
import classNames from "classnames";

const HeroesFilters = () => {

    const filters = useSelector(selectAll);
    const activeFilter = useSelector(state => state.filters.activeFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    const onBtnClick = (e) => {
        dispatch(activeFilterUpdated(e.target.name));
    }

    const onButtonsLoaded = () => {
        const values = filters.map((filter, i) => {
            const btnClass = classNames({
                btn: true,
                active: activeFilter === filter,
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