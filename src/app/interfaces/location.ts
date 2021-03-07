export enum LocationType { Geolocation, PostalCode, CityName }

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Postal {
  PostalCode: string;
}

export interface CityName {
  CityName: string;
}

export interface LocationConfig {
  type: LocationType;
  value: Coordinates | Postal | CityName;
}
