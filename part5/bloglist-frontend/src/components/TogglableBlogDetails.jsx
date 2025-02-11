import { useState, forwardRef, useImperativeHandle } from 'react'

const TogglableBlogDetails = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : 'block' }
    const showWhenVisible = { display: visible ? 'block' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
                {props.children}
            </div>
        </div>
    )
})

export default TogglableBlogDetails