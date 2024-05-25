export type APIResult<T> = {
  success: true;
  data: T;
  error?: never;
} | {
  success: false;
  data?: never;
  error: string;
};

export function err<T>(error: string): APIResult<T> {
  return {
    success: false,
    error,
  };
}

export function succ<T>(t: T): APIResult<T> {
  return {
    success: true,
    data: t
  };
}
