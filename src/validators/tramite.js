import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const tramiteValidateCreate = [
  check("descripcion")
    .exists()
    .notEmpty()
    .withMessage("debes ingresar una descripcion"),
  check("fecha_de_alta")
    .isISO8601()
    .isDate()
    .withMessage("La fecha de alta debe ser en formato (yyy-mm-dd)"),
  check("fecha_de_cierre")
    .isISO8601()
    .isDate()
    .withMessage("La fecha de cierre debe ser en formato (yyy-mm-dd)"),
  check("tipo").custom((value, { req }) => {
    if (value === "familiar" || value === "empresa" || value === "particular") {
      return true;
    }
    throw new Error(
      "el tipo de tramite solo puede ser familiar, empresa o particular"
    );
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
