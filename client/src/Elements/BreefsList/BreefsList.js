import Breef, { statusList } from "../Breef/Breef";
import { useEffect, useRef } from "react";
import toast from 'react-hot-toast';
import './BreefsList.scss';

export default function BreefsList({data, onSave}) {
    const breefsRef = useRef([])

    // TODO: изменить логику добавления отмодерированных брифов (при изменении решения, бриф добавляется повторно с новым статусом)
    let moderatedBreefs = data.map((item) => ({...item, status: statusList.NOTMODERATED, moderComment: '' }));

    useEffect(() => {
        if (breefsRef.current.length !== 0) {
            breefsRef.current[0].focus();
        }

        document.addEventListener('keydown', onKeyDownHandler)

        return () => {
            document.removeEventListener('keydown', onKeyDownHandler)
        }
    }, [])

    const onChangeStateHandler = (i, status, comment) => {
        moderatedBreefs[i].status = status;
        moderatedBreefs[i].moderComment = comment;
        if (i < breefsRef.current.length - 1) {
            breefsRef.current[i+1].focus();
            breefsRef.current[i+1].scrollIntoView();
        } else {
            breefsRef.current[i].blur();
        }
    }

    function isModerationCompleted() {
        let res = moderatedBreefs.filter(item => item.status === statusList.NOTMODERATED);

        return res.length === 0;
    }

    const onKeyDownHandler = (e) => {
        if (e.code === 'F7') {
            if (isModerationCompleted()) {
                console.log(moderatedBreefs)
                onSave(moderatedBreefs);
            } else {
                toast.error("Ты обработал не все объявления из этого пакета!");
            }   
        }
    }

    return (
        <div className="breefs-list">
            { data.length === 0 && <span className="empty-breef-list">На этом все :)</span> }
            {
                data.map((breef, i) => (
                    <Breef breefData={breef} key={i} onChangeState={(status, comment) => onChangeStateHandler(i, status, comment)} ref={elem => breefsRef.current[i] = elem}/>
                ))
            }
        </div>
    )
}