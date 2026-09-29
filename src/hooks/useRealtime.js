import { supabase } from '../lib/supabase';

export async function getTodayAttendanceForTutor() {
  return supabase
    .from('attendance')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);
}

export async function getAttendanceHistoryForTutor() {
  return supabase
    .from('attendance')
    .select('*')
    .order('check_in_time', { ascending: false })
    .limit(50);
}

export async function getAttendanceHistoryForParent() {
  return supabase
    .from('attendance')
    .select('*')
    .order('check_in_time', { ascending: false })
    .limit(50);
}

export async function getNotificationsForUser(userId) {
  return supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(30);
}

export async function markNotificationRead(notificationId) {
  return supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);
}

export async function checkInAttendance(latitude, longitude, accuracy) {
  return supabase.rpc('check_in_attendance', {
    p_latitude: latitude,
    p_longitude: longitude,
    p_accuracy: accuracy
  });
}

export async function checkOutAttendance(latitude, longitude, accuracy) {
  return supabase.rpc('check_out_attendance', {
    p_latitude: latitude,
    p_longitude: longitude,
    p_accuracy: accuracy
  });
}

export async function getProfileByAuthUser(authUserId) {
  return supabase
    .from('profiles')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single();
}
