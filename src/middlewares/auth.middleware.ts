import { NextFunction, Response } from "express";
import { IExpressRequest as Request } from "../interfaces/IExpressRequest";
import { verify } from "jsonwebtoken";
import { config } from "../config";
import IUser from "../interfaces/IUser";
import { ForbiddenError } from "../error/ForbiddenError";
import { UnAuthorizedError } from "../error/UnAuthorizedError";
import { RoleModel } from "../models/role";
import { RolePermissionsModel } from "../models/rolePermission";
/**
 * Middleware for authentication
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnAuthorizedError("Unauthorized access"));
  }

  const token = authorization.split(" ");

  if (token.length != 2 || token[0] !== "Bearer") {
    next(new UnAuthorizedError("Unauthorized access"));
  }
  try {
    const user = verify(token[1], config.jwt.secret) as IUser;

    req.user = user;
  } catch (error) {
    next(new UnAuthorizedError("Unauthorized access"));
  }

  next();
};

/**
 * Authorization middleware
 *
 * @param permission - permission needed
 * @returns
 */
export const authorization =
  (permission: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const userRole = await RoleModel.getRoleByName(user.roleName);

    //get all corresponding permissions
    const userPermissions =
      await RolePermissionsModel.getAllPermissionsByRoleId(userRole.id);

    console.log(userPermissions);
    if (
      !userPermissions.find(
        (permissions) => (permissions.permissionName = permission)
      )
    ) {
      next(new ForbiddenError("Access denied"));
    }

    console.log(
      userPermissions.find((permissions) => {
        console.log(permissions.permissionName);

        return permissions.permissionName === permission;
      })
    );

    next();
  };
