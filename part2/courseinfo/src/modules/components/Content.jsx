import Part from "./Part";

const Content = (props) => {
    const items = props.parts.map((part) =>
        <Part key={part.id} part={part}></Part>
    )
    return (
        <div className="listitems">
            <ul>
                {items}
            </ul>
        </div>
    );
}

export default Content