import Breef from "../Breef/Breef";

import './BreefsList.scss';

import { testData } from '../../Api/test';
import { useEffect, useRef } from "react";

export default function BreefsList() {
    const breefsRef = useRef([])

    // TODO: изменить логику добавления отмодерированных брифов (при изменении решения, бриф добавляется повторно с новым статусом)
    let moderatedBreefs = [];

    const onChangeStateHandler = (i, breef, action) => {
        moderatedBreefs.push({...breef, status: action});
        if (i < breefsRef.current.length - 1) {
            breefsRef.current[i+1].focus();
            breefsRef.current[i+1].scrollIntoView();
        } else {
            breefsRef.current[i].blur();
        }
    }

    useEffect(() => {
        breefsRef.current[0].focus();
    }, [])

    return (
        <div className="breefs-list">
            {
                testData.map((breef, i) => (
                    <Breef breefData={breef} key={i} onChangeState={(breef, action) => onChangeStateHandler(i, breef, action)} ref={elem => breefsRef.current[i] = elem}/>
                ))
            }
        </div>
    )
}