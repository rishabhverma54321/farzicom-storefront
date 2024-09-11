import { useState, useEffect } from "react";

export const API_ENDPOINT =
  "https://lotus-organics.com/blog/wp-json/wp/v2/posts?_embed";

export const useBlogPosts = (API_ENDPOINT_ARG?: any) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log("API_ENDPOINT_ARG", API_ENDPOINT_ARG);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(API_ENDPOINT_ARG || API_ENDPOINT);
      setLoading(false);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return { data, loading };
};
