import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react';
import s from '../styles/components/note.module.scss'
interface Prop {
    top: number,
    left: number,
    text: string,
    changeText: Dispatch<SetStateAction<{ id: number; top: number; left: number; text: string; }[]>>
}
export default function Note(prop: Prop) {
    const changeText = (e: React.FormEvent<HTMLDivElement>): void => {
        console.log(e.currentTarget.innerText)
    }
    return (
        <div className={s.wrapper} style={{ top: prop.top, left: prop.left }}>
            <div className={s.navBar}>
                <Image src="/close.svg" width={20} height={20} alt="close" priority property="true" />
            </div>
            <div className={s.textarea} onInput={changeText} contentEditable dangerouslySetInnerHTML={{ __html: prop.text }} />
        </div>
    )
}