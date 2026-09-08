const poweredBy = "SOK Sovannarith - 2026";

export function success<T>(body: T, message = "Success", statusCode = 200, pagination?: unknown) {
  return { header: { serverTimeStamp: Date.now(), result: true, statusCode, message, ...(pagination ? { pagination } : {}) }, body, poweredBy };
}

export function failure(message: string, statusCode = 400) {
  return { header: { serverTimeStamp: Date.now(), result: false, statusCode, message }, body: null, poweredBy };
}