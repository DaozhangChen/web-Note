import { SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import s from '../styles/components/navBar.module.scss'
import Note from './note'
import { createRoot } from 'react-dom/client'

export default function NavBar() {
    const addNote = () => {

        const container = <>
            <div></div>
            <Note key={999} id={999}
                changeText={setList} top={100} left={200}
                text={'654654654'} height={100} />
        </>
        const reactDiv = ReactDOM.createPortal(container, document.body)
        const div = document.createElement('div')
        createRoot(div).render(reactDiv)

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

