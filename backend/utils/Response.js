const Response = (res, success, message, data = null, statusCode = 200, meta=null) => {
  const response = {
    success,
    message,
    data,
    meta
  };

  return res.status(statusCode).json(response);
};

module.exports = Response;
