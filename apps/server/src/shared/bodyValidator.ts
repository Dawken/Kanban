import { ClassType } from 'class-transformer/ClassTransformer'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

export const bodyValidator = async <ObjectType extends object>(
  dto: ClassType<ObjectType>,
  obj: ObjectType
) => {
  const objInstance = plainToClass(dto, obj)
  const errors = await validate(objInstance, {
    whitelist: true,
    forbidNonWhitelisted: true,
  })
  if (errors.length > 0) {
    throw new TypeError(
      `validation failed. The error fields : ${errors.map(
        ({ property }) => property
      )}`
    )
  }
}
