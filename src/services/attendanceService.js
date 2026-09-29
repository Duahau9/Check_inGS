import { supabase } from '../lib/supabase';

export async function checkInAttendance(latitude, longitude, accuracy) {
  const { data, error } = await supabase.rpc('check_in_attendance', {
    p_latitude: latitude,
    p_longitude: longitude,
    p_accuracy: accuracy
  });

  return { data, error };
}

export async function checkOutAttendance(latitude, longitude, accuracy) {
  const { data, error } = await supabase.rpc('check_out_attendance', {
    p_latitude: latitude,
    p_longitude: longitude,
    p_accuracy: accuracy
  });

  return { data, error };
}

export async function getTodayAttendanceForTutor(tutorId) {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('tutor_id', tutorId)
    .order('created_at', { ascending: false })
    .limit(1);

  return { data, error };
}

export async function getAttendanceHistoryForParent(parentId) {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('tutor_id', parentId)
    .order('created_at', { ascending: false });

  return { data, error };
}
