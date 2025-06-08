import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : undefined,
      message: error.msg,
    }));
    
    res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        details: errorMessages,
      },
    });
    return; // Important: return after sending response
  }
  
  next();
};