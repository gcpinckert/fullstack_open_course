const Input = ({ label, value, changeHandler }) => {
  return (
    <div>
      {label}: <input value={value} onChange={changeHandler} />
    </div>
  )
}

const PersonForm = ({submitHandler, inputs}) => {
  return (
    <form onSubmit={submitHandler}>
      {inputs.map(input => {
        return <Input key={input.label} label={input.label} value={input.value} changeHandler={input.changeHandler} />
      })}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export { Input, PersonForm };