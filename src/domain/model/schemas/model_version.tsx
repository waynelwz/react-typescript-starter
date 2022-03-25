import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'

export interface IModelVersionSchema extends IResourceSchema {
    name: string
    tag: string
    createTime: string
    meta: object
    owner?: IUserSchema
    // description: string
}

// export interface IModelFullSchema extends IModelSchema {
//     config?: IModelConfigSchema
// }

export interface IUpdateModelSchema {
    description?: string
    // config?: IModelConfigSchema
}

export interface ICreateModelSchema {
    name: string
    description?: string
    // config?: IModelConfigSchema
}
