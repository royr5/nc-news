exports.handlePsqlErrors = (err, req, res, next) => {
  console.log(err);

  const psqlErrors = { "22P02": { status: 400, msg: "bad request" } };
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
  }
};

exports.handleFourOhFour = (req, res) => {
  res.status(404).send({ msg: "path not found" });
};
