export interface FavoriteItem {
    id: string
    cityName: string,
    currentData: object,
    forecast:object, 
    isFavorite?: boolean,
}




// id: number
// cityName: string,
// temperture: {
//     Celsius: number,
//     farhFahrenheit: number
// },
// icon: string,
// text: string,
// isFavorite: boolean,
// forecast?: {
//     date: string,
//     temperature: {
//         Celsius: {
//             min: number,
//             max: number
//         },
//         farhFahrenheit: {
//             min: number,
//             max: number
//         }
//     }
// }