export interface ResponseDto {
  data?: object | string;
  message: string;
  status: boolean;
  error?: string;
}
