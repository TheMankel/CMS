import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const params = useParams();

  const { postId } = params;

  return (
    <>
      <div>PostDetails</div>
      <div>ID: {postId}</div>
    </>
  );
};

export default PostDetails;
