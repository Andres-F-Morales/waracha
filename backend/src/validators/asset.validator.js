const { body, validationResult } = require('express-validator');

module.exports = {
    validateAssetCreation : [
        body('name').isLength({ min: 1 }).withMessage('El nombre es obligatorio'),
        body('type_id').isInt().withMessage('El tipo es obligatorio'),
        body('owner_id').isInt().withMessage('El propietario es obligatorio'),
        body('serial').isLength({ min: 1 }).withMessage('El serial es obligatorio'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ],
    validateAssetUpdate : [
        body('name').optional().isLength({ min: 1 }).withMessage('El nombre es obligatorio'),
        body('type_id').optional().isInt().withMessage('El tipo es obligatorio'),
        body('owner_id').optional().isInt().withMessage('El propietario es obligatorio'),
        body('serial').optional().isLength({ min: 1 }).withMessage('El serial es obligatorio'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ]
}