import { createPortal } from "react-dom"
import { createRoot } from "react-dom/client"
import s from '../styles/components/LoginPage.module.scss'
import Image from "next/image"

type Prop = {
    closeLoginPage: () => void
}
export default function LoginPage(prop: Prop) {
    return (
        createPortal(
            <>
                <div className={s.mask} />
                <div className={s.mainWrapper}>
                    <div className={s.title}>
                        <span>在此登录</span>
                        <Image src="/close.svg" width={20} height={20} alt="close" priority property="true" onClick={prop.closeLoginPage} />
                    </div>
                    <form>
                        <input title="username" type="text" />
                        <input title="userpassword" type="password" autoComplete="cc-number" />
                        <button title="submit" type="submit">登录</button>
                    </form>
                </div>
            </>, document.body)
    )
}

export const openLoginPage = () => {
    const container = <LoginPage closeLoginPage={() => root.unmount()} />
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(container)
}