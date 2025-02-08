import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/sanity.client';
import { NAVIGATION_QUERY } from '@/sanity/lib/sanity.queries';

const useNavigationData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await client.fetch(NAVIGATION_QUERY);
        result = await result;
        setData(result);
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useNavigationData;
