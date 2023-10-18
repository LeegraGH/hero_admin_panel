export const translateFilter = (value) => {
    switch (value) {
        case "all":
            return "Все";
        case "fire":
            return "Огонь";
        case "water":
            return "Вода";
        case "wind":
            return "Ветер";
        case "earth":
            return "Земля";
        default:
            return "";
    }
}