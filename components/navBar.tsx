import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import s from '../styles/components/navBar.module.scss'
import Note from './note'
import { createRoot, Root } from 'react-dom/client'
import { openLoginPage } from './loginPage'
import { useMeStore } from '../stores/useMeStore'
import { addNoteData } from '..'
import { useNoteStore } from '../stores/useNoteStore'

export default function NavBar() {
    const { userName, jwt } = useMeStore()
    const { addNote: webAddNote } = useNoteStore()
    const reactRoot = useRef<Root>()
    const refNote = useRef<HTMLDivElement>(null)
    const [addNoteData, setAddNoteData] = useState<addNoteData>({ text: '', height: 100 })
    const [isClick, setIsClick] = useState(false)
    const maskClick = () => {
        setIsClick(true)
        reactRoot?.current?.unmount()
    }
    const clickButton = () => {
        reactRoot?.current?.unmount()
    }
    useEffect(() => {
        if (addNoteData.text !== '' && isClick) {
            webAddNote(addNoteData, jwt)
        }
        setIsClick(false)
    }, [addNoteData, isClick, jwt, webAddNote])

    const addNote = () => {
        setAddNoteData({ text: '', height: 100 })
        const container = <>
            <div className={s.mask} onClick={maskClick} />
            <div className={s.noteWrapper} ref={refNote}>
                <Note addNote={setAddNoteData} onClick={clickButton} />
            </div>
        </>
        const portalNote = ReactDOM.createPortal(container, document.body)
        const div = document.createElement('div')
        const root = createRoot(div)
        reactRoot.current = root
        root.render(portalNote)
    }
    return (
        <div className={s.wrapper}>
            <button type="button" onClick={addNote}>添加标签</button>
            <div>
                <span>{userName === '' ? '未登录' : userName}</span>
                <button type='button' onClick={openLoginPage}>登录</button>
            </div>
        </div>
    )
}


