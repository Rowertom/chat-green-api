import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMessage, removeMessageFromStack, sendMessage } from "../../utils/api";

//action по получению сообщений
export const fetchGetMessage = createAsyncThunk(
    'message/fetchGetMessage',
    async function (
        data,
        { fulfillWithValue, rejectWithValue }
    ) {
        try {
            const mess = await getMessage()
            if (mess === null) return;
            removeMessageFromStack(mess.receiptId)
            return fulfillWithValue({
                date: Number(mess.body.timestamp + '000'),
                sender: mess.body.senderData.sender.slice(0, -5),
                message: mess.body.messageData.textMessageData.textMessage
            });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

//action для отправки сообщений
export const fetchSendMessage = createAsyncThunk(
    'message/fetchSendMessage',
    async function (
        data,
        { fulfillWithValue, rejectWithValue }
    ) {
        try {
            await sendMessage(data.id, data.message);
            return fulfillWithValue({
                date: data.date,
                sender: data.sender,
                message: data.message
            });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    messageList: [],
    chatList: [],
    currentChat: '',
    activeChat: false,
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        //action по добавлению чата
        addChat: (state, action) => {
            state.messageList = [];
            state.chatList = [];
            if (!state.chatList.includes(action.payload)) {
                state.chatList = [...state.chatList, action.payload];
            }
            state.currentChat = action.payload;
            state.activeChat = true;
        },
        //action по закрытию чата
        closeChat: (state, action) => {
            state.currentChat = '';
            state.messageList = [];
            state.activeChat = false;
            state.chatList = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchGetMessage.fulfilled, (state, action) => {
            if (!!action.payload) {
                if (state.currentChat === action.payload.sender) {
                    state.messageList = [...state.messageList, action.payload]
                }
            }
        })
        builder.addCase(fetchSendMessage.fulfilled, (state, action) => {
            state.messageList = [...state.messageList, action.payload]
        })

    }
})

export const { addChat, closeChat } = messageSlice.actions;
export default messageSlice.reducer;