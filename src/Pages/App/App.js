import BreefsList from "../../Elements/BreefsList/BreefsList";
import HotkeysTips from "../../Elements/HotkeysTips/HotkeysTips";
import StartPage from "../StartPage/StartPage";
import ActivePage from "../ActivePage/ActivePage";
import './App.scss';
import { useState } from "react";

export default function App() {
  const [active, setActive] = useState(false);

  const onKeyPressHandler = (event) => {
    if (!active && event.key === 'Enter') {
      setActive(true);
    }
  }

    return (
      <div tabIndex={0} onKeyDown={onKeyPressHandler}>
        { active ? <ActivePage /> : <StartPage /> }
      </div>
    );
}