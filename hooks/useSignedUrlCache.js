import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const urlCache = {};

const useSignedUrlCache = (paths) => {
  const [signedUrls, setSignedUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSignedUrls = async () => {
      if (!paths || paths.length === 0) {
        setIsLoading(false);
        return;
      }

      const urls = await Promise.all(
        paths.map(async (path) => {
          if (urlCache[path] && urlCache[path].expiry > Date.now()) {
            return urlCache[path].signedUrl;
          } else {
            const { data, error } = await supabase.storage
              .from("equipment-images")
              .createSignedUrl(path, 60 * 60); // 1 hour validity

            if (error) {
              console.error("Error creating signed URL:", error);
              return null;
            }

            if (!data || !data.signedUrl) {
              console.error(
                "Invalid data received from createSignedUrl:",
                data
              );
              return null;
            }

            const newSignedUrl = data.signedUrl;
            urlCache[path] = {
              signedUrl: newSignedUrl,
              expiry: Date.now() + 60 * 60 * 1000, // 1 hour expiry
            };
            return newSignedUrl;
          }
        })
      );

      setSignedUrls(urls.filter((url) => url !== null));
      setIsLoading(false);
    };

    fetchSignedUrls();
  }, [paths]);

  return { signedUrls, isLoading };
};

export default useSignedUrlCache;
