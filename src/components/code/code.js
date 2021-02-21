import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {complete} from '../../store/state/login.js';
import FaceIcon from '@material-ui/icons/Face';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration({props}) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch();
  const testr = useSelector(state => state.user.testr);
  const timer = React.useRef();
  const [text, setText] = React.useState("");
  const [color, setColor] = React.useState("secondary");
  const number = props.number;
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    try{
        const headers = {
            'Content-Type': 'application/json'
        }
        console.log(props["code"], props.prefer);
        let result = await axios.post(process.env.REACT_APP_TESTCODE+"/code",{
            text:props.code,
            language:props.prefer,
            filename:"Test"
        }, {
            headers: headers
        });
        if(result.status === 200 && result.data.toString().trim() != "exit status 1"){
            if(result.data.toString().trim() != "에러!!"){
                console.log("Answer!");
                setSuccess(true);
                setLoading(false);
                setText(result.data.toString().trim());
                setColor("primary");
                timer.current = window.setTimeout(() => {
                    dispatch(complete());
                }, 1000);
            } else {
                setText(result.data.toString().trim());
                setSuccess(false); 
                setLoading(false);
            }
        } else {
            setText("문법 제대로 지켜주세요ㅠㅠ");
            setSuccess(false); 
            setLoading(false);
        }
    } catch(e){
        setSuccess(false);
        setLoading(false);
    }
    }
  };

  const handleDelete = () => {
    console.log("니가 틀리고 끄려고 하지마!");
  }
  return (
    <div className={classes.root} >
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Submit
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
      <div >
          <Chip
            icon={<FaceIcon />}
            label={text}
            onDelete={handleDelete}
            color={color}
          />
      </div>
    </div>
  );
}