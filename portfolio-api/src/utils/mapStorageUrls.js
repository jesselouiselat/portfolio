import { supabase } from "../config/supabaseClient.js";

export function mapStorageUrls(bucket = "Projects", paths) {
  if (!paths) null;

  if (Array.isArray(paths)) {
    return paths.map((path) => {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      return data.publicUrl;
    });
  }
  if (typeof paths === "string") {
    const { data } = supabase.storage.from(bucket).getPublicUrl(paths);
    return data.publicUrl;
  }
  return null;
}
