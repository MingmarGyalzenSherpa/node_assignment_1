import { ITodo } from "./../interfaces/ITodo";
export default class ResponseObject<TData> {
  message: string;
  meta: Object;
  data: TData[];
  constructor(message: string, data: TData[], meta: Object = {}) {
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
