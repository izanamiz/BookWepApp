import { format, getTime, formatDistanceToNow } from 'date-fns';
// eslint-disable-next-line import/no-unresolved
import moment from 'moment';
// ----------------------------------------------------------------------

export function momentDate(date, newFormat) {
  const fm = newFormat || 'DD/MM/YYYY HH:mm:ss';

  return date ? moment(date).format(fm) : '';
}

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
