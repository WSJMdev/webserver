import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardHeader, CardContent, CardMedia, Avatar, Typography, Grid} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import Skeleton from '@material-ui/lab/Skeleton';
import tileData from './tileData.js';
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


function Media({props, func}) {
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
            <IconButton aria-label="settings" onClick={func}>
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
  const [items, setItems] = useState(false);
  const Items = () => {
    const list = items.map((item)=>{
      return item;
    });
    return list;
  }




  const handleGo = () => {
    window.location.href = 'https://go-tour-ko.appspot.com/welcome/1';
  }
  const handleJava = () => {
    window.location.href = 'https://docs.oracle.com/en/java/javase/15/docs/api/index.html';
  }
  const handleVue = () => {
    window.location.href = 'https://kr.vuejs.org/v2/guide/index.html';
  }
  const handleReact = () => {
    window.location.href = 'https://ko.reactjs.org/tutorial/tutorial.html';
  }
  return (
    <Grid container>
        <Grid item md={4}>
            <Media props={tileData[0]} func={handleGo}/>
        </Grid>
        <Grid item md={4}>
            <Media props={tileData[1]} func={handleJava}/>
        </Grid>
        <Grid item md={4}>
            <Media props={tileData[2]} func={handleVue}/>
        </Grid>
        <Grid item md={4}>
            <Media props={tileData[3]}  func={handleReact}/>
        </Grid>
    </Grid>
  );
}