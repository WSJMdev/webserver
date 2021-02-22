import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    witdh:130
  },
}));

export default function ControlledOpenSelect({func}) {
  const classes = useStyles();
  const [language, setlanguage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setlanguage(event.target.value);
    func(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Language</InputLabel>
        <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={language}
            onChange={handleChange}
        >
            <MenuItem value={"java"}>Java</MenuItem>
            <MenuItem value={"python"}>Python</MenuItem>
            <MenuItem value={"cplusplus"}>Cplusplus</MenuItem>
        </Select>
    </FormControl>
  );
}