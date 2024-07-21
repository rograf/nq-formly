export const setDescendantProp = (obj: any, desc: string, value: any) => {
  const keys = desc.split('.');
  const lastKey = keys.pop()!;

  let currentObj = obj;

  keys.forEach((key) => {
    currentObj[key] = currentObj[key] || {};
    currentObj = currentObj[key];
  });

  if(currentObj){
    currentObj[lastKey] = value;
  }
}