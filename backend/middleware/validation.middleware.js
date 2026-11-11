
"use strict";

/**
 * Validate request data using a Joi schema.
 *
 * @param {import("joi").Schema} schema - Joi validation schema
 * @param {"body" | "params" | "query"} property - Request property to validate
 */
const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: false
        });

        if (error) {
            const errors = error.details.map((detail) => ({
                field: detail.path.join("."),
                message: detail.message
            }));

            return res.status(422).json({
                success: false,
                statusCode: 422,
                message: "Validation failed.",
                errors,
                timestamp: new Date().toISOString()
            });
        }

        req[property] = value;
        next();
    };
};

export default validate;
