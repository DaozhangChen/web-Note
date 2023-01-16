import { createPortal } from "react-dom"
import { createRoot } from "react-dom/client"
import s from '../styles/components/LoginPage.module.scss'
import Image from "next/image"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { errorMessage, formData } from ".."
import { validateData } from "../helper/validateData"

type Prop = {
    closeLoginPage: () => void,
    maskClick: () => void
}

export default function LoginPage(prop: Prop) {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [formData, setFormData] = useState<formData>({ username: '', password: '' })
    const [errorMessage, setErrorMessage] = useState<errorMessage>()
    const changeState = () => {
        setIsLogin(!isLogin)
    }
    const changeData = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.title
        name === 'username'
            ? setFormData(i => ({ ...i, username: e.target.value }))
            : setFormData(i => ({ ...i, password: e.target.value }))
    }
    const registerUser = (e: FormEvent) => {
        e.preventDefault()
        setErrorMessage({})
        const error = validateData(formData)
        if (error.nameError || error.pwdError) {
            setErrorMessage(error)
            return undefined
        }
        fetch('/api/register', { method: 'post', body: JSON.stringify(formData) })
            .then((data) => { return data.json() })
            .then((data) => {
                if (data.error) {
                    setErrorMessage(i => ({ ...i, nameError: data.error }))
                } else {
                    window.alert('注册成功，自动为您跳转至登录页面')
                    setIsLogin(true)
                }
            })
        return true
    }
    const loginUser = (e: FormEvent) => {
        e.preventDefault()
        const error = validateData(formData)
        if (error.nameError || error.pwdError) {
            setErrorMessage(error)
            return false
        }
        fetch('/api/login', { method: 'post', body: JSON.stringify(formData) })
            .then((data) => { return data.json() })
            .then((data) => {
                if (data.error) {
                    setErrorMessage(i => ({ ...i, nameError: data.error }))
                } else {
                    localStorage.setItem('jwt', data)
                    window.alert('登录成功')
                    location.reload()
                }
            })
        return true
    }
    return (
        createPortal(
            <>{
                isLogin ? <>
                    <div className={s.mask} onClick={prop.maskClick} />
                    <div className={s.mainWrapper}>
                        <div className={s.title}>
                            <div>
                                <span> 登 录 </span>
                                <span className={s.registerText} onClick={changeState}>点此注册</span>
                            </div>
                            <Image src="/close.svg" width={30} height={30} alt="close" priority property="true" onClick={prop.closeLoginPage} />
                        </div>
                        <form className={s.formWrapper} onSubmit={loginUser}>
                            <div className={s.inputWrapper}>
                                <input title="username" type="text" placeholder="用户名" onChange={changeData} />
                                <span>{errorMessage?.nameError}</span>
                            </div>
                            <div className={s.inputWrapper}>
                                <input title="userpassword" type="password" placeholder="密码" autoComplete="cc-number" onChange={changeData} />
                                <span>{errorMessage?.pwdError}</span>
                            </div>
                            <button title="submit" type="submit">登  录</button>
                        </form>
                    </div>
                </> :
                    <><div className={s.mask} onClick={prop.maskClick} />
                        <div className={s.mainWrapper}>
                            <div className={s.title}>
                                <div>
                                    <span > 注 册 </span>
                                    <span className={s.registerText} onClick={changeState}>点此登录</span>
                                </div>
                                <Image src="/close.svg" width={30} height={30} alt="close" priority property="true" onClick={prop.closeLoginPage} />
                            </div>
                            <form className={s.formWrapper} onSubmit={registerUser}>
                                <div className={s.inputWrapper}>
                                    <input title="username" type="text" placeholder="用户名" onChange={changeData} />
                                    <span>{errorMessage?.nameError}</span>
                                </div>
                                <div className={s.inputWrapper}>
                                    <input title="userpassword" type="password" placeholder="密码" autoComplete="cc-number" onChange={changeData} />
                                    <span>{errorMessage?.pwdError}</span>
                                </div>
                                <button title="submit" type="submit">注  册</button>
                            </form>
                        </div></>
            }

            </>, document.body)
    )
}

export const openLoginPage = () => {
    const container = <LoginPage maskClick={() => root.unmount()} closeLoginPage={() => root.unmount()} />
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(container)
}