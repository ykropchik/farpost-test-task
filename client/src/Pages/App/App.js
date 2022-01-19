import StartPage from "../StartPage/StartPage";
import ActivePage from "../ActivePage/ActivePage";
import './App.scss';
import { useState } from "react";

export default function App() {
  const [active, setActive] = useState(false);

  const onActivateHandler = () => {
    setActive(true);
  }

    return (
      <div>
        { active ? <ActivePage /> : <StartPage onActivate={onActivateHandler} />}
      </div>
    );
}