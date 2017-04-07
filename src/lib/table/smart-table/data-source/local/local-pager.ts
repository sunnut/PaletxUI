/**
 * Created by 10206545 on 2016/11/26.
 */
export class LocalPager {
  static paginate(data: Array<any>, page: number, perPage: number): Array<any> {
    return data.slice(perPage * (page - 1), perPage * page);
  }
}