import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bbzhhizdxudblhpwvwso.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiemhoaXpkeHVkYmxocHd2d3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxMDY2MjksImV4cCI6MjAyMTY4MjYyOX0.3cr7dPp0j3n9zdSMZSi2EcPWos6KhobLjZ2Bwj_Ywaw";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false 
});
