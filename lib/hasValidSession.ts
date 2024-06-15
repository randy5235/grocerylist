import { Request, Response, NextFunction } from 'express';

const hasValidSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.status(403);
    res.json({ error: 'Please log in first.' });
  }
};

export = hasValidSession;
