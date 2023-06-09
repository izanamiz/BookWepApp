import { Box, Rating } from '@mui/material';
import React, { useState } from 'react';

const CommentBox = () => {
  const [value, setValue] = useState(2);

  return (
    <Rating
      name="simple-controlled"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
};

export default CommentBox;
