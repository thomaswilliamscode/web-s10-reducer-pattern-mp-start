import React, { useReducer } from 'react' // 👈 you'll need the reducer hook

// 👇 these are the types of actions that can change state
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

// 👇 create your initial state object here
let initialState = {
  quoteText: '',
  authorName: ''
} 

// 👇 create your reducer function here
const reducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_INPUT' : {
      const {name, value} = action.payload;
      return {...state, [name]: value}
    }
    case 'RESET_FORM' : 
      return initialState;
    default:
      return state
  }
}

export default function TodoForm({ createQuote = () => { } }) {
  // 👇 use the reducer hook to spin up state and dispatch
  let [ state, dispatch] = useReducer( reducer, initialState)

  const onChange = (e) => {
    // 👇 implement
    let name = e.target.name
    let value = e.target.value
    dispatch({ type: 'CHANGE_INPUT', payload: {name: name, value: value}});
  }
  const resetForm = () => {
    // 👇 implement
    dispatch({ type: 'RESET_FORM'});
  }
  const onNewQuote = (e) => {
    // 👇 implement
    e.preventDefault()
    const { authorName, quoteText } = state
    createQuote( { authorName, quoteText})
    resetForm()
  }

  // 👇 some props are missing in the JSX below:
  return (
		<form id='quoteForm' onSubmit={onNewQuote}>
			<h3>New Quote Form</h3>
			<label>
				<span>Author:</span>
				<input
					type='text'
					value={state.authorName}
					name='authorName'
					placeholder='type author name'
					onChange={onChange}
				/>
			</label>
			<label>
				<span>Quote text:</span>
				<textarea
					type='text'
					value={state.quoteText}
					name='quoteText'
					placeholder='type quote'
					onChange={onChange}
				/>
			</label>
			<label>
				<span>Create quote:</span>
				<button role='submit'>DO IT!</button>
			</label>
		</form>
	);
}
