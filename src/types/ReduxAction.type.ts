type ReduxAction<Type extends string, Payload = undefined> = {
    type: Type;
    payload?: Payload;
  };
  

export default ReduxAction;