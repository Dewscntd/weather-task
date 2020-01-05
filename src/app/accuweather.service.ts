import { CurrentCondition } from './features/weather/models/current-condition.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AutocompleteApi } from './features/weather/models/autocomplete-api.model';
import { FiveDaysForecast } from './features/weather/models/five-day-forecast.model';


const API_KEY = `?apikey=${environment.WEATHER_API_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class AccuweatherService {
  private readonly AUTO_COMP_URL = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete${API_KEY}`;
  private readonly CURRENT_CONDITION_URL = `https://dataservice.accuweather.com/currentconditions/v1/`;
  private readonly GEOLOCATION_URL = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search${API_KEY}`;
  private readonly FIVE_DAYS_FORECAST_URL = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`;

  coords: []
  constructor(private http: HttpClient) { }


  getLocationPositionPromise(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, () => {
        alert('cannot get location');
        reject();
      });
    });
  }


  getCityKey(search: string){
     return this.http.get<AutocompleteApi>(`${this.AUTO_COMP_URL}&q=${search}`)
     .pipe(
       catchError(this.ErrorHandler)
     );  
  }

  getGeolocationKey(lat: number, long: number){
      return this.http.get(`this.GEOLOCATION_URL${lat},${long}`).pipe(
        catchError(this.ErrorHandler)
      );     
  }

  getCurrentCondition(cityKey: string){
    return this.http.get<CurrentCondition>(`${this.CURRENT_CONDITION_URL}${cityKey}${API_KEY}`).pipe(
      catchError(this.ErrorHandler)
    ); 
  }

  getFiveDaysForecast(cityKey: string){
    return this.http.get<FiveDaysForecast>(`${this.FIVE_DAYS_FORECAST_URL}${cityKey}${API_KEY}&metric=true`).pipe(
      catchError(this.ErrorHandler)
    );
  }

  ErrorHandler(error: HttpErrorResponse){
    return throwError("oops something wrong");
  }












  

// ****************************************************************************************************
// 
// ****************************************************************************************************
// 
// ****************************************************************************************************
// 
// ****************************************************************************************************
getMockAutoComplete(){
  return of(
    [
      {
          "Version": 1,
          "Key": "215854",
          "Type": "City",
          "Rank": 31,
          "LocalizedName": "Tel Aviv",
          "Country": {
              "ID": "IL",
              "LocalizedName": "Israel"
          },
          "AdministrativeArea": {
              "ID": "TA",
              "LocalizedName": "Tel Aviv"
          }
      }
    ]
  )
}

getMockCurrentCondition(key: string){
  return of(
    [
      {
        "LocalObservationDateTime": "2019-12-30T19:00:00+02:00",
        "EpochTime": 1577725200,
        "WeatherText": "Clear",
        "WeatherIcon": 33,
        "HasPrecipitation": false,
        "PrecipitationType": null,
        "IsDayTime": false,
        "Temperature": {
          "Metric": {
            "Value": 16.3,
            "Unit": "C",
            "UnitType": 17
          },
          "Imperial": {
            "Value": 61,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
      }
    ]
  )
}

getMockForecast( key: string){
  return of(
    {
      "Headline": {
        "EffectiveDate": "2020-01-01T13:00:00+02:00",
        "EffectiveEpochDate": 1577876400,
        "Severity": 5,
        "Text": "Showers and a thunderstorm Wednesday afternoon through Wednesday evening",
        "Category": "thunderstorm",
        "EndDate": "2020-01-02T01:00:00+02:00",
        "EndEpochDate": 1577919600,
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
      },
      "DailyForecasts": [
        {
          "Date": "2019-12-30T07:00:00+02:00",
          "EpochDate": 1577682000,
          "Temperature": {
            "Minimum": {
              "Value": 49,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 66,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 34,
            "IconPhrase": "Mostly clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
        },
        {
          "Date": "2019-12-31T07:00:00+02:00",
          "EpochDate": 1577768400,
          "Temperature": {
            "Minimum": {
              "Value": 52,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 61,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 4,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 36,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
        },
        {
          "Date": "2020-01-01T07:00:00+02:00",
          "EpochDate": 1577854800,
          "Temperature": {
            "Minimum": {
              "Value": 53,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 63,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 6,
            "IconPhrase": "Mostly cloudy",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Night": {
            "Icon": 40,
            "IconPhrase": "Mostly cloudy w/ showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
        },
        {
          "Date": "2020-01-02T07:00:00+02:00",
          "EpochDate": 1577941200,
          "Temperature": {
            "Minimum": {
              "Value": 51,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 63,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 14,
            "IconPhrase": "Partly sunny w/ showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Night": {
            "Icon": 36,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
        },
        {
          "Date": "2020-01-03T07:00:00+02:00",
          "EpochDate": 1578027600,
          "Temperature": {
            "Minimum": {
              "Value": 50,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 61,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 18,
            "IconPhrase": "Rain",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Night": {
            "Icon": 12,
            "IconPhrase": "Showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Heavy"
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
          "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
        }
      ]
    }
  )
}
geMocktGeolocationKey(){
  return  of (
    {
      "Version": 1,
      "Key": "215613",
      "Type": "City",
      "Rank": 45,
      "LocalizedName": "Ashdod",
      "EnglishName": "Ashdod",
      "PrimaryPostalCode": "",
      "Region": {
        "ID": "MEA",
        "LocalizedName": "Middle East",
        "EnglishName": "Middle East"
      },
      "Country": {
        "ID": "IL",
        "LocalizedName": "Israel",
        "EnglishName": "Israel"
      },
      "AdministrativeArea": {
        "ID": "D",
        "LocalizedName": "Southern District",
        "EnglishName": "Southern District",
        "Level": 1,
        "LocalizedType": "District",
        "EnglishType": "District",
        "CountryID": "IL"
      },
      "TimeZone": {
        "Code": "IST",
        "Name": "Asia/Jerusalem",
        "GmtOffset": 2,
        "IsDaylightSaving": false,
        "NextOffsetChange": "2020-03-27T00:00:00Z"
      },
      "GeoPosition": {
        "Latitude": 31.799,
        "Longitude": 34.649,
        "Elevation": {
          "Metric": {
            "Value": 34,
            "Unit": "m",
            "UnitType": 5
          },
          "Imperial": {
            "Value": 111,
            "Unit": "ft",
            "UnitType": 0
          }
        }
      },
      "IsAlias": false,
      "SupplementalAdminAreas": [],
      "DataSets": [
        "AirQualityCurrentConditions",
        "AirQualityForecasts",
        "Alerts"
      ]
    }
  )
}

}
