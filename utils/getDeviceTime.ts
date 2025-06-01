import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const now = () => {
  const time = dayjs().local().format('YYYY-MM-DDTHH:mm:ss.SSS');
  return time;
};