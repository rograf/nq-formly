type FlatObject = { [key: string]: string };
type FlatObjectWithArray = { [key: string]: any };

export function flatten(obj: {[key:string]: any}, parentKey: string = '', result: FlatObject = {}): FlatObject {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        flatten(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

export function flattenWithArray(obj: {[key:string]: any}, parentKey: string = '', result: FlatObjectWithArray = {}): FlatObjectWithArray {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if(Array.isArray(obj[key])){
          result[newKey] = obj[key];
        }else{
          flatten(obj[key], newKey, result);
        }
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}