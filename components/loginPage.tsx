import { createPortal } from "react-dom"
import { createRoot } from "react-dom/client"
import s from '../styles/components/LoginPage.module.scss'
import Image from "next/image"
import { useState } from "react"

type Prop = {
    closeLoginPage: () => void,
    maskClick: () => void
}
export default function LoginPage(prop: Prop) {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const changeState = () => {
        setIsLogin(!isLogin)
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
                        <form className={s.formWrapper}>
                            <input title="username" type="text" placeholder="用户名" />
                            <input title="userpassword" type="password" placeholder="密码" autoComplete="cc-number" />
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
                            <form className={s.formWrapper}>
                                <input title="username" type="text" placeholder="用户名" />
                                <input title="userpassword" type="password" placeholder="密码" autoComplete="cc-number" />
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