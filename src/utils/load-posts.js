export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, photos] = await Promise.all([postsResponse, photosResponse])

    const postsJson = await posts.json();
    const photoJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photoJson[index].url }
    });

  return postsAndPhotos;
}