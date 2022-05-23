import { useState, useCallback, ChangeEventHandler, ChangeEvent } from 'react';

export default (initValue: string) => {
  const [value, setter] = useState(initValue);
  const handler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    },
    [],
  );
  return [value, handler, setter];
};
