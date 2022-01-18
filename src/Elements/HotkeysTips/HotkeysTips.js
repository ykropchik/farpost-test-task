import './HotkeysTips.scss';

export default function HotkeysTips() {
    return (
        <div className="hotkeystips-container">
            <div className='hotkeys-content'>
                <div className="item">
                    <span className="name">Одобрить</span>
                    <span className="dot-green"></span>
                    <span className="hotkey">Пробел</span>
                </div>
                <div className="item">
                    <span className="name">Отклонить</span>
                    <span className="dot-orange"></span>
                    <span className="hotkey">Del</span>
                </div>
                <div className="item">
                    <span className="name">Эскалация</span>
                    <span className="dot-blue"></span>
                    <span className="hotkey">Shift+Enter</span>
                </div>
                <div className="item">
                    <span className="name">Сохранить</span>
                    <span className="dot-empty"></span>
                    <span className="hotkey">F7</span>
                </div>
            </div>
        </div>
    )
}