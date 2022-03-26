import axios from 'axios'
import {
    ICreateDatasetVersionSchema,
    IDatasetVersionSchema,
    IUpdateDatasetVersionSchema,
    IDatasetVersionDetailSchema,
} from '../schemas/datasetVersion'
import { IListQuerySchema, IListSchema } from '@/schemas/list'
import { IEventSchema } from '@/schemas/event'
import { ResourceType } from '@/schemas/resource'

export async function listDatasetVersions(
    projectId: string,
    datasetId: string,
    query: IListQuerySchema
): Promise<IListSchema<IDatasetVersionSchema>> {
    const resp = await axios.get<IListSchema<IDatasetVersionSchema>>(
        `/project/${projectId}/dataset/${datasetId}/version`,
        {
            params: query,
        }
    )
    return resp.data
}

export async function fetchDatasetVersion(
    projectId: string,
    datasetId: string,
    datasetVersionId: string
): Promise<any> {
    const resp = await axios.get<IDatasetVersionDetailSchema>(
        `/project/${projectId}/dataset/${datasetId}/version/${datasetVersionId}`
    )
    return resp.data
}

export async function createDatasetVersion(
    projectId: string,
    datasetId: string,
    data: ICreateDatasetVersionSchema
): Promise<IDatasetVersionSchema> {
    var bodyFormData = new FormData()
    data.importPath && bodyFormData.append('importPath', data.importPath)
    data.zipFile && bodyFormData.append('zipFile', data.zipFile)

    const resp = await axios({
        method: 'post',
        url: `/project/${projectId}/dataset/${datasetId}`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    return resp.data
}

export async function updateDatasetVersion(
    projectId: string,
    datasetId: string,
    datasetVersionId: string,
    data: IUpdateDatasetVersionSchema
): Promise<IDatasetVersionSchema> {
    const resp = await axios.patch<IDatasetVersionSchema>(
        `/project/${projectId}/dataset/${datasetId}/version/${datasetVersionId}`,
        data
    )
    return resp.data
}

export async function revertDatasetVersion(
    projectId: string,
    datasetId: string,
    datasetVersionId: string
): Promise<IDatasetVersionSchema> {
    const resp = await axios.patch<IDatasetVersionSchema>(
        `/project/${projectId}/dataset/${datasetId}/version/${datasetVersionId}/revert`
    )
    return resp.data
}
