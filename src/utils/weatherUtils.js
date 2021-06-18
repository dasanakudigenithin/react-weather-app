
export const weatherTitle = (weather) => {
    switch (weather) {
        case "Clouds": return "Cloudy";
        case "Rain": return "Rain"
        default: return "Clear Sky";
    }
}