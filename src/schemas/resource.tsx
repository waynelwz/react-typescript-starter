import { IBaseSchema } from './base'
import { LabelItemsSchema } from './label'

export type ResourceType = 'user' | 'user_group' | 'organization'

export interface IResourceSchema extends IBaseSchema {
    name: string
    resource_type: ResourceType
    labels: LabelItemsSchema
}
