import dayjs from 'dayjs';

export const format = (date, format) => {
  return dayjs(date).format(format);
};
