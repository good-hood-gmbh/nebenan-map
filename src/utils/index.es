export const reverse = (arr) => arr.slice().reverse();

export const bindTo = (context, ...funcs) => funcs.forEach((func) => {
  if (context[func]) context[func] = context[func].bind(context);
});

export const media = {
  mediaS: '(min-width: 450px)',
  mediaM: '(min-width: 690px)',
  mediaL: '(min-width: 920px)',
};

export const getMedia = (node, query) => node.matchMedia(query).matches;
