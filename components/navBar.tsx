import s from '../styles/components/navBar.module.scss'

export default function NavBar() {
    return (
        <div className={s.wrapper}>
            <button type="button">添加标签</button>
            <div>
                <span>用户名</span>
                <button type='button'>登录</button>
            </div>
        </div>
    )
}