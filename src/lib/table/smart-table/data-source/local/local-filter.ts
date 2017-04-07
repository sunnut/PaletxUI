/**
 * Created by 10206545 on 2016/11/26.
 */
export class LocalFilter {
  protected static FILTER =
      (value: string, search: string) => {
        return value.toString().toLowerCase().includes(
            search.toString().toLowerCase());
      }

  static filter(
      data: Array<any>, field: string, search: string, customFilter?: Function):
      Array<any> {
    let f: Function = customFilter ? customFilter : LocalFilter.FILTER;
    return data.filter((el) => {
      let value = typeof el[field] === 'undefined' || el[field] === null ?
          '' :
          el[field];
      return f.call(null, value, search);
    });
  }
}
