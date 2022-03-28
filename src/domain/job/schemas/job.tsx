import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'
import { IModelSchema } from '@model/schemas/model'
import { IDatasetSchema } from '@dataset/schemas/dataset'
import { IModelVersionSchema } from '@/domain/model/schemas/modelVersion'

export type JobStatusType = 'preparing' | 'runnning' | 'completed' | 'cancelling' | 'cancelled' | 'failed'

export interface IImageSchema extends IResourceSchema {
    id: string
    name: string
}

export interface IDeviceSchema extends IResourceSchema {
    id: string
    name: string
}

export interface IJobSchema extends IResourceSchema {
    uuid: string
    name: string
    owner?: IUserSchema
    model?: IModelSchema
    modelVersion?: IModelVersionSchema
    dataset?: IDatasetSchema
    baseImage?: IImageSchema
    device?: IDeviceSchema
    deviceCount: number
    duration: string
    createTime: string
    stopTime: string
    status: JobStatusType
}

export interface IJobDetailSchema extends IJobSchema {}

export interface IUpdateJobSchema {}

export interface ICreateJobSchema {
    modelVersionId: string
    datasetVersionIds?: string
    baseImageId?: string
    deviceId?: string
    deviceCount?: number
}

export interface IJobFormSchema extends IJobSchema {
    modelId: string
    datasetId: string
    datasetVersionId: string
}
export interface ICreateJobFormSchema extends ICreateJobSchema {
    modelId: string
    datasetId: string
    datasetVersionId: string
}
