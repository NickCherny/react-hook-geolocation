export type TPositionOption = {
  enableHighAccuracy?: boolean
  maximumAge?: number
  timeout?: number
};

export type TOption = {
  positionOptions?: TPositionOption
  watch?: boolean
  geolocationProvider?: Geolocation
};

export type TCoords = {}

export type TGeolocationState = {
  coords?: TCoords
  isGeolocationAvailable: boolean
  isGeolocationEnabled: boolean
  positionError?: any
};

export type TPosition = {
  coords: {
    latitude: number
    longitude: number
    altitude?: number
    accuracy: number
    altitudeAccuracy: number
    heading?: number
    speed?: number
  }
  timestamp: number
};
