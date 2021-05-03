import React from 'react'


const Notification = ({message,error}) => {
    if (message === null) {
        return null
    }

    if (error) {
        return (
            <div className="error">
                Information of {message} has already been removed from server
            </div>
        )    
    }
    return (
        <div className="add">
            Added {message}
        </div>
    )
}

export default Notification