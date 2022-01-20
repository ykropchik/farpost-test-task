import { useEffect, useState } from 'react';
import { getBreefs, sendBreefs } from '../../Api/api';
import BreefsList from '../../Elements/BreefsList/BreefsList';
import HotkeysTips from '../../Elements/HotkeysTips/HotkeysTips';
import Spinner from '../../Elements/Spinner/Spinner';
import toast, { Toaster } from 'react-hot-toast';

import './ActivePage.scss';

export default function ActivePage() {
    const [breefs, setBreefs] = useState({list: [], isLoading: true});

    function getNewBreefs() {
        getBreefs()
        .then((res) => {
            const breefs = res.data;
            setBreefs({ list: breefs, isLoading: false });
        })
    }

    useEffect(() => {
        getNewBreefs()
    }, []);

    const onSaveHandler = (moderatedBreefsList) => {
        setBreefs((state) => ({...state, isLoading: true}));

        sendBreefs(moderatedBreefsList)
        .then((res) => {
            toast.success('Пакет объявлений успешно сохранен!');
            getNewBreefs();
        })
    }    

    return (
        <div className="active-page">
            { 
                breefs.isLoading
                ?
                <div className='spinner-container'>
                    <Spinner />
                </div>
                :
                <BreefsList data={breefs.list} onSave={onSaveHandler}/>
            }
            <HotkeysTips />
            <Toaster position="bottom-right" reverseOrder={true} />
        </div>
    )
}