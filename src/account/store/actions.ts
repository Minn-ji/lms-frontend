import { ActionContext } from "vuex"
import { AccountState } from "./states"
import axiosInst from "@/utility/axiosInstance"

export type AccountActions = {
    requestEmailDuplicationCheckToDjango(context: ActionContext<AccountState, any>, email: string): Promise<boolean>
    requestCreateNewAccountToDjango(context: ActionContext<AccountState, any>, accountInfo: { email: string, password: string, nickname: string }): Promise<void>
    requestNormalLoginToDjango(context: ActionContext<AccountState, any>, accountInfo: { email: string, password: string }): Promise<void>
    requestGoogleLoginToDjango(context: ActionContext<AccountState, any>, googleInfo: { credential: string, clientId: string }): Promise<any>
    requestCreateNewSocialAccountToDjango(context: ActionContext<AccountState, any>, email: string): Promise<void>
    requestEmailLoginTypeToDjango(context: ActionContext<AccountState, any>, email: string): Promise<void>
    requestNickNameDuplicationCheckToDjango(context: ActionContext<AccountState, any>, nickname: string): Promise<boolean>
    requestChangePasswordToDjango(context: ActionContext<AccountState, any>, accountInfo: { email: string, password: string }): Promise<boolean>
    requestGetProfileImgToDjango(context: ActionContext<AccountState, any>, email: string): Promise<void>
    requestSetProfileImgToDjango(context: ActionContext<AccountState, any>, accountInfo: { email: string, img_id: string }): Promise<void>
    requestAccountCreateTimeToDjango(context: ActionContext<AccountState, any>, email: string): Promise<void>
}
const actions: AccountActions = {
    async requestEmailDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>, email: string
    ): Promise<boolean> {

        const response = await axiosInst.djangoAxiosInst.post(
            '/account/email-duplication-check', { email })
        return response.data.isDuplicate
    },
    async requestCreateNewAccountToDjango(context: ActionContext<AccountState, any>,
        accountInfo: { email: string, password: string, nickname: string }): Promise<void> {
        try {
            alert('신규 계정이 생성되었습니다!')
            await axiosInst.djangoAxiosInst.post('/account/register', accountInfo)
        } catch (error) {
            console.error('신규 계정 생성 실패:', error)
            throw error
        }
    },
    async requestNormalLoginToDjango(context: ActionContext<AccountState, any>,
        accountInfo: { email: string, password: string }): Promise<void> {
        try {
            const response = await axiosInst.djangoAxiosInst.post('/account/login', accountInfo);
            return response.data
        } catch (error) {
            console.error('로그인 실패:', error);
            throw error;
        }
    },
    async requestGoogleLoginToDjango(
        context: ActionContext<AccountState, any>,
        googleInfo: { credential: string, clientId: string }
    ): Promise<any> {
        try {
            const response = await axiosInst.djangoAxiosInst.post(
                '/google_oauth/login', googleInfo)
            return response.data
        } catch (error) {
            console.error('Google 로그인 실패:', error)
            throw error
        }
    },
    async requestCreateNewSocialAccountToDjango(
        context: ActionContext<AccountState, any>, email: string
    ): Promise<void> {

        const response = await axiosInst.djangoAxiosInst.post(
            '/account/register-social', { email })
        return response.data
    },
    async requestEmailLoginTypeToDjango(
        context: ActionContext<AccountState, any>, email: string
    ): Promise<void> {

        const response = await axiosInst.djangoAxiosInst.post(
            '/account/login-type', { email })
        return response.data
    },
    async requestNickNameDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>, nickname: string
    ): Promise<boolean> {

        const response = await axiosInst.djangoAxiosInst.post(
            '/account/nickname-duplication-check', { nickname })
        return response.data.isNickNameDuplicate
    },
    async requestChangePasswordToDjango(context: ActionContext<AccountState, any>,
        accountInfo: { email: string, password: string }): Promise<boolean> {
        try {
            const response = await axiosInst.djangoAxiosInst.post('/account/change-new-password', accountInfo);
            return response.data.success
        } catch (error) {
            console.error('requestChangePasswordToDjango 실패', error);
            throw error;
        }
    },
    async requestGetProfileImgToDjango(context: ActionContext<AccountState, any>,
        email: string): Promise<void> {

        const response = await axiosInst.djangoAxiosInst.post(
            '/account/get-profile-img', { email })

        return response.data.getProfileImg
    },
    async requestSetProfileImgToDjango(context: ActionContext<AccountState, any>, accountInfo: { email: string, img_id: string }): Promise<void> {

        const response = await axiosInst.djangoAxiosInst.post(
            '/account/set-profile-img', accountInfo)

        return response.data.setProfileImg
    },
    async requestAccountCreateTimeToDjango(
        context: ActionContext<AccountState, any>, email: string
    ): Promise<void> {

        const response = await axiosInst.djangoAxiosInst.post(
            '/account/account-create-time', { email })
        return response.data.getCreateTime
    },
};

export default actions;