const ipverify = (req, res) => {
  if (req.headers.origin != "http://207.154.246.125") {
    res.sendStatus(404);
    return true ;
  } else {
    return false
  }
};

module.exports = {ipverify}
