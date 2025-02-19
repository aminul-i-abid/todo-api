interface BaseResponse {
  code: number;
  message: string;
}

interface SuccessResponse<T> extends BaseResponse {
  data: T;
}

interface ErrorResponse extends BaseResponse {
  error: string;
  data?: {
    [key: string]: any;
  };
}

export const createSuccessResponse = <T>(
  code: number,
  message: string,
  data: T
): SuccessResponse<T> => {
  return {
    code,
    message,
    data,
  };
};

export const createErrorResponse = (
  code: number,
  message: string,
  error: string,
  data?: { [key: string]: any }
): ErrorResponse => {
  return {
    code,
    message,
    error,
    ...(data && { data }),
  };
};