import { useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { MessageList } from '../messageList/MessageList';
import { fetchSendMessage } from '../../storage/messageSlice/messageSlice';

export const CurrentChat = () => {

    const [valueMessage, setValueMessage] = useState(true);

    const { activeChat, currentChat } = useSelector(s => s.message);
    const dispatch = useDispatch();

    //функция по отправке сообщения пользователя
    function sendMessage(event) {
        event.preventDefault();
        const message = event.target[0].value;
        const date = Date.now();
        if (!message) {
            setValueMessage(state => !state)
            return
        }
        dispatch(fetchSendMessage({ id: currentChat, message: message, date: date, sender: 'Вы' }))
        event.target.reset();
        setValueMessage(true);
    }

    return (
        <div className="currentChat">
            <div className='currentChat__messages'>
                <MessageList />
            </div>
            <div className="currentChat__send">
                {!valueMessage && <span className='required__message'>Введите сообщение</span>}
                <form className='currentChat__send__form' onSubmit={sendMessage}>
                    <input
                        className='currentChat__send__content'
                        type='text'
                        placeholder='message'
                        disabled={!activeChat} />
                    {activeChat &&
                        <button
                            className='currentChat__send__btn'
                            type='submit'>
                            <span className='currentChat__send__btn__value'>Send</span>
                        </button>
                    }
                </form>
            </div>
        </div>
    )
}