import { useSelector } from "react-redux"
import { MessageItem } from "../messageItem/MessageItem"
import './style.scss'


export const MessageList = () => {

    const messageList = useSelector(s => s.message.messageList)

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
    };

    return (
        <div className="message__list">
            {!!messageList.length ? messageList.map((item) => {
                const style = item.sender === 'Вы' ? 'dark' : "light";
                const dateFrom = new Date(item.date)
                const trueDate = dateFrom.toLocaleString("ru", options)
                return (
                    <MessageItem
                        date={trueDate}
                        sender={item.sender}
                        message={item.message}
                        key={item.date}
                        style={style}
                    />
                )
            })
                : ''}
        </div>
    )
}
