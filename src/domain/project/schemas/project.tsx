import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'

export interface IProjectSchema extends IResourceSchema {
    name: string
    createTime: string
    owner?: IUserSchema
    // description: string
}

// export interface IProjectFullSchema extends IProjectSchema {
//     config?: IProjectConfigSchema
// }

export interface IUpdateProjectSchema {
    description?: string
    // config?: IProjectConfigSchema
}

export interface ICreateProjectSchema {
    name: string
    description?: string
    // config?: IProjectConfigSchema
}
