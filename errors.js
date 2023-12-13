exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlErrors = {
    "22P02": { status: 400, msg: "bad request" },
    23502: { status: 400, msg: "bad request" },

    23503: { status: 404, msg: "path not found" },
  };
  if (psqlErrors[err.code]) {
    res
      .status(psqlErrors[err.code].status)
      .send({ msg: psqlErrors[err.code].msg });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleFourOhFour = (req, res) => {
  res.status(404).send({ msg: "path not found" });
};
