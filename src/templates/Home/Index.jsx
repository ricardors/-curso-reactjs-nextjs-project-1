import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Buttom';

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 9,
  };


  async componentDidMount() {
    await this.loadPosts()

  }


  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  //load more posts
  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }



  render() {

    const { posts, page, postsPerPage, allPosts } = this.state;
    const noMorePosts =  page + postsPerPage >= allPosts.length? true : false;
    return (

      <section className='container'>
        <Posts posts={posts} />
        <div className='button-container' >
          <Button text='Load more posts'
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />

        </div>
      </section>

    );
  }
};



