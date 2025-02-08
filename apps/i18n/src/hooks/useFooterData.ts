import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/sanity.client';
import { FOOTER_QUERY } from '@/sanity/lib/sanity.queries';

const useFooterData = (locale) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await client.fetch(FOOTER_QUERY, { locale: locale.locale });
        result = await result;
        setData(result);
      } catch (error) {
        console.error('Error fetching Footer data:', error);
      }
    };

    fetchData();
  }, [locale]);

  return data;
};

export default useFooterData;
