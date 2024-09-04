import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function useDispatcher(actionCreator) {
  const dispatch = useDispatch();
  return useCallback(
    (...args) => dispatch(actionCreator(...args)),
    [actionCreator, dispatch]
  );
}
