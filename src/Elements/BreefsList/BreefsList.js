import Breef from "../Breef/Breef";

import './BreefsList.scss';

import { testData } from '../../Api/test';

export default function BreefsList() {
    return (
        <div className="breefs-list">
            {
                testData.map((breef, i) => (
                    <Breef breefData={breef} key={i}/>
                ))
            }
        </div>
    )
}