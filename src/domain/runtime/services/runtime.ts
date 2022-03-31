import { IListQuerySchema, IListSchema } from '@/schemas/list'
import axios from 'axios'
import { IBaseImageSchema, IDeviceSchema } from '../schemas/runtime'

export async function listBaseImages(query: IListQuerySchema): Promise<IListSchema<IBaseImageSchema>> {
    const resp = await axios.get('/api/v1/runtime/baseImage', {
        params: query,
    })
    return resp.data
}

export async function listDevices(query: IListQuerySchema): Promise<IListSchema<IDeviceSchema>> {
    const resp = await axios.get('/api/v1/runtime/device', {
        params: query,
    })
    return resp.data
}