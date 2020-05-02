import * as Location from 'expo-location';

const tenMeterswithDegrees = 0.0001;

const getLocation = (increment) => {
  return {
    timestamp: 100000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -46.64416480797531 + increment * tenMeterswithDegrees,
      latitude: -23.568375540785347 + increment * tenMeterswithDegrees
    }
  };
};

let counter = 0;

setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter++)
  });
}, 1000);
