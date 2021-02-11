const { buildSchema } = require("graphql")
const { schema } = require("@stream-me/api")

module.exports = buildSchema(schema)
