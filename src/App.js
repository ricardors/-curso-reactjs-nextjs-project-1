import { Component } from 'react';

import './App.css';

import { Posts } from './components/Posts';
import {loadPosts} from './utils/load-posts';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  };



  async componentDidMount() {
    await this.loadPosts()
  
  }


  loadPosts = async () => { 
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos });
  };

  render() {

    const { posts } = this.state;

    return (

      <section className='container'>
        <Posts  posts={ posts } />
      </section>

    );
  }
};


export default App;
