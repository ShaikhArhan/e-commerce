export interface apiResponse {
  data?: object | Array<object>;
  message: string;
  status: boolean;
  error?: string;
}
