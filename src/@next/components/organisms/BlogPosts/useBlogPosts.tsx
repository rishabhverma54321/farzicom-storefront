import { useState, useEffect } from "react";

export const API_ENDPOINT =
  "https://ikkaibeauty.com/blog/wp-json/wp/v2/posts?_embed";

export const useBlogPosts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(API_ENDPOINT);
      setLoading(false);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return { data, loading };
};
