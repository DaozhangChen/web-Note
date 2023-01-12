import Image from 'next/image'
import s from '../styles/components/note.module.scss'
export default function Note() {
    return (
        <div className={s.wrapper}>
            <div className={s.navBar}>
                <Image src="/close.svg" width={20} height={20} alt="close" priority property="true" />
            </div>
            <div className={s.textarea} contentEditable />
        </div>
    )
}