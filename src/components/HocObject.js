import { Component } from "react";

export default class HocObject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { dev: true, qa: false },
      toAction: {},
      text: { dev: "", qa: "" },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState((state) => ({
      toAction: { ...state.toAdd, [e.target.name]: e.target.value },
      text: { ...state.text, [e.target.name]: e.target.value },
    }));
    e.preventDefault();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actionstack.onAction(this.state.toAction);
    this.setState({ toAction: {}, text: { dev: "", qa: "" } });
  };

  render() {
    const { onUndo, onRedo, value } = this.props.actionstack;
    return (
      <div style={{ padding: "50px 50px" }}>
        {" "}
        <span>withActionStack</span>
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
          <form onSubmit={this.handleSubmit}>
            <label
              style={{
                display: "flex",
                padding: "10px",
                height: "20px",
                alignItems: "center",
              }}
            >
              <span style={{ padding: "5px", fontSize: "16px" }}>dev</span>
              <input
                name="dev"
                value={this.state.text.dev}
                onChange={this.handleChange}
              ></input>
              <input
                name="qa"
                value={this.state.text.qa}
                onChange={this.handleChange}
              ></input>
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
  }
}
