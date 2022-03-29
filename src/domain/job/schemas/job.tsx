import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'
import { IModelSchema } from '@model/schemas/model'
import { IDatasetSchema } from '@dataset/schemas/dataset'
import { IModelVersionSchema } from '@/domain/model/schemas/modelVersion'
import { IBaseImageSchema, IDeviceSchema } from '../../env/schemas/env'

export type JobStatusType = 'preparing' | 'runnning' | 'completed' | 'cancelling' | 'cancelled' | 'failed'

export interface IJobSchema extends IResourceSchema {
    uuid: string
    name: string
    owner?: IUserSchema
    model?: IModelSchema
    modelVersion?: IModelVersionSchema
    dataset?: IDatasetSchema
    baseImage?: IBaseImageSchema
    device?: IDeviceSchema
    deviceCount: number
    duration: string
    createTime: number
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
