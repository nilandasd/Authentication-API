const apiDoc = {
  swagger: "2.0",
  basePath: "/",
  info: {
    title: "Validation API",
    description: "Server for registering, and validating users using JWTs",
    version: "1.0.0",
  },
  contact: {
    email: "naschuma@ucsc.edu",
  },
  schemes: ["https"],
  paths: {
    "/admin": {
      post: {
        summary: "Register admin to use the API",
        operationId: "createAdmin",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "admin",
            in: "body",
            description: "Admin to register.",
            required: true,
            schema: {
              $ref: "#/definitions/Admin",
            },
          },
        ],
        responses: {
          200: {
            description: "Admin created",
          },
          401: {
            description: "Name unavailable",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/admin/login": {
      post: {
        summary: "Admin login.",
        operationId: "loginAdmin",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "admin",
            in: "body",
            description: "Admin to login.",
            required: true,
            schema: {
              $ref: "#/definitions/Admin",
            },
          },
        ],
        responses: {
          200: {
            description: "Admin authenticated",
            headers: {
              "admin-token": {
                schema: {
                  type: "string",
                },
                description: "JWT for admin authorization",
              },
            },
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/user": {
      post: {
        summary: "Register New user",
        operationId: "createUser",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "admin-token",
            in: "header",
            description: "token for validation",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "user",
            in: "body",
            description: "User to register.",
            required: true,
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        responses: {
          200: {
            description: "User created",
          },
          401: {
            description: "Name unavailable",
          },
          500: {
            description: "Server error",
          },
        },
      },
      put: {
        summary: "Update user password",
        operationId: "updateUser",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "admin-token",
            in: "header",
            description: "token for validation",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "user",
            in: "body",
            description: "User to update.",
            required: true,
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        responses: {
          200: {
            description: "User password updated",
          },
          400: {
            description: "User not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
      delete: {
        summary: "Delete user",
        operationId: "deleteUser",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "admin-token",
            in: "header",
            description: "token for validation",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "user",
            in: "body",
            description: "User to update.",
            required: true,
            schema: {
              $ref: "#/definitions/User",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted",
          },
          400: {
            description: "User not found",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/user/login": {
      post: {
        summary: "User login.",
        operationId: "loginUser",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "admin-token",
            in: "header",
            description: "token for validation",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "user",
            in: "body",
            description: "User to login.",
            required: true,
            schema: {
              $ref: "#/definitions/User",
            },
          },
          {
            name: "user claims",
            in: "body",
            description: "claims to sign",
            required: true,
            schema: {
                type: "object",
            },
          },
        ],
        responses: {
          200: {
            description: "User authenticated",
            headers: {
              "user-token": {
                schema: {
                  type: "string",
                },
                description: "JWT for user authorization",
              },
            },
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/user/validate": {
      put: {
        summary: "validate user.",
        operationId: "validateUser",
        produces: ["application/json"],
        consumes: ["application/json"],
        parameters: [
          {
            name: "user-token",
            in: "header",
            description: "user-token to validate",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "user authenticated",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  },
  definitions: {
    Admin: {
      name: "admin",
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    User: {
      name: "user",
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        password: {
          type: "string",
        },
        service: {
          type: "string",
        },
      },
    },
  },
};

module.exports = apiDoc;
