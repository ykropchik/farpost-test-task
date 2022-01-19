import { useEffect, useRef } from 'react';
import './StartPage.scss';

export default function StartPage({onActivate}) {
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.focus()
    }, [])

    const onKeyDownHandler = (e) => {
        if (e.code === 'Enter') {
            onActivate();
        }
    }

    return (
        <div className="start-page" tabIndex={0} onKeyDown={onKeyDownHandler} ref={divRef}>
            <span className="text">Нажмите Enter, чтобы начать</span>
        </div>
    );
}