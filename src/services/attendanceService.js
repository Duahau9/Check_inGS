import { useCallback, useEffect, useState } from 'react';

export function useGeolocation(options = {}) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback(() => {
    if (!navigator?.geolocation) {
      setError('Trình duyệt không hỗ trợ GPS.');
      return null;
    }

    setLoading(true);
    setError(null);

    return new Promise((resolve, reject) => {
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
          resolve(result);
        },
        (geoError) => {
          const message = geoError.code === 1
            ? 'Bạn đã từ chối quyền định vị.'
            : geoError.code === 2
              ? 'Không thể xác định vị trí hiện tại.'
              : 'Không thể lấy vị trí. Vui lòng thử lại.';
          setError(message);
          setLoading(false);
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 30000,
          ...options
        }
      );
    });
  }, [options]);

  useEffect(() => {
    return () => {
      if (navigator?.geolocation && options.watchId) {
        navigator.geolocation.clearWatch?.(options.watchId);
      }
    };
  }, [options.watchId]);

  return { location, error, loading, getLocation };
}

export function getGpsStatus(accuracy) {
  if (accuracy == null || Number.isNaN(Number(accuracy))) {
    return { level: 'warning', label: 'Không xác định' };
  }

  const value = Number(accuracy);
  if (value <= 30) return { level: 'success', label: 'Độ chính xác tốt' };
  if (value <= 100) return { level: 'warning', label: 'Cảnh báo độ chính xác' };
  return { level: 'error', label: 'Vị trí chưa đủ chính xác' };
}
