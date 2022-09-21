import * as yup from "yup";

export const userValidationSchema = yup.object({
  identifier: yup.string().required(),
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  username: yup.string(),
});
