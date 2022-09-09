import { defineStore } from "pinia";
import { setToken, removeToken } from '@/utils/auth'
import {getInfo, login} from '@/api/login'

const useUserStore = defineStore('user', {
    state: () => {
        return {
            userInfo: {},
            roles: [],
            permissions: [],
            token: '',
        }
    },

    getters: {
        userProfile: state => state.userInfo
    },

    actions: {
        async getUesrInfo() {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await getInfo()
                    if(res.code == 200) {
                        this.userInfo = res.user;
                        this.permissions = res.permissions;
                        this.roles = res.roles;
                        resolve(res)
                    } else {
                        reject(error)
                    }
                } catch (error) {
                    reject(error)
                }
            })
        },

        async Login(userForm) {
            return new Promise(async (resolve, reject) => {
                const {username, password, code, uuid} = userForm
                try {
                    const res = await login({username, password, code, uuid})
                    setToken(res.token)
                    this.token = res.token
                    resolve(res)
                } catch (error) {
                    reject(error)
                }
            })
        },

        Logout() {
            this.userInfo =  {};
            this.roles = [];
            this.permissions = [];
            this.token = '';
            removeToken()
        }
    },
})

export default useUserStore

