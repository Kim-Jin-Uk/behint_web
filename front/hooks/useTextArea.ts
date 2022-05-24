import { useState, useCallback, ChangeEventHandler, ChangeEvent } from 'react';

export default (initValue: string) => {
  const [value, setter] = useState(initValue);
  const handler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setter(e.target.value);
    },
    [],
  );
  return [value, handler, setter];
};
