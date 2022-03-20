import { IClusterFullSchema } from '@/schemas/cluster'
import { createGlobalState } from 'react-hooks-global-state'
import { IUserSchema } from '@/schemas/user'
import { IOrganizationFullSchema } from '@/schemas/organization'
import { IModelRepositorySchema } from '@/schemas/model_repository'
import { IModelFullSchema } from '@/schemas/model'

export type BaseThemeType = 'light' | 'dark' | 'deep'
export type ThemeType = BaseThemeType | 'followTheSystem'

const initialState = {
    themeType: 'light' as ThemeType,
    currentUser: undefined as IUserSchema | undefined,
    user: undefined as IUserSchema | undefined,
    userLoading: false,
    organization: undefined as IOrganizationFullSchema | undefined,
    organizationLoading: false,
    modelRepository: undefined as IModelRepositorySchema | undefined,
    modelRepositoryLoading: false,
    model: undefined as IModelFullSchema | undefined,
    modelLoading: false,
}

const { useGlobalState } = createGlobalState(initialState)
export default useGlobalState
