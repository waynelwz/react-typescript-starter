/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { ILabelItemSchema } from '@/schemas/label'
import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'

export type ModelUploadStatus = 'pending' | 'uploading' | 'success' | 'failed'

export interface IModelManifestSchema {
    bentoml_version: string
    api_version: string
    module: string
    metadata: {
        [key: string]: any
    }
    context: {
        [key: string]: any
    }
    options: {
        [key: string]: any
    }
    size_bytes: number
}

export interface IModelSchema extends IResourceSchema {
    creator?: IUserSchema
    version: string
    description?: string
    manifest: IModelManifestSchema
    upload_status: ModelUploadStatus
    upload_started_at?: string
    upload_finished_at?: string
    upload_finished_reason?: string
    presigned_s3_uri: string
    build_at: string
}
export interface ICreateModelSchema {
    version: string
    manifest: IModelManifestSchema
    description?: string
}

export interface IUpdateModelSchema {
    description?: string
    manifest: IModelManifestSchema
    labels: ILabelItemSchema[]
}

export interface IFinishedUploadModelSchema {
    status?: ModelUploadStatus
    reason?: string
}
