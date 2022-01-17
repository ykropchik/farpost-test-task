import BreefsList from '../../Elements/BreefsList/BreefsList';
import HotkeysTips from '../../Elements/HotkeysTips/HotkeysTips';

import './ActivePage.scss';

export default function ActivePage() {
    return (
        <div className="active-page">
            <BreefsList />
            <HotkeysTips />
        </div>
    )
}