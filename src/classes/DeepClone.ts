import clone from "clone";

class DeepClone {
  // https://www.npmjs.com/package/clone
  static cloneLib(obj: any, circular: boolean = true, depth: number = Infinity, prototype: any = undefined, includeNonEnumerable: boolean = true) {
    return clone(obj, circular, depth, prototype, includeNonEnumerable)
  }
}

export default DeepClone
