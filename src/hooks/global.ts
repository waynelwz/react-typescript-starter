import { createGlobalState } from 'react-hooks-global-state'
import { IUserSchema } from '@user/schemas/user'
import { IProjectSchema } from '@project/schemas/project'
import { IModelDetailSchema } from '@model/schemas/model'
import { IModelVersionDetailSchema } from '@model/schemas/modelVersion'

export type BaseThemeType = 'light' | 'dark' | 'deep'
export type ThemeType = BaseThemeType | 'followTheSystem'

const initialState = {
    themeType: 'light' as ThemeType,
    currentUser: undefined as IUserSchema | undefined,
    user: undefined as IUserSchema | undefined,
    userLoading: false,
    project: undefined as IProjectSchema | undefined,
    projectLoading: false,
    model: undefined as IModelDetailSchema | undefined,
    modelLoading: false,
    modelVersion: undefined as IModelVersionDetailSchema | undefined,
    modelVersionLoading: false,
}

const { useGlobalState } = createGlobalState(initialState)
export default useGlobalState
