export type GetResponse<T> = {
  data: T;
  statusCode: number;
};

export type PostResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
};
