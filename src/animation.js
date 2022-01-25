import { Component } from "react";
import "./animation.css";

class Animation extends Component {
  constructor() {
    super();
  }

  starsFunc = () => {
    let stars = [];
    for (let i = 0; i < 200; i++) {
      // Random integer from 0 to 9: set it as sec: eg : '5s'
      let speed = Math.random() * 10;
      let rotation = Math.random() * 360;
      let delay = Math.random() * 10;
      let scale = Math.random() * 10;
      let style = {
        "--speed": `${speed}s`,
        "--rotation": `${rotation}deg`,
        "--delay": `${delay}s`,
        "--scale": `${scale}`,
      };

      stars.push(<div className="star" key={i} style={style}></div>);
    }
    return stars;
  };

  render() {
    return (
      <div className="starfield">
        {this.starsFunc()}
        <div className="quote">
          "That's one small step for a man, one giant leap for mankind."
        </div>
        <div className="text">
          - Neil Armstrong ( Apollo 11 ): July 20, 1969 @ 20:17 UTC.
        </div>
      </div>
    );
  }
}

export default Animation;
