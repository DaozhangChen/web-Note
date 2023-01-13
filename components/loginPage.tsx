import { createPortal } from "react-dom"
import { createRoot } from "react-dom/client"
import s from '../styles/components/LoginPage.module.scss'

export default function LoginPage() {
    return (
        createPortal(
            <>
                <div className={s.mask} />
                <div className={s.mainWrapper}>LoginPage</div>
            </>, document.body)
    )
}

export const openLoginPage = () => {
    const container = <LoginPage />
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(container)
}