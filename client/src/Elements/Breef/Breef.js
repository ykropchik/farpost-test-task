import React, { useState } from 'react';
import UserIcon from '../../Icons/user-icon.svg';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './Breef.scss';

export const statusList = {
    NOTMODERATED: 'not moderated',
    DECLINE: 'decline',
    APPROVE: 'approve',
    ESCALATE: 'escalate'
}

function DeclineModal({onSave}) {
    const [comment, setComment] = useState('');

    return (
        <div className='modal-content'>
            <span className='modal-header'>Причина отклонения (обязательно)</span>
            <textarea className='comment-input' onChange={(e) => setComment(e.target.value)}></textarea>
            <button className='btn-save' disabled={comment.length === 0} onClick={() => onSave(statusList.DECLINE, comment)}>Сохранить</button>
        </div>
    )
}

function EscalateModal({onSave}) {
    const [comment, setComment] = useState('');

    return (
        <div className='modal-content'>
            <span className='modal-header'>Комментарий для старшего модератора</span>
            <textarea className='comment-input' onChange={(e) => setComment(e.target.value)}></textarea>
            <button className='btn-save' onClick={() => onSave(statusList.ESCALATE, comment)}>Сохранить</button>
        </div>
    )
}


const Breef = React.forwardRef(({breefData, onChangeState}, ref) => {
    const [status, setStatus] = useState(null);
    const [openDeclineModal, setOpenDeclineModal] = useState(false);
    const [openEscalateModal, setOpenEscalateModal] = useState(false);

    const onKeyPressHandler = (e) => {
        if (!openDeclineModal && !openEscalateModal) {
            if (e.code === 'Space') {
                e.preventDefault();
                setStatus(statusList.APPROVE);
                onChangeState(statusList.APPROVE, '');
            }
    
            if (e.code === 'Delete') {
                e.preventDefault();
                setOpenDeclineModal(true);
            }
    
            if (e.shiftKey && e.code === 'Enter') {
                e.preventDefault();
                setOpenEscalateModal(true);
            }
        }
    }

    const onCloseModalHandler = () => {
        setOpenDeclineModal(false);
        setOpenEscalateModal(false);
    }

    const onSaveCloseModalHandler = (status, comment) => {
        setOpenDeclineModal(false);
        setOpenEscalateModal(false);

        setStatus(status);
        onChangeState(status, comment)
    }

    return (
        <div className="breef-container" tabIndex={0} onKeyDown={onKeyPressHandler} ref={ref}>
            <div className='breef-header'>
                <div className='header-left-side'>
                    <a className='breef-id' target={'_blank'} rel='noreferrer' href={`https://www.farpost.ru/${breefData.id}`}>{breefData.id}</a>
                    <span className='header-separator'>{' — '}</span>
                    <span className='breef-date'>{breefData.publishDateString}</span>
                    { status === statusList.APPROVE && <span className='lable-approve'>Одобрено</span> }
                    { status === statusList.DECLINE && <span className='lable-decline'>Отклонено</span> }
                    { status === statusList.ESCALATE && <span className='lable-escalate'>Эскалация</span> }
                </div>
                <div className='header-right-side'>
                    <img className='user-icon' src={UserIcon}/>
                    <a className='username' target={'_blank'} rel='noreferrer' href={`https://www.farpost.ru/user/${breefData.ownerId}`}>{breefData.ownerLogin}</a>
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

            <Modal open={openDeclineModal} onClose={onCloseModalHandler} focusTrapped={false} center>
                <DeclineModal onSave={onSaveCloseModalHandler}/>
            </Modal>

            <Modal open={openEscalateModal} onClose={onCloseModalHandler} focusTrapped={false} center>
                <EscalateModal onSave={onSaveCloseModalHandler}/>
            </Modal>
        </div>
    )
})

export default Breef;