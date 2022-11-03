const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app was created by <em>ME</em>
    </div>
  )
}

const App = () => {
  return (
    <>
      <h1>Greetings</h1>,
      <Hello name='Ginni' age={24 + 10}/>,
      <Footer />
    </>
  )
}

export default App;
