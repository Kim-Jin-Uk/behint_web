import { useState, useCallback, ChangeEventHandler, ChangeEvent } from 'react';

export default (initValue: string) => {
  const [value, setter] = useState(initValue);
  const handler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      setter(
        e.target.value.length >= 2
          ? e.target.value.substring(e.target.value.length - 2)
          : `0${e.target.value}`,
      );
    },
    [],
  );
  return [value, handler, setter];
};
