import "dotenv/config";

export default {
  expo: {
    name: "mekrent-app",
    slug: "mekrent-app",
    scheme: "com.mekrent",
    version: "1.0.0",
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.EXPO_PUBLIC_SUPABASE_KEY,
    },
  },
};
