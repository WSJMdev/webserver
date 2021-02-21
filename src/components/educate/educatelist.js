import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import tileData from './tileData.js';
const data = tileData;
function Media(props) {
  const { loading = false } = props;
  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Box key={index} width={210} marginRight={0.5} my={5}>
          {item ? (
            <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
          ) : (
            <Skeleton variant="rect" width={210} height={118} />
          )}

          {item ? (
            <Box pr={2}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography gutterBottom variant="body2">
                {item.author}
              </Typography>
              <Typography display="block" variant="caption" color="textSecondary">
                {item.channel}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube() {
  return (
    <Box overflow="hidden">
      <Media />
    </Box>
  );
}