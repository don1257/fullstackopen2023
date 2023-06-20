import './Notification.css'

export const Notification = (props) => {

    return (
        <div className='Notification'>
            Amended To Notebook: {props.message}
        </div>
    )
}
