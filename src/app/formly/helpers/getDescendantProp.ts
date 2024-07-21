export const getDescendantProp = (obj:{[key:string]:any}, desc:any) => {
  const arr = desc.split('.');
  while (arr.length && (obj = obj?.[arr.shift()])) {}
  return obj;
};
