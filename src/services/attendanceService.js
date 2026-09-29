import { supabase } from '../lib/supabase';

export async function checkInAttendance(payload = {}) {
  return supabase.rpc('check_in_attendance', payload);
}

export async function checkOutAttendance(payload = {}) {
  return supabase.rpc('check_out_attendance', payload);
}

export async function getTodayAttendance() {
  return supabase.from('attendance').select('*').order('created_at', { ascending: false }).limit(1);
}

export async function getAttendanceHistory() {
  return supabase.from('attendance').select('*').order('check_in_time', { ascending: false }).limit(20);
}

export async function getNotifications() {
  return supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(20);
}

export async function createNotification(payload) {
  return supabase.from('notifications').insert(payload);
}
