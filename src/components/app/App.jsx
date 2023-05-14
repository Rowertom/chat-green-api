import './style.scss';
import { Header } from '../header/Header';
import { ChatList } from '../chatList/ChatList';
import { CurrentChat } from '../currentChat/CurrentChat';
import { useEffect, useRef, useState } from 'react';
import { Authentification } from '../authentification/Authentification';
import { useDispatch } from 'react-redux';
import { fetchGetMessage } from '../../storage/messageSlice/messageSlice';

function App() {

  const [isAuthentificated, setIsAuthentificated] = useState(false);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const activeRef = useRef(active);
  activeRef.current = active;

  //при активации чата отправляются запросы на получение сообщения с интервалом 6 сек
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeRef.current) {
        dispatch(fetchGetMessage())
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [activeRef.current]);

  //проверка авторизован ли пользователь
  useEffect(() => {
    const auth = sessionStorage.getItem('auth')
    if (auth === 'authorized') {
      setIsAuthentificated(true)
    }
  }, [isAuthentificated]);

  return (
    <>
      <header>
        <Header isAuthentificated={isAuthentificated} setActive={setActive} />
      </header>
      {isAuthentificated ?
        <main className='main'>
          <ChatList />
          <CurrentChat />
        </main>
        :
        <Authentification setIsAuthentificated={setIsAuthentificated} />
      }
    </>
  );
}

export default App;



