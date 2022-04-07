import { IResourceSchema } from '@/domain/base/schemas/resource'

export interface IBaseImageSchema extends IResourceSchema {
    id: string
    name: string
}
export interface IDeviceSchema extends IResourceSchema {
    id: string
    name: string
}
