import React from 'react'

const Notification = ({error}) => {
    if(error===null)
        return;

  return (
    <div className={error.error ?'error':'success'}>
        {error.message}
    </div>
  )
}

export default Notification