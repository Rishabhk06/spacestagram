import axios from "axios";
import GridDisplay from "./gridDisplay";
import { Component } from "react";

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      loading: true,
      likedImages: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=QiD1g5VohUdH3ov1DQiswSYcS6BZx8Vi64t6JrGW&count=20"
      )
      .then((result) => {
        const items = result.data;
        const images = items.map((item, index) => {
          return {
            details: item,
            liked: false,
          };
        });
        this.setState({ images, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  handleLike = (item, index) => {
    let currentState = [...this.state.images];
    currentState[index] = {
      ...item,
      liked: !item.liked,
    };
    //store liked images
    console.log("isliked?", item.liked);
    let currentLikedImages = this.state.likedImages;
    if (!item.liked) {
      currentLikedImages.push({ details: item.details });
    } else {
      //Remove image from likedImages in state
      let indexUnlikedImage = currentLikedImages.indexOf(item.details.title);
      currentLikedImages.splice(indexUnlikedImage, 1);
    }

    this.setState({
      images: currentState,
      likedImages: currentLikedImages,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <GridDisplay
                images={this.state.images}
                handleLike={this.handleLike}
              />
            }
          ></Route>
          <Route
            path="/likes"
            element={
              <GridDisplay
                images={this.state.likedImages}
                handleLike={this.handleLike}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
