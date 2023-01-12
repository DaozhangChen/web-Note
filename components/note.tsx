import Image from 'next/image'
import s from '../styles/components/note.module.scss'
interface Prop {
    top: number,
    left: number,
    text: string
}
export default function Note(prop: Prop) {
    return (
        <div className={s.wrapper} style={{ top: prop.top, left: prop.left }}>
            <div className={s.navBar}>
                <Image src="/close.svg" width={20} height={20} alt="close" priority property="true" />
            </div>
            <div className={s.textarea} contentEditable dangerouslySetInnerHTML={{ __html: prop.text }} />
        </div>
    )
}