import './Breef.scss';
import { testData } from '../../Api/test';

export default function Breef() {
    return (
        <div className="breef-container">
            <div className='breef-header'>
                <div className='header-left-side'>
                    <a className='breef-id' href='#'>{testData.id}</a>
                    <span className='header-separator'>{' — '}</span>
                    <span className='breef-date'>{testData.publishDateString}</span>
                </div>
                <div className='header-right-side'>
                    <span className='user-icon'></span>
                    <span className='username'>{testData.ownerLogin}</span>
                </div>
            </div>
            <div className='breef-content'>
                <div className='content-subject'>{testData.bulletinSubject}</div>
                <div className='content-text'>{testData.bulletinText}</div>
                <div className='content-imgs-container'>
                    {
                        testData.bulletinImagees.map((imgURL, i) => (
                            <img src={imgURL} key={`img-${i}`}></img>
                        ))
                    }
                </div>
                
                
            </div>
        </div>
    )
}