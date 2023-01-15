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
    const [isOnChange, setIsOnChange] = useState<boolean>(false)
    const refDiv = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>()
    const onFocus = () => {
        setIsOnChange(true)
    }

    const changeText = (e: React.FormEvent<HTMLDivElement>): void => {
        setIsOnChange(true)
        if (prop.addNote) {
            if (e.currentTarget.innerText) {
                const innerText = e.currentTarget.innerText
                prop.addNote(data => ({ ...data, text: innerText }))
            }
        }
        // console.log(e.currentTarget.innerText)

    }
    const isNotFocus = () => {
        if (refDiv.current) {
            setHeight(refDiv.current.clientHeight)
            prop.addNote?.(data => ({ ...data, height: refDiv.current!.clientHeight }))
        }
        setIsOnChange(false)
    }
    return (
        <div className={s.wrapper} style={isOnChange ? { top: prop.top, left: prop.left, height } : { top: prop.top, left: prop.left, height: prop.height }} ref={refDiv}>
            <div className={s.navBar}>
                <Image src="/close.svg" width={20} height={20} alt="close" priority property="true" onClick={prop.onClick} />
            </div>
            <div className={s.textarea} onInput={changeText} onFocus={onFocus} onBlur={isNotFocus} contentEditable dangerouslySetInnerHTML={{ __html: prop.text || '' }} />
        </div>
    )
}