import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'

export interface IModelVersionSchema extends IResourceSchema {
    name: string
    tag: string
    createTime: string
    meta: object
    owner?: IUserSchema
}

export interface IModelVersionDetailSchema extends IModelVersionSchema {
    modelName?: string
}

export interface IUpdateModelVersionSchema {
    tag: string
}

export interface ICreateModelVersionSchema {
    modelName: string
    zipFile?: File
    importPath?: string
}
