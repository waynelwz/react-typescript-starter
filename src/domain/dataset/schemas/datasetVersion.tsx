import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'

export interface IDatasetVersionSchema extends IResourceSchema {
    name: string
    tag: string
    createTime: string
    meta: object
    owner?: IUserSchema
}

export interface IDatasetVersionDetailSchema extends IDatasetVersionSchema {
    datasetName?: string
}

export interface IUpdateDatasetVersionSchema {
    tag: string
}

export interface ICreateDatasetVersionSchema {
    datasetName: string
    zipFile?: File
    importPath?: string
}