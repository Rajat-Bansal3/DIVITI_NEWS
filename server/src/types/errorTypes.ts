import z from "zod";

// Enum for different types of errors
const error = z.enum([
	"NOT_FOUND", // Error when resource is not found (404)
	"UNAUTHENTICATED", // Error when user is not authenticated (401)
	"UNAUTHORISED", // Error when user is authenticated but lacks permissions (403)
	"BAD_REQUEST", // Error for invalid requests or missing parameters (400)
	"INTERNAL_ERROR", // Generic internal server error (500)
	"SERVICE_UNAVAILABLE", // Error when a service is temporarily unavailable (503)
	"CONFLICT", // Error when there is a conflict, e.g., trying to create a duplicate resource (409)
	"FORBIDDEN", // Error when access is denied (403)
]);

export type ERROR = z.infer<typeof error>;

// Sample error codes and their descriptions
/*
  NOT_FOUND: 404 - Resource not found
  UNAUTHENTICATED: 401 - User is not authenticated
  UNAUTHORISED: 403 - User lacks permissions to perform the action
  BAD_REQUEST: 400 - Invalid request (e.g., missing parameters or invalid data)
  INTERNAL_ERROR: 500 - Something went wrong on the server
  SERVICE_UNAVAILABLE: 503 - Service is unavailable (e.g., due to downtime or overload)
  CONFLICT: 409 - Conflict in the request (e.g., trying to create a duplicate resource)
  FORBIDDEN: 403 - Forbidden access to the requested resource
*/
