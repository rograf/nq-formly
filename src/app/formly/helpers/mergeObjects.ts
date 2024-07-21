export const mergeObjects = (source: any, target: any, options = { softMerge: true }) => {
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      if (options.softMerge) {
        if (typeof target[key] === 'object' && target[key] !== null && !Array.isArray(target[key])) {
          if (!source.hasOwnProperty(key) || typeof source[key] !== 'object' || source[key] === null || Array.isArray(source[key])) {
            source[key] = {};
          }
          mergeObjects(source[key], target[key]);
        } else {
          source[key] = target[key];
        }
      } else {
        source[key] = target[key];
      }
    }
  }
};
