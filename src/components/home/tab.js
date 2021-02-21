import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataTable from "../question/board.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  panel:{
      width:'70rem',
      height:'100%'
  }

}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
      console.log(value);
    setValue(newValue);
    console.log(value);
  };

  return (
        <div className={classes.root}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >
            <Tab label="질문하기" {...a11yProps(0)} />
            <Tab label="학습하기" {...a11yProps(1)} />
            <Tab label="프로젝트" {...a11yProps(2)} />
            <Tab label="스터디" {...a11yProps(3)} />
            <Tab label="포스트 작성" {...a11yProps(4)} />
        </Tabs>
            <TabPanel className={classes.panel} value={value} index={0}>
                <DataTable />
            </TabPanel>
            <TabPanel className={classes.panel} value={value} index={1}>
                <DataTable />
            </TabPanel>
            <TabPanel className={classes.panel} value={value} index={2}>
                <DataTable />
            </TabPanel>
            <TabPanel className={classes.panel} value={value} index={3}>
                <DataTable />
            </TabPanel>
            <TabPanel className={classes.panel} value={value} index={4}>
                <DataTable />
            </TabPanel>
        </div>
  );
}