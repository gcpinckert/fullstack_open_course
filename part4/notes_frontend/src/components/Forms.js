const Input = ({ input }) => {
  return (
    <div>
      {input.name}
      <input
        type={input.type}
        value={input.val}
        name={input.name}
        onChange={input.changeHandler}
      />
    </div>
  )
}

const LoginForm = ({ submitHandler, inputStates }) => {
  const fields = [ {name: "Username", type: "text"}, {name: "Password", type: "password"}];
  const inputs = inputStates.map((input, idx) => {
    return {
      name: fields[idx].name,
      type: fields[idx].type,
      val: input.val,
      changeHandler: input.changeHandler,
    }
  })

  return (
    <form onSubmit={submitHandler}>
        {inputs.map(input => {
          return <Input key={input.name} input={input} />
        })}
        <button type="submit">login</button>
      </form>
  )
}

const NoteForm = ({submitHandler, inputState }) => {
  return (
    <form onSubmit={submitHandler}>
      <input value={inputState.val} onChange={inputState.changeHandler} />
      <button type="submit">save</button>
    </form>
  )
}

export { LoginForm, NoteForm } 