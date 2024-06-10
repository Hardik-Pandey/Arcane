type Cloneable = any;

export function deepClone<T extends Cloneable>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (Array.isArray(obj)) {
    const arrCopy: any[] = [];
    for (const item of obj) {
      arrCopy.push(deepClone(item));
    }
    return arrCopy as T;
  }

  if (obj instanceof Function) {
    return obj;
  }

  const clonedObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj as T;
}
