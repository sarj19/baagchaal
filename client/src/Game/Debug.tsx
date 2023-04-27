import React, { useEffect, useRef } from 'react';

import { Position } from '../common/types';
import useGameContext from '../reducers/useGameContext';
import useGameState from './reducers/useGameState';

export default function Debug() {
  const context = useGameContext()[0];
  const state = useGameState()[0];
  const prevState = useRef(state);
  const prevContext = useRef(context);

  useEffect(() => {
    console.debug('=======DEBUG=======', 'turn', state.getTurn());
    if (prevContext.current != context) {
      for (let prop in context) {
        // @ts-ignore
        if (context[prop] != prevContext.current[prop]) {
          // @ts-ignore
          console.debug(prop, context[prop]);
        }
      }
      prevContext.current = context;
    }
    if (prevState.current != state) {
      for (let prop in state) {
        // @ts-ignore
        if (state[prop] != prevState.current[prop]) {
          if (prop == 'moves') {
            console.debug(
              prop,
              // @ts-ignore
              state[prop]
                .slice(prevState.current[prop].length)
                .reduce(
                  (acc: string, value: [Position, Position]) =>
                    `${acc} [${value[0]} => ${value[1]}]`,
                  '...'
                )
            );
          } else {
            // @ts-ignore
            console.debug(prop, state[prop]);
          }
        }
      }
      prevState.current = state;
    }
  }, [context, state]);

  return <></>;
}
