import { useSelector } from 'react-redux';
import './style.scss';
import { ChatItem } from '../chatItem/ChatItem';

export const ChatList = () => {

    const chatList = useSelector(s => s.message.chatList);

    return (
        <div className="chatList">
            {!!chatList.length ? chatList.map((number) => {
                return (
                    <ChatItem
                        number={number}
                        key={number}
                    />
                )
            }) : ''}
        </div>
    )
}