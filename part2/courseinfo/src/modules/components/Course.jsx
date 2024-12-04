import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (course) => {
    return (< div >
    <Header course={course.course} />
    <Content parts={course.course.parts} />
    <Total parts={course.course.parts} />
  </div >)
}

export default Course