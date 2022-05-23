import { useCallback, useState } from 'react';
import moment from 'moment';

export default (initValue: Date | null) => {
  const [value, setter] = useState(initValue);
  const handler: (date: moment.Moment, dateString: string) => void =
    useCallback((date: moment.Moment | null, dateString: string) => {
      console.log(dateString);
      setter(date ? date.toDate() : value);
    }, []);
  return [value, handler, setter];
};
