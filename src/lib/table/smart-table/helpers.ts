/**
 * Created by 10206545 on 2016/11/26.
 */
function isSpecificValue(val: any) {
  return (  // val instanceof Buffer||
             val instanceof Date || val instanceof RegExp) ?
      true :
      false;
}

function cloneSpecificValue(val: any): any {
  /*    if(val instanceof Buffer){
          var x=new Buffer(val.length);
          val.copy(x);
          return x;
      }else */
  if (val instanceof Date) {
    return new Date(val.getTime());
  } else if (val instanceof RegExp) {
    return new RegExp(val);
  } else {
    throw new Error('Unexpected situation');
  }
}
function deepCloneArray(arr: any): any {
  var clone: Array<any> = [];
  arr.forEach(function(item: Object, index: any) {
    if (typeof item === 'object' && item !== null) {
      if (Array.isArray(item)) {
        clone[index] = deepCloneArray(item);
      } else if (isSpecificValue(item)) {
        clone[index] = cloneSpecificValue(item);
      } else {
        clone[index] = deepExtend({}, item);
      }
    } else {
      clone[index] = item;
    }
  });
  return clone;
}
export const deepExtend = function(...objects: Array<any>): any {
  if (arguments.length < 1 || typeof arguments[0] !== 'object') {
    return false;
  }
  if (arguments.length < 2) {
    return arguments[0];
  }
  var target = arguments[0];
  var val: any, src: any;
  var args = Array.prototype.slice.call(arguments, 1);
  args.forEach(function(obj: any) {
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      return;
    }
    Object.keys(obj).forEach(function(key: any) {
      src = target[key];
      val = obj[key];
      // recursion prevention
      if (val === target) {
        return;
      } else if (typeof val !== 'object' || val === null) {
        target[key] = val;
        return;
      } else if (Array.isArray(val)) {
        target[key] = deepCloneArray(val);
        return;
      } else if (isSpecificValue(val)) {
        target[key] = cloneSpecificValue(val);
        return;
      } else if (
          typeof src !== 'object' || src === null || Array.isArray(src)) {
        target[key] = deepExtend({}, val);
      } else {
        target[key] = deepExtend(src, val);
        return;
      }

    });
  });
  return target;
};
export class Deferred {
  promise: Promise<any>;
  resolve: any;
  reject: any;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
export function getDeepFromObject(
    object: any = {}, name: string, defaultValue?: any) {
  let keys = name.split('.');
  let tmp = deepExtend({}, object);
  let level = tmp;
  keys.forEach((k) => {
    if (level && typeof level[k] !== 'undefined') {
      level = level[k];
    }

  });
  if (level === tmp) {
    level = undefined;
  }
  return typeof level === 'undefined' ? defaultValue : level;
}
