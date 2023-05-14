import { useState } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, closeChat } from '../../storage/messageSlice/messageSlice';

export const Header = ({ isAuthentificated, setActive }) => {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    const { activeChat, currentChat } = useSelector(s => s.message)

    //открытие или закртытие модалки для создание чата
    const openModal = () => {
        setIsActive(state => !state)
    }

    const name = sessionStorage.getItem('instance');

    //функция создания чата
    const setNumber = (e) => {
        e.preventDefault();
        dispatch(addChat(e.target[0].value))
        setIsActive(state => !state);
        setActive(true)
    }

    //функция закрытия чата
    const handleCloseChat = () => {
        dispatch(closeChat())
        setActive(false)
    }

    return (
        <div className="header">
            <div className="header__user">
                <span className="header__user__name">User {name}</span>
                {isAuthentificated &&
                    <button
                        className="header__user__btn"
                        onClick={openModal}>
                        {!isActive ? "+ написать" : "- отменить"}
                    </button>
                }
                {isActive &&
                    <form
                        className='header__user__number'
                        onSubmit={setNumber}>
                        <span>Введите номер</span>
                        <input
                            className='number__form'
                            type="number"
                            placeholder='79995552233'
                            required
                        />
                        <button
                            className='number__btn'
                            type='submit'
                        >создать чат
                        </button>
                    </form>
                }
            </div>
            {activeChat &&
                <div className="header__chat">
                    <span className='header__chat__content'>Чат с пользователем {currentChat}</span>
                    <button className="header__chat__btn" onClick={handleCloseChat}>x</button>
                </div>
            }

        </div>
    )
}