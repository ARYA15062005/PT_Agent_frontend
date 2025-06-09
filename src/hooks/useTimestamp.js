import { useState, useEffect } from 'react';

const useTimestamp = (date) => {
  const [relative, setRelative] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = Math.floor((now - new Date(date)) / 1000);
      if (diff < 60) setRelative('Just now');
      else if (diff < 3600) setRelative(`${Math.floor(diff / 60)} minutes ago`);
      else if (diff < 86400) setRelative(`${Math.floor(diff / 3600)} hours ago`);
      else setRelative(new Date(date).toLocaleDateString());
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [date]);

  return relative;
};

export default useTimestamp;
