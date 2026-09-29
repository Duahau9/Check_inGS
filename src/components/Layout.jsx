import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useRealtime({ table, callback, filter }) {
  useEffect(() => {
    const channel = supabase.channel(`${table}-channel`);

    channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table,
        ...(filter ? { filter } : {})
      },
      callback
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [table, callback, filter]);
}

export function subscribeNotifications(userId, callback) {
  return supabase
    .channel('notifications-channel')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe();
}
