import * as yup from "yup";

export const rolePermissionValidationSchema = yup.object({
  role: yup.string().required(),
  permission: yup.string().required(),
});
