const ipverify = (req, res) => {
  if (req.headers.origin != "http://talabagaxabar.uz") {
    res.sendStatus(404);
    return true ;
  } else {
    return false
  }
};

module.exports = {ipverify}
