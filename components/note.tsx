import Image from 'next/image'
import { Dispatch, FocusEventHandler, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import { addNoteData } from '..';
import { useNoteStore } from '../stores/useNoteStore';
import s from '../styles/components/note.module.scss'
interface Prop {
    top?: number,
    left?: number,
    text?: string,
    id?: number,
    height?: number,
    onClick?: MouseEventHandler<HTMLDivElement>,
    changeText?: Dispatch<SetStateAction<{ id: number; text: string; height: number }[]>>
    addNote?: Dispatch<SetStateAction<addNoteData>>
}
export default function Note(prop: Prop) {
    const { patchNote: webPatchNote } = useNoteStore()
    const [patchNote, setPatchNote] = useState<{ noteId: number, text: string, height: number }>({ noteId: 0, text: '', height: 0 })
    const [isOnChange, setIsOnChange] = useState(false)
    const onFocus: FocusEventHandler = (e) => {
        setPatchNote({ noteId: 0, text: '', height: 0 })
        setPatchNote(data => ({ ...data, noteId: +e.target.id }))
        setIsOnChange(true)
    }

    const changeText = (e: React.FormEvent<HTMLDivElement>): void => {
        const innerText = (e.target as HTMLDivElement).innerText
        const replaceText = innerText.replaceAll(/\n/g, '<br/>')
        if (prop.addNote) {
            if ((e.target as HTMLDivElement).innerText) {
                prop.addNote(data => ({ ...data, text: replaceText }))
            }
        } else {
            setPatchNote(data => ({ ...data, text: replaceText }))
        }
    }
    const isNotFocus: FocusEventHandler = (e) => {
        console.dir(e.target.clientHeight)
        setPatchNote(data => ({ ...data, height: e.target.clientHeight + 25 }))
        setIsOnChange(false)
    }
    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (!isOnChange && patchNote.text !== '' && jwt) {
            webPatchNote(patchNote, jwt)
        }
        console.log(patchNote)
    }, [patchNote, isOnChange, webPatchNote])
    return (
        <div className={s.wrapper} style={{ top: prop.top, left: prop.left }}>
            <div className={s.navBar}>
                <Image id={prop.id?.toString()} src="/close.svg" width={20} height={20} alt="close" priority property="true" onClick={prop.onClick} />
            </div>
            <div id={prop.id?.toString()} className={s.textarea} onInput={changeText} onFocus={onFocus} onBlur={isNotFocus} contentEditable dangerouslySetInnerHTML={{ __html: prop.text || '' }} />
        </div>
    )
}