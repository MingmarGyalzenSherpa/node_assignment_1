import { ITodo } from "./../interfaces/ITodo";
export default class ResponseObject<TData> {
  message: string;
  data: TData[];
  constructor(message: string, data: TData[]) {
    this.message = message;
    this.data = data;
  }
}
