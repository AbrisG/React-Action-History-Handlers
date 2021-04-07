import { useActionStack } from "../hooks/useActionStack";
import { useState } from "react";

const HookObject = (props) => {
  const [value, setValue] = useState({ dev: false, qa: true });
  const [toAction, setToAction] = useState({});
  const [text, setText] = useState({ dev: "", qa: "" });
  const { onAction, onUndo, onRedo } = useActionStack(value, (v) =>
    setValue(v)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onAction(toAction);
    setValue({ ...value, ...toAction });
    setText({ dev: "", qa: "" });
    setToAction({});
  };

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
    setToAction({ ...toAction, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "50px 50px" }}>
      {" "}
      <span>useActionStack</span>
      <div
        className="object-container"
        style={{
          margin: "10px",
          paddingTop: "10px",
          paddingBottom: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid white",
        }}
      >
        {JSON.stringify(value)}
        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "flex",
              padding: "10px",
              height: "20px",
              alignItems: "center",
            }}
          >
            <span style={{ padding: "5px", fontSize: "16px" }}>dev</span>
            <input name="dev" value={text.dev} onChange={handleChange}></input>
            <input name="qa" value={text.qa} onChange={handleChange}></input>
            <input
              type="submit"
              value="submit"
              style={{ display: "none" }}
            ></input>{" "}
            <span style={{ padding: "5px", fontSize: "16px" }}>qa</span>
          </label>
        </form>
        <div style={{ display: "flex" }}>
          <button onClick={(event) => onUndo(1)}>Undo</button>
          <button onClick={(event) => onRedo(1)}>Redo</button>
        </div>
      </div>
    </div>
  );
};

export default HookObject;
