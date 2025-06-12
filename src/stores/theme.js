// stores/theme.js
import { writable } from "svelte/store";

export const isDyslexic = writable(false);
export const changeFont = () => {
  isDyslexic.update(value => !value); // toggle nilainya
};

