export interface Weather {
    cityName: string,
    temperture: {
        Celsius: number,
        farhFahrenheit: number
    },
    icon: string,
    text: string
    forecast: {
        date: string,
        temperature: {
            Celsius: {
                min: number,
                max: number
            },
            farhFahrenheit: {
                min: number,
                max: number
            }
        }
    }
}