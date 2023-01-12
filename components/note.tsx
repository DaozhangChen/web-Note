import Image from 'next/image'
import s from '../styles/components/note.module.scss'
export default function Note() {
    return (
        <div className={s.wrapper}>
            <div className={s.navBar}><Image src="/close.svg" width={20} height={20} alt="close" /></div>
            <div>这里是主要内容</div>
        </div>
    )
}