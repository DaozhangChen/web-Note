import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { addNoteData } from '..';
import s from '../styles/components/note.module.scss'
interface Prop {
    top?: number,
    left?: number,
    text?: string,
    id?: number,
    height?: number,
    onClick?: () => void,
    changeText?: Dispatch<SetStateAction<{ id: number; text: string; height: number }[]>>
    addNote?: Dispatch<SetStateAction<addNoteData>>
}
export default function Note(prop: Prop) {
    const refDiv = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>()
    const onFocus = () => {
    }

    const changeText = (e: React.FormEvent<HTMLDivElement>): void => {
        if (prop.addNote) {
            if (e.currentTarget.innerText) {
                const innerText = e.currentTarget.innerText
                const replaceText = innerText.replaceAll(/\n/g, '<br/>')
                prop.addNote(data => ({ ...data, text: replaceText }))
            }
        }
    }
    const isNotFocus = () => {
        if (refDiv.current) {
            setHeight(refDiv.current.clientHeight)
            prop.addNote?.(data => ({ ...data, height: refDiv.current!.clientHeight }))
        }
    }
    return (
        <div className={s.wrapper} style={{ top: prop.top, left: prop.left }} ref={refDiv}>
            <div className={s.navBar}>
                <Image src="/close.svg" width={20} height={20} alt="close" priority property="true" onClick={prop.onClick} />
            </div>
            <div className={s.textarea} onInput={changeText} onFocus={onFocus} onBlur={isNotFocus} contentEditable dangerouslySetInnerHTML={{ __html: prop.text || '' }} />
        </div>
    )
}