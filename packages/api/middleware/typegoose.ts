import { Model, Document } from "mongoose"
import { getClassForDocument } from "@typegoose/typegoose"
import { MiddlewareFn } from "type-graphql"

// MongoDB Document를 readable object로 변환
export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
  const result = await next()

  if (Array.isArray(result)) {
    return result.map(item => (item instanceof Model ? convertDocument(item) : item))
  }

  if (result instanceof Model) {
    return convertDocument(result)
  }

  return result
}

function convertDocument(doc: Document) {
  const convertedDocument = doc.toObject()
  const DocumentClass = getClassForDocument(doc)!
  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype)
  return convertedDocument
}
