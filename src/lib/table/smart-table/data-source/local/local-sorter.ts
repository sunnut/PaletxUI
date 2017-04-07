/**
 * Created by 10206545 on 2016/11/26.
 */
export class LocalSorter {
  protected static COMPARE = (diretion: any, a: any, b: any) => {
    if (a < b) {
      return -1 * diretion;
    }
    if (a > b) {
      return diretion;
    }
    return 0;
  };
  static sort(
      data: Array<any>, field: string, direction: string,
      customCompare?: Function): Array<any> {
    let dir: number = direction === 'asc' ? 1 : -1;
    let compareFunction: Function =
        customCompare ? customCompare : LocalSorter.COMPARE;
    return data.sort((a, b) => {
      return compareFunction.call(null, dir, a[field], b[field]);
    });
  }
}
