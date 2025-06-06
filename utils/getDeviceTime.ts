import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const now = () => {
  const time = dayjs().local().format('YYYY-MM-DDTHH:mm:ss.SSS');
  return time;
};