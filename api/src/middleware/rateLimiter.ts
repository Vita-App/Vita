import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  max: 3,
  windowMs: 60000,
  statusCode: 429,
  message: '',
  headers: true,
  handler: (request, response) => {
    response.status(429).json({
      error: 'Too many requests, please try again later.',
    });
  },
});
