import { atom, selector } from "recoil";

import { setAuthorizationHeader } from "~/apis/utils";

const accessTokenKey = "accessToken";

export const accessTokenAtom = atom<string | undefined>({
  key: accessTokenKey,
  default: undefined,
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(accessTokenKey);
      if (savedValue !== null) {
        setAuthorizationHeader(savedValue);
        setSelf(savedValue);
      }

      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem(accessTokenKey);
        } else if (newValue) {
          localStorage.setItem(accessTokenKey, newValue);
          setAuthorizationHeader(newValue);
        }
      });
    },
  ],
});

export const isLoggedInAtom = selector<boolean>({
  key: "isLoggedIn",
  get: ({ get }) => !!get(accessTokenAtom),
});
