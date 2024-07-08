import { ITodo } from "./../interfaces/ITodo";
export default class ResponseObject {
  message: string;
  data: ITodo[];
  constructor(message: string, data: ITodo[]) {
    this.message = message;
    this.data = data;
  }
}
