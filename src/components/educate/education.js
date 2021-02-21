import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import Skeleton from '@material-ui/lab/Skeleton';
import tileData from './tileData.js';
import {Grid} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({

  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));



function Media({props}) {
  const { loading = false } = props;
  const classes = useStyles();
  console.log(props);
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          ) : (
            <Avatar
              alt="img"
              src={props.src}
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <SubscriptionsIcon style={{ color: green[500] }}/>
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          ) : (
            props.title
          )
        }
        subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : '5 hours ago'}
      />
        <CardMedia
          className={classes.media}
          image={props.src}
          title="Ted talk"
        />
      <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            {
              props.detailed
            }
          </Typography>
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook() {
  return (
    <Grid container>
        <Grid item md={4}>
            <Media props={tileData[0]}/>
        </Grid>
        <Grid item md={4}>
            <Media props={tileData[1]}/>
        </Grid>
        <Grid item md={4}>
            <Media props={tileData[2]}/>
        </Grid>
        <Grid item md={4}>
            <Media props={tileData[3]}/>
        </Grid>
    </Grid>
  );
}