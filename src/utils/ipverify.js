const ipverify = (req, res) => {
  if (req.headers.origin != "http://localhost:3000") {
    res.sendStatus(404);
    return true ;
  } else {
    return false
  }
};

module.exports = {ipverify}
