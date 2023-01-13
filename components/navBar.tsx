import { SetStateAction, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import s from '../styles/components/navBar.module.scss'
import Note from './note'
import { createRoot, Root } from 'react-dom/client'

export default function NavBar() {
    const reactRoot = useRef<Root>()
    const maskClick = () => {
        reactRoot?.current?.unmount()
    }
    const addNote = () => {
        const container = <>
            <div className={s.mask} onClick={maskClick} />
            <div className={s.noteWrapper}>
                <Note key={999} id={999}
                    changeText={setList} top={0} left={0}
                    text={'654654654'} height={120} />
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
                <span>用户名</span>
                <button type='button'>登录</button>
            </div>
        </div>
    )
}

function setList(value: SetStateAction<{ id: number; text: string; height: number }[]>): void {
    throw new Error('Function not implemented.')
}
function hydrateRoot() {
    throw new Error('Function not implemented.')
}

