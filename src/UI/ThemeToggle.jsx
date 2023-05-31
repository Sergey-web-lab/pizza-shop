import { useState, useEffect } from "react";

const ThemeToggle = () => {

  const sunIcon = <img src='img/sun.svg' alt='sun' style={{ 'height': '20px' }} />;
  const moonIcon = <img src='img/moon.svg' alt='moon' style={{ 'height': '20px' }} />;
  const body = document.querySelector('body');
  const btns = document.querySelectorAll('.button');
  // const btnsArr = 
  const btnsDarkTheme = document.querySelectorAll('.buttonDarkTheme');
  const [lightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    if (lightTheme) {
      body.classList.add('lightTheme');
      body.classList.remove('darkTheme');
      btns.forEach(i => {
        i.classList.remove('buttonDarkTheme', 'buttonDarkTheme--outline');
      })
    } else {
      body.classList.add('darkTheme');
      body.classList.remove('lightTheme');
      btns.forEach(i => {
        i.classList.add('buttonDarkTheme', 'buttonDarkTheme--outline');
      })
    }
  }, [lightTheme]);

  return (
    <>
      <button className="button button--outline" onClick={() => setLightTheme(!lightTheme)}>
        {lightTheme ? <span>Тёмная тема {moonIcon}</span> : <span>Светлая тема {sunIcon}</span>}
      </button>
    </>
  );
}

export default ThemeToggle;