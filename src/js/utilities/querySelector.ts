// This was supposed to be a function to simulate jQuery

export const $ = (el: string) => document.querySelector(el);
export const $$ = (el: string) => document.querySelectorAll(el);
