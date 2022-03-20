import { IClusterSchema } from '@/schemas/cluster'
import { IOrganizationSchema } from '@/schemas/organization'
import { IUserSchema } from '@/schemas/user'
import { IResourceSchema } from '@/schemas/resource'

export interface ITerminalRecordSchema extends IResourceSchema {
    creator?: IUserSchema
    organization?: IOrganizationSchema
    cluster?: IClusterSchema
    resource?: IResourceSchema
    pod_name: string
    container_name: string
}
