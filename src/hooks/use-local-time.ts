import { useEffect, useState } from 'react';
import { site } from '@/data/site';

/** HH:MM in the owner's time zone, refreshed every 30 seconds */
export const useLocalTime = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: site.timeZone }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
};
