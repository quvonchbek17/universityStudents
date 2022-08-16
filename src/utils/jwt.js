const jwt = require('jsonwebtoken')

const sign = (payload) => jwt.sign(payload, "NFUE73YRFUEE673UJFIF8E83URJFIF9473HRNF7H")
const verify = (token) => jwt.verify(token, "NFUE73YRFUEE673UJFIF8E83URJFIF9473HRNF7H")

module.exports = {
    sign,
    verify
}