import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// function Hello() {
// 	const [counter, setCounter] = useState(0)
//
// 	function handleClickDecrement(e: React.MouseEvent) {
// 		setCounter(counter + 1)
// 	}
// 	function handleClickIncrement(e: React.MouseEvent) {
// 		setCounter(counter + 1)
// 	}
//
// 	return (
// 		<div>
// 			<button onClick={handleClickDecrement}>-</button>
// 			<button onClick={handleClickIncrement}>+</button>
// 			{counter}
// 			haha
// 		</div>
// 	)
// }

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/hello">Hello, world!</Route>
				<Route path="/goodbye">Hello, darkness...</Route>
				<Route path="/">
					<div className="container">
						<h1>Hello, world!</h1>
						<p>Hello, world!</p>
					</div>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}
