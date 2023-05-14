import { useForm } from 'react-hook-form';
import './style.scss';
import { isAuth } from '../../utils/api';


export const Authentification = ({ setIsAuthentificated }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' });

    const instanceRegister = register('instance', {
        required: 'Instance обязателен',
    })
    const tokenRegister = register('token', {
        required: 'Token обязателен',
    })

    const sendData = async (data) => {
        try {
            const res = await isAuth(data);
            sessionStorage.setItem('auth', res.stateInstance);
            sessionStorage.setItem('instance', data.instance);
            sessionStorage.setItem('token', data.token);
            setIsAuthentificated(state => !state);
        } catch (error) {
            alert('ошибка ввода, попробуйте еще раз')
        }
    }

    return (
        <div className="auth">
            <form className='auth__form' onSubmit={handleSubmit(sendData)}>
                <label className='auth__form__label' htmlFor="instance">Введите ваш <b>instance</b></label>
                <input
                    id='instance'
                    type='text'
                    className='auth__form__content'
                    {...instanceRegister}
                    placeholder='instance' />
                {errors?.instance && (
                    <span className="auth__warning">{errors.instance?.message}</span>)}
                <label htmlFor='token' className='auth__form__label'>Введите ваш <b>token</b></label>
                <input
                    type='text'
                    id="token"
                    className='auth__form__content'
                    {...tokenRegister}
                    placeholder='token' />
                {errors?.token && (
                    <span className="auth__warning">{errors.token?.message}</span>)}
                <button className='auth__form__btn' type='submit'>
                    <span>Войти</span>
                </button>
            </form>
        </div>
    )
}