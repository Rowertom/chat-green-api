import './style.scss';

export const MessageItem = ({ date, sender, message, style }) => {


    return (
        <div className={`message ${style}`}>
            <div className="message__header">
                <span className="message__header__date">{date}</span>
                <span className="message__header__user">{sender}</span>
            </div>
            <p className="message__content">{message}</p>
        </div>
    )
}