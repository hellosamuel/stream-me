const fs = require("fs")
const path = require("path")

exports.schema = fs.readFileSync(path.join(__dirname, "schema", "schema.gql")).toString()
