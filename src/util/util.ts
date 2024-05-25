export type ZResult<T> =
  | {
      success: true;
      data: T;
      error?: never;
    }
  | {
      success: false;
      data?: never;
      error: string;
    };

export function err<T>(error: string): ZResult<T> {
  console.error(`err: `, error);

  return {
    success: false,
    error
  };
}

export function succ<T>(t: T): ZResult<T> {
  console.log(`succ: `, t);

  return {
    success: true,
    data: t
  };
}

export function getErrorMessage(e: unknown | Error): string {
  if (e instanceof Error) {
    return e.message;
  }

  return e + "";
}
