import { useRef } from 'react';
import './Breef.scss';
import UserIcon from '../../Icons/user-icon.svg';

export default function Breef({breefData}) {

    const breefRef = useRef(null);
    
    const onClickHandler = () => {
        breefRef.current.focus();
    }

    return (
        <div className="breef-container" tabIndex={0} onClick={onClickHandler} ref={breefRef}>
            <div className='breef-header'>
                <div className='header-left-side'>
                    <a className='breef-id' href='#'>{breefData.id}</a>
                    <span className='header-separator'>{' — '}</span>
                    <span className='breef-date'>{breefData.publishDateString}</span>
                </div>
                <div className='header-right-side'>
                    <img className='user-icon' src={UserIcon}/>
                    <a className='username' href='#'>{breefData.ownerLogin}</a>
                </div>
            </div>
            <div className='content-subject'>{breefData.bulletinSubject}</div>
            <div className='breef-content'>
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
}