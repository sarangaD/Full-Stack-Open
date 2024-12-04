const Total = (props) => {
    const total = props.parts.reduce((a, { exercises }) => a + exercises, 0)
    
    return (
        <div className="listitems">
            <ul>
                <li><b>Total of {total} exercises</b> </li>
            </ul>
        </div>
    )
}

export default Total