import Image from 'next/image'
import { Dispatch, FocusEventHandler, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import { addNoteData } from '..';
import { useMeStore } from '../stores/useMeStore';
import { useNoteStore } from '../stores/useNoteStore';
import s from '../styles/components/note.module.scss'
interface Prop {
    top?: number,
    left?: number,
    text?: string,
    id?: number,
    height?: number,
    color?: string,
    zIndex?: number,
    onClick?: MouseEventHandler<HTMLDivElement>,
    changeText?: Dispatch<SetStateAction<{ id: number; text: string; height: number }[]>>
    addNote?: Dispatch<SetStateAction<addNoteData>>
}
export default function Note(prop: Prop) {
    const { patchNote: webPatchNote, syncPatchNote } = useNoteStore()
    const { jwt: trueJwt } = useMeStore()
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
                prop.addNote({ height: (e.target as HTMLDivElement).clientHeight + 25, text: replaceText })
            }
        } else {
            setPatchNote(data => ({ ...data, height: (e.target as HTMLDivElement).clientHeight + 25, text: replaceText }))
        }

    }
    const isNotFocus: FocusEventHandler = (e) => {
        setPatchNote(data => ({ ...data, height: e.target.clientHeight + 25 }))
        setIsOnChange(false)
    }
    useEffect(() => {
        if (patchNote.text !== '') {
            syncPatchNote(patchNote)
        }
    }, [patchNote, syncPatchNote])
    useEffect(() => {
        const jwt = localStorage.getItem('jwt')
        if (!isOnChange && patchNote.text !== '' && jwt && trueJwt) {
            webPatchNote(patchNote, jwt)
            window.alert('????????????')
            location.reload()
        }
    }, [patchNote, isOnChange, webPatchNote, trueJwt])
    return (
        <div className={s.wrapper} style={{ top: prop.top, left: prop.left, backgroundColor: prop.color, zIndex: prop.zIndex }} >
            <div className={s.navBar}>
                <Image id={prop.id?.toString()} src="/close.svg" width={20} height={20} alt="close" priority property="true" onClick={prop.onClick} />
            </div>
            <div style={trueJwt === '' ? { cursor: 'not-allowed' } : {}} id={prop.id?.toString()} className={s.textarea} onInput={changeText} onFocus={onFocus} onBlur={isNotFocus} contentEditable dangerouslySetInnerHTML={{ __html: prop.text || '' }} />
        </div>
    )
}