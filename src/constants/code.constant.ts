export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUEST = 429,
  SERVER_ERROR = 500,
  CONFLICT = 409,
}

export enum ErrorCode {
  SERVER_ERROR = "SERVER_ERROR",
  ALREADY_USED = "ALREADY_USED",
  VALUE_TOO_LONG = "VALUE_TOO_LONG",
  WRONG_CREDENTIALS = "WRONG_CREDENTIALS",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  BAD_REQUEST = "BAD_REQUEST",
  TOO_MANY_REQUEST = "TOO_MANY_REQUEST",
  CONFLICT = "CONFLICT",
}
