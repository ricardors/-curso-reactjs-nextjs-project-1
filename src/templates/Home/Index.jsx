import { useEffect, useState, useCallback  } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Buttom';
import { TextInput } from '../../components/TextInput';

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(9);
  const [searchValue, setSearchValue] = useState('');
  const noMorePosts = page + postsPerPage >= allPosts.length ? true : false;


  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    }) : posts;


  const handleLoadPosts = useCallback(async (page, postsPerPage ) => {

    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);

    //   }
  }, [handleLoadPosts, postsPerPage]);


  //load more posts
  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  //handle change search posts
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }


  return (

    <section className='container'>
      <div className='search-container'>
        {searchValue && (
          <>
            <h1>Search value: {searchValue}  </h1>
          </>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>


      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts para os parametros da busca =(</p>
      )}



      <div className='button-container' >
        {!searchValue && (
          <Button text='Load more posts'
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}

      </div>
    </section>

  );
}
// export class Home2 extends Component {

//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 9,
//     searchValue: ''
//   };


//   async componentDidMount() {
//     await this.loadPosts()

//   }


//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   //load more posts
//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   }

//   //handle change search posts
//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   }

//   render() {

//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length ? true : false;

//     const filteredPosts = !!searchValue ?
//       allPosts.filter(post => {
//         return post.title.toLowerCase().includes(
//           searchValue.toLowerCase()
//         );
//       }) : posts;

//     return (

//       <section className='container'>
//         <div className='search-container'>
//           {searchValue && (
//             <>
//               <h1>Search value: {searchValue}  </h1>
//             </>
//           )}

//           <TextInput

//             handleChange={this.handleChange}
//             searchValue={searchValue}

//           />
//         </div>


//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts} />
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não existem posts para os parametros da busca =(</p>
//         )}



//         <div className='button-container' >
//           {!searchValue && (
//             <Button text='Load more posts'
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}

//         </div>
//       </section>

//     );
//   }
// };



