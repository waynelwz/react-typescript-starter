/* eslint-disable import/no-cycle */
import { IModelSchema } from './model'
import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@/domain/user/schemas/user'

export interface IModelRepositorySchema extends IResourceSchema {
    latest_model?: IModelSchema
    creator?: IUserSchema
    description?: string
}

export interface ICreateModelRepositorySchema {
    name: string
    description?: string
}

export interface IUpdateModelRepositorySchema {
    description?: string
}
