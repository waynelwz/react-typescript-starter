import { IModelWithRepositorySchema } from './model'
import { IModelRepositorySchema } from './model_repository'
import { IUserSchema } from './user'

export interface IEventSchema {
    name: string
    operation_name: string
    resource?: IModelWithRepositorySchema | IModelRepositorySchema
    updated_at: string
    creator?: IUserSchema
}
