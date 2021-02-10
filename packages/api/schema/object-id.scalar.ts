import { GraphQLScalarType, Kind } from "graphql"
import { ObjectId } from "mongodb"

// MongoDB를 사용하기 때문에, ObjectId를 string으로 parsing하기 위함 (그 반대 또한)
export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo object id scalar type",
  parseValue(value: string) {
    return new ObjectId(value) // value from the client input variables
  },
  serialize(value: ObjectId) {
    return value.toHexString() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value) // value from the client query
    }
    return null
  },
})
