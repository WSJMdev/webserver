import React, {useState} from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    marginTop: theme.spacing(1.5),
    margin: theme.spacing(1),
  },
  search:{
    marginLeft: 'auto',
    width:"100%"
  }
}));
export default function ChipsArray() {
  const classes = useStyles();
  const [word, setword] = useState("")
  const [chipData, setChipData] = useState([
    //{ key: 0, label: 'Java' }
  ]);
  const handleWord = (e) => {
    setword(e.target.value);
  }
  const addData = (e) => {
    const isIn = (w) => {
        return w.label === word;
    }
    if(e.key =="Enter" && word !=="" && chipData.find(isIn) === undefined){
        if(chipData.length == 0){
            chipData.push({key:0,label:word});
        }else {
            chipData.push({key:chipData[chipData.length - 1].key + 1, label:word});
        }
        setword("");
    }
  }
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Paper component="p" className={classes.root}>
      {chipData.map((data) => {
        let icon;
        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
      
      <TextField className={classes.search} value={word} onChange={handleWord} id="outlined-basic" label="검색" variant="outlined" onKeyPress={addData}/>
    </Paper>
  );
}