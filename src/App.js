import "./App.css";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Container,
  CardHeader,
  CardActions,
  IconButton,
  AppBar,
  Toolbar,
  listItemIconClasses,
} from "@mui/material";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: [],
      pokedetails: {},
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=QiD1g5VohUdH3ov1DQiswSYcS6BZx8Vi64t6JrGW&count=10"
      )
      .then((result) => {
        const items = result.data;
        const pokemon = items.map((item, index) => {
          return {
            ...item,
            liked: false,
          };
        });
        this.setState({ pokemon: pokemon });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleLike = (item) => {
    item.liked = !item.liked;

    this.setState((prevState) => ({
      ...prevState,
      liked: !prevState.liked,
    }));
  };

  render() {
    console.log("hello", this.state.pokemon);

    return (
      <div className="div">
        <AppBar>
          <Toolbar>
            <Typography variant="h3">Spacetagram</Typography>
          </Toolbar>
        </AppBar>
        {/* // <Container sx={{ margin: "50px 50px" }}> */}
        <Grid className="grid" container spacing={3} padding={3} marginTop={4}>
          {this.state.pokemon.map((item, index) => {
            console.log("item", item.liked);
            return (
              <Grid item key={index} xs={6} sm={4} md={3}>
                <Card raised>
                  <CardMedia
                    image={item.url}
                    sx={{ height: "250px" }}
                  ></CardMedia>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" align="center">
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      {item.date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton>
                      {item.liked ? (
                        <FavoriteIcon
                          onClick={(item) => this.handleLike(item)}
                          sx={{ color: "red" }}
                        />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {/* // </Container> */}
      </div>
    );
  }
}

export default App;
