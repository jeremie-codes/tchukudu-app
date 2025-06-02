import * as Location from 'expo-location';
import { transporterApi } from './api';

// Request location permissions
export const requestLocationPermission = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
};

// Get current location
export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();
  
  if (!hasPermission) {
    throw new Error('Location permission not granted');
  }
  
  return await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
};

// Start background location updates (for transporters)
export const startLocationTracking = async (callback: (location: Location.LocationObject) => void) => {
  const hasPermission = await requestLocationPermission();
  
  if (!hasPermission) {
    throw new Error('Location permission not granted');
  }
  
  // Start watching position
  const locationSubscription = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Balanced,
      distanceInterval: 100, // minimum change (in meters) to trigger update
      timeInterval: 30000,   // minimum time (in ms) between updates
    },
    (location) => {
      // Call the callback with the new location
      callback(location);
      
      // Also update server with new location (for transporters)
      try {
        transporterApi.updateLocation(
          location.coords.latitude,
          location.coords.longitude
        );
      } catch (error) {
        console.error('Failed to update location on server:', error);
      }
    }
  );
  
  // Return the subscription so it can be cleaned up later
  return locationSubscription;
};

// Calculate distance between two points
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};