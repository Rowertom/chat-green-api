import './style.scss'

export const ChatItem = ({ number }) => {

    //потенциальная функция для открытия чата из чатлиста и загрузки истории сообщений
    const handleCurrentChat = () => {
        console.log(number);
    }

    return (
        <div className="chat__number" onClick={handleCurrentChat}>
            <span className="chat__number__content">{number}</span>
        </div>
    )
}