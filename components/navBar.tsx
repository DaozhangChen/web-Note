import { SetStateAction, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import s from '../styles/components/navBar.module.scss'
import Note from './note'
import { createRoot, Root } from 'react-dom/client'
import { openLoginPage } from './loginPage'
import { useMeStore } from '../stores/useMeStore'
import { addNoteData } from '..'



export default function NavBar() {
    const userName = useMeStore().userName
    const reactRoot = useRef<Root>()
    const refNote = useRef<HTMLDivElement>(null)
    const [addNoteData, setAddNoteData] = useState<addNoteData>({ text: '', height: 100 })
    const maskClick = () => {
        const data = refNote.current?.innerText
        if (data !== '') {
            console.log('yes')
            fetch('/api/addNote', { method: 'post', body: JSON.stringify(data) })
        }
        reactRoot?.current?.unmount()
    }
    const clickButton = () => {
        reactRoot?.current?.unmount()
    }
    useEffect(() => {
        console.log(addNoteData)
    }, [addNoteData])

    const addNote = () => {
        const container = <>
            <div className={s.mask} onClick={maskClick} />
            <div className={s.noteWrapper} ref={refNote}>
                <Note addNote={setAddNoteData} onClick={clickButton} />
            </div>
        </>
        const portalNote = ReactDOM.createPortal(container, document.body)
        const div = document.createElement('div')
        const root = createRoot(div)
        console.log(root)
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


