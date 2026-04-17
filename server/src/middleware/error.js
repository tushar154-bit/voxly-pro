export const errorHandler = (err, req, res, next) => {
  req.log?.error({ err }, 'Unhandled error');
  const status = err.status || 500;
  const message = status === 500 ? 'Internal server error' : (err.message || 'Error');
  res.status(status).json({ error: message });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Not found' });
};
