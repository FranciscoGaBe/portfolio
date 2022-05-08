import { useEffect, useState } from 'react';

const getTime = (time: number) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
  };
  return Intl.DateTimeFormat(undefined, options).format(time);
};

const getDate = (time: number) => {
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  };
  return Intl.DateTimeFormat(undefined, options).format(time);
};

const DayTime: React.FC = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const timeout = window.setTimeout(() => { setTime(Date.now()); }, 1000);
    return () => clearTimeout(timeout);
  }, [time]);

  return (
    <div
      className="ml-auto font-medium flex flex-col justify-between text-center text-xs px-2 pt-0.5 pb-1"
    >
      <p>{ getTime(time) }</p>
      <p>{ getDate(time) }</p>
    </div>
  );
};

export default DayTime;
