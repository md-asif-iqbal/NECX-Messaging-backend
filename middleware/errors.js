export function notFound(req, res, next) {
  res.status(404).json({ message: "Not Found" });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const code = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(code).json({ message });
}
