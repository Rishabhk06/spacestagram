import axios from "axios";
import GridDisplay from "./gridDisplay";
import { Component } from "react";
import Animation from "./animation";
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
    //load likedImages from localStorage
    let localStorageImages = this.getLocalStorageData();

    let apiKey = "QiD1g5VohUdH3ov1DQiswSYcS6BZx8Vi64t6JrGW";
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=60`)
      .then((result) => {
        const items = result.data;
        const images = items.map((item, index) => {
          return {
            details: item,
            liked: false,
          };
        });
        this.setState({
          images,
          loading: false,
          likedImages: localStorageImages,
        });
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
    let currentLikedImages = this.state.likedImages;
    if (!item.liked) {
      currentLikedImages.push({ liked: !item.liked, details: item.details });
    } else {
      //Remove image from likedImages in state
      let indexUnlikedImage = currentLikedImages.findIndex(
        (image) => image.details.title === item.details.title
      );

      currentLikedImages.splice(indexUnlikedImage, 1);
    }

    this.setState({
      images: currentState,
      likedImages: currentLikedImages,
    });

    //save in localStorage for page refresh
    localStorage.setItem("likedImages", JSON.stringify(currentLikedImages));
  };

  getLocalStorageData = () => {
    let localStorageData = localStorage.getItem("likedImages");
    if (localStorageData) {
      return JSON.parse(localStorageData);
    } else {
      console.log("No liked images in localstorage");
    }
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
                loading={this.state.loading}
                handleLike={this.handleLike}
              />
            }
          ></Route>
          <Route
            path="/likes"
            element={
              <GridDisplay
                images={this.state.likedImages}
                loading={this.state.loading}
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
