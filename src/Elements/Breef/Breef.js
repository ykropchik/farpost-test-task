import React, { useRef, useState } from 'react';
import './Breef.scss';
import UserIcon from '../../Icons/user-icon.svg';

const statusList = {
    DECLINE: 'decline',
    APPROVE: 'approve',
    ESCALATE: 'escalate'
}

const Breef = React.forwardRef(({breefData, onChangeState}, ref) => {
    const [status, setStatus] = useState(null);

    const onKeyPressHandler = (e) => {
        e.preventDefault();

        if (e.code === 'Space') {
            setStatus(statusList.APPROVE);
            onChangeState(breefData, 'approve');
        }

        if (e.code === 'Delete') {
            setStatus(statusList.DECLINE);
            onChangeState(breefData, 'decline');
        }

        if (e.shiftKey && e.code === 'Enter') {
            setStatus(statusList.ESCALATE);
            onChangeState(breefData, 'escalate');
        }

        // if (e.code === 'F7') {
        //     console.log('Сохранить')
        // }
    }

    return (
        <div className="breef-container" tabIndex={0} onKeyDown={onKeyPressHandler} ref={ref}>
            <div className='breef-header'>
                <div className='header-left-side'>
                    <a className='breef-id' target={'_blank'} href={`https://www.farpost.ru/${breefData.id}`}>{breefData.id}</a>
                    <span className='header-separator'>{' — '}</span>
                    <span className='breef-date'>{breefData.publishDateString}</span>
                    { status === statusList.APPROVE && <span className='lable-approve'>Одобрено</span> }
                    { status === statusList.DECLINE && <span className='lable-decline'>Отклонено</span> }
                    { status === statusList.ESCALATE && <span className='lable-escalate'>Эскалация</span> }
                </div>
                <div className='header-right-side'>
                    <img className='user-icon' src={UserIcon}/>
                    <a className='username' target={'_blank'} href={`https://www.farpost.ru/user/${breefData.ownerLogin}`}>{breefData.ownerLogin}</a>
                </div>
            </div>
            <div className='breef-content'>
                <div className='content-subject'>{breefData.bulletinSubject}</div>
                <div className='content-text'>{breefData.bulletinText}</div>
                <div className='content-imgs-container'>
                    {
                        breefData.bulletinImagees.map((imgURL, i) => (
                            <img className='content-img' src={imgURL} key={`img-${i}`}></img>
                        ))
                    }
                </div>
                
                
            </div>
        </div>
    )
})

export default Breef;