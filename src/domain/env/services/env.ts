import axios from 'axios'
import { IUserSchema } from '@user/schemas/user'
import { IBaseImageSchema, IDeviceSchema } from '../schemas/env'

export async function envBaseImage(data: IBaseImageSchema): Promise<IUserSchema> {
    const resp = await axios.post('/api/v1/env/baseImage', data)
    return resp.data
}

export async function envDevice(data: IDeviceSchema): Promise<IUserSchema> {
    const resp = await axios.post('/api/v1/env/baseImage', data)
    return resp.data
}
