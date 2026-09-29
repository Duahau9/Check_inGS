import { useEffect, useState } from 'react';

export function useGeolocation(options = {}) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator?.geolocation) {
      setError('Trình duyệt không hỗ trợ GPS.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const result = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        setLocation(result);
        setLoading(false);
      },
      (geoError) => {
        setError(geoError.message || 'Không thể lấy vị trí hiện tại.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000,
        ...options
      }
    );
  };

  useEffect(() => {
    return () => {
      if (navigator?.geolocation) {
        navigator.geolocation.clearWatch?.(options.watchId);
      }
    };
  }, [options.watchId]);

  return { location, error, loading, getLocation };
}
