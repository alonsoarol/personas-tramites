import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const personaValidateCreate = [
  check("nombre")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("debe ser un string"),
  check("apellido")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("debes ingresar un apellido"),
  check("email")
    .exists()
    .isEmail()
    .withMessage("el valor no ingresado no es de tipo email"),
  check("dni")
    .exists()
    .isLength({ min: 7, max: 8 })
    .withMessage("el dni debe tener entre 7 y 8 caracteres"),
  check("fecha_nacimiento")
    .isISO8601()
    .isDate()
    .withMessage("La fecha de nacimiento debe ser en formato (yyyy-mm-dd)"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
