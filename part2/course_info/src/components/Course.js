const Header = ({ course }) => {
  return (
    <>
      <h2>{course}</h2>
    </>
  );
}

const Part = ({ name, exercises }) => {
  return (
    <>
      <li>
        {name} {exercises}
      </li>
    </>
  );
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </ul>
  );
}

const Total = ({ number }) => {
  return (
    <>
      <p><em>Total number of exercises {number}</em></p>
    </>
  );
}

const Course  = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total number={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}

export default Course