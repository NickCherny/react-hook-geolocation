import { useState, useEffect } from 'react';
import {
  TOption,
  TGeolocationState,
  TPosition,
} from './types';

const defaultOptions = {
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity,
  },
  watch: false,
  geolocationProvider: 'geolocation' in navigator && navigator.geolocation,
};

const useGeolocation = (options: TOption = defaultOptions) => {
  const [geolocation, setGeolocation] = useState<TGeolocationState>({
    coords: null,
    isGeolocationAvailable: Boolean(options.geolocationProvider),
    isGeolocationEnabled: true,
    positionError: null,
  });

  let watchId = null;

  const handleResolveLocation = ({ coords }: TPosition) => {
    setGeolocation({
      ...geolocation,
      coords,
      isGeolocationEnabled: true,
      positionError: null,
    });
  };

  const handleRejectLocation = (error: any) => {
    setGeolocation({
      ...geolocation,
      isGeolocationEnabled: false,
      coords: null,
      positionError: error,
    });
  };

  const getCurrentPosition = () => {
    if (geolocation.isGeolocationAvailable) {
      watchId = options.geolocationProvider
        .getCurrentPosition(handleResolveLocation, handleRejectLocation, options.positionOptions);
    }
  };

  useEffect(
    () => () => watchId && navigator.geolocation.clearWatch(watchId),
    [],
  );

  return {
    ...geolocation,
    getCurrentPosition,
  };
};

export default useGeolocation;
