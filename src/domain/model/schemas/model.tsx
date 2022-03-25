import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'

export interface IModelSchema extends IResourceSchema {
    name: string
    createTime: string
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
