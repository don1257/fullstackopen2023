import {useEffect} from "react";

export const Notifications = ({setNotification, notification}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            setNotification(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [notification]);

    if (!notification) return null;

        return (
        <div>
            A new anecdote has been created! " {notification} "
        </div>
    )
}
