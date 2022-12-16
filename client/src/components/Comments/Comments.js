import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Comments = (props) => {
  const { comments } = props;

  return (
    <List>
      {comments?.map((comment, i) => (
        <Box key={i}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={comment?.fullName} src={comment?.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={comment?.fullName}
              secondary={comment?.commentText}
            />
          </ListItem>
          {comments?.length !== i + 1 && <Divider />}
        </Box>
      ))}
    </List>
  );
};

export default Comments;
