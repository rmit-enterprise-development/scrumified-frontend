export const digFind = (obj, target) =>
    target in obj
        ? obj[target]
        : Object.values(obj).reduce((acc, val) => {
              if (acc !== undefined) return acc;
              if (typeof val === 'object') return digFind(val, target);
          }, undefined);
