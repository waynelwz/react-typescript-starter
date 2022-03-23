import { IResourceSchema } from '@/schemas/resource'
import { IUserSchema } from '@user/schemas/user'

export interface IAwsS3Schema {
    models_bucket_name: string
    region: string
}

export interface IAwsECRSchema {
    account_id: string
    models_repository_name: string
    password: string
    region: string
}

export interface IProjectAwsConfigSchema {
    access_key_id: string
    secret_access_key: string
    s3?: IAwsS3Schema
    ecr?: IAwsECRSchema
}

export interface IProjectS3Schema {
    endpoint: string
    access_key: string
    secret_key: string
    secure: boolean
    region: string
    models_bucket_name: string
}

export interface IProjectDockerRegistrySchema {
    models_repository_uri: string
    server: string
    username: string
    password: string
    secure: boolean
}

export interface IProjectConfigSchema {
    major_cluster_uid?: string
    aws?: IProjectAwsConfigSchema
    s3?: IProjectS3Schema
    docker_registry?: IProjectDockerRegistrySchema
}

export interface IProjectSchema extends IResourceSchema {
    creator?: IUserSchema
    description: string
}

export interface IProjectFullSchema extends IProjectSchema {
    config?: IProjectConfigSchema
}

export interface IUpdateProjectSchema {
    description?: string
    config?: IProjectConfigSchema
}

export interface ICreateProjectSchema {
    name: string
    description?: string
    config?: IProjectConfigSchema
}
