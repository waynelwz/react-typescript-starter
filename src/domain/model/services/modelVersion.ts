import axios from 'axios'
import {
    ICreateModelVersionSchema,
    IModelVersionSchema,
    IUpdateModelVersionSchema,
    IModelVersionDetailSchema,
} from '../schemas/modelVersion'
import { IListQuerySchema, IListSchema } from '@/schemas/list'
import { IEventSchema } from '@/schemas/event'
import { ResourceType } from '@/schemas/resource'

export async function listModelVersions(
    projectId: string,
    modelId: string,
    query: IListQuerySchema
): Promise<IListSchema<IModelVersionSchema>> {
    const resp = await axios.get<IListSchema<IModelVersionSchema>>(`/project/${projectId}/model/${modelId}/version`, {
        params: query,
    })
    return resp.data
}

export async function fetchModelVersion(projectId: string, modelId: string, modelVersionId: string): Promise<any> {
    const resp = await axios.get<IModelVersionDetailSchema>(
        `/project/${projectId}/model/${modelId}/version/${modelVersionId}`
    )
    return resp.data
}

export async function createModelVersion(
    projectId: string,
    modelId: string,
    data: ICreateModelVersionSchema
): Promise<IModelVersionSchema> {
    var bodyFormData = new FormData()
    data.importPath && bodyFormData.append('importPath', data.importPath)
    data.zipFile && bodyFormData.append('zipFile', data.zipFile)

    const resp = await axios({
        method: 'post',
        url: `/project/${projectId}/model/${modelId}`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    return resp.data
}

export async function updateModelVersion(
    projectId: string,
    modelId: string,
    modelVersionId: string,
    data: IUpdateModelVersionSchema
): Promise<IModelVersionSchema> {
    const resp = await axios.patch<IModelVersionSchema>(
        `/project/${projectId}/model/${modelId}/version/${modelVersionId}`,
        data
    )
    return resp.data
}

export async function revertModelVersion(
    projectId: string,
    modelId: string,
    modelVersionId: string
): Promise<IModelVersionSchema> {
    const resp = await axios.patch<IModelVersionSchema>(
        `/project/${projectId}/model/${modelId}/version/${modelVersionId}/revert`
    )
    return resp.data
}
