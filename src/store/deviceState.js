import { atom } from "recoil";

export const midDeskStateAtom = atom({
  key: "mid-desk-state",
  default: window.innerWidth <= 1381,
});

export const tabletStateAtom = atom({
  key: "tablet-state",
  default: window.innerWidth <= 1000,
});

export const mobiletStateAtom = atom({
  key: "mobile-state",
  default: window.innerWidth <= 530,
});
