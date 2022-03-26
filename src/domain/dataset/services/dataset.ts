import axios from 'axios'
import { ICreateDatasetSchema, IDatasetSchema, IUpdateDatasetSchema, IDatasetDetailSchema } from '../schemas/dataset'
import { IListQuerySchema, IListSchema } from '@/schemas/list'
import { IEventSchema } from '@/schemas/event'
import { ResourceType } from '@/schemas/resource'

export async function listDatasets(projectId: string, query: IListQuerySchema): Promise<IListSchema<IDatasetSchema>> {
    const resp = await axios.get<IListSchema<IDatasetSchema>>(`/project/${projectId}/dataset`, {
        params: query,
    })
    return resp.data
}

export async function fetchDataset(projectId: string, datasetId: string): Promise<any> {
    const resp = await axios.get<IDatasetDetailSchema>(`/project/${projectId}/dataset/${datasetId}`)
    return resp.data
}

export async function createDataset(projectId: string, data: ICreateDatasetSchema): Promise<IDatasetSchema> {
    var bodyFormData = new FormData()
    bodyFormData.append('datasetName', data.datasetName)
    data.importPath && bodyFormData.append('importPath', data.importPath)
    data.zipFile && bodyFormData.append('zipFile', data.zipFile)

    const resp = await axios({
        method: 'post',
        url: `/project/${projectId}/dataset`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    return resp.data
}

// export async function updateDataset(data: IUpdateDatasetSchema): Promise<IDatasetSchema> {
//     const resp = await axios.patch<IDatasetSchema>('/api/v1/current_org', data)
//     return resp.data
// }
