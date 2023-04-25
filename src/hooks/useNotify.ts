import * as React from 'react';
import { useNotification } from 'rc-notification';

type NotifyFunc = (text: string) => void;
export const useNotify = (): [notify: NotifyFunc, context: React.ReactElement] => {
  const [api, context] = useNotification();
  const notify = (text) => {
    api.open({
      content: text,
      placement: 'bottomLeft',
      className: 'notify-error',
      duration: 10000
    });
  };
  return [notify, context];
};
