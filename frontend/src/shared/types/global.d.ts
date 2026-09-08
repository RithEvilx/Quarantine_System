/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface KeyValue {
    [key: string]: any | number;
  }

  interface ResponseAPI<T = KeyValue[] | KeyValue> {
    header: {
      statusCode: number;
      message?: string;
      pagination: KeyValue | null;
    };
    body: T;
  }

  interface ResponseWithPagination<T> {
    pagination: KeyValue | null;
    body: T;
  }

  interface AuthToken {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    error?: string;
  }

  interface ApiErrorResponse {
    header: {
      serverTimeStamp: number;
      result: boolean;
      errorText: string;
      statusCode: number;
    };
    poweredBy: string;
  }

  type ReactSelectOptionType = {
    label: string | number;
    value: string | number;
    flag?: string;
  };
}

declare module "react-date-range";
