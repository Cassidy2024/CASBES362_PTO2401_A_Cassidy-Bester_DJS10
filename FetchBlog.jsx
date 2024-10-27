import React, { useEffect, useState } from 'react';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {  //used to perform the data fetching side effect
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) { //if the HTTP resonse is not successful then an error is thrown 
          throw new Error('Data fetching failed');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setError(null); // clears up any previous error message if the request was successful 
      })
      .catch((err) => {
        setError(err.message); //updates the error state with the error message
        setPosts([]); // Clear posts on error
      });
  }, []);

  return ( // UI of blog
    <div>
      <h1>Blog Posts</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p> //error message styled in red
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogPosts;