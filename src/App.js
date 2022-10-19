
import './App.css';
import { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  };



  componentDidMount() {
    this.loadPosts()
    // .then(console.log('teste'))
    // .catch(err => console.log(err))
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postsResponse, photosResponse])

    const postsJson = await posts.json();
    const photoJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photoJson[index].url }
    });

    this.setState({ posts: postsAndPhotos });

  }

  render() {

    const { posts, counter } = this.state;

    return (

      <section className='container'>
        <div className="posts">

          {
            posts.map(post => (
              <div className="post">
                <img src={post.cover} alt={ post.title } />
                <div key={post.id} className="post-content">
                  <h1 >{post.title}</h1>
                  <p>{post.body}</p>
                </div>
              </div>
            ))

          }

        </div>
      </section>

    );
  }
};


export default App;
