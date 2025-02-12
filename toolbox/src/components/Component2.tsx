import { useState } from "react";

export default function Component2() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Hi, I am Component 2</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>Count: {count}</p>
        </div>
    )
}
