import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";


function setStorageItem (key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error("Problems with local storage:", error);
    }
  } else {
    if (value === null) {
      SecureStore.deleteItemAsync(key).catch((error) => console.error("Problems with deleting from SecureStore:", error));
    } else {
      SecureStore.setItemAsync(key, value).catch((error) => console.error("Problems with setting item to SecureStore", error));
    }
  }
}



export function useStorageState(key: string) {
  const [state, dispatch] = useReducer(
    (state: { isPending: boolean, value: string | null }, action: string | null) => ({ isPending: false, value: action }),
    { isPending: true, value: null }
  )

  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          const value = localStorage.getItem(key);
          dispatch(value);
        }
      } catch (error) {
        console.log("Problems with local storage:", error);
      }
    } else {
      SecureStore.getItemAsync(key).then((value: string | null) => {
        dispatch(value);
      });
    }
  }, [key]);


  const setState = useCallback((value: string | null) => {
    dispatch(value);
    setStorageItem(key, value);
  }, [key]);


  return [state, setState] as const;

}