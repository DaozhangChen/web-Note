import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import s from '../styles/components/note.module.scss'
interface Prop {
    top: number,
    left: number,
    text: string,
    id: number,
    height: number,
    changeText: Dispatch<SetStateAction<{ id: number; text: string; height: number }[]>>
}
export default function Note(prop: Prop) {
    const refDiv = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>()

    const changeText = (e: React.FormEvent<HTMLDivElement>): void => {
        // console.log(e.currentTarget.innerText)
    }
    const isNotFocus = () => {
        if (refDiv.current) {
            setHeight(refDiv.current.clientHeight)
        }
    }
    return (
        <div className={s.wrapper} style={{ top: prop.top, left: prop.left, height: prop.height }} ref={refDiv}>
            <div className={s.navBar}>
                <Image src="/close.svg" width={20} height={20} alt="close" priority property="true" />
            </div>
            <div className={s.textarea} onInput={changeText} onBlur={isNotFocus} contentEditable dangerouslySetInnerHTML={{ __html: prop.text }} />
        </div>
    )
}