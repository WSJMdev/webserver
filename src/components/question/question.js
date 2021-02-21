import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card, CardHeader, CardContent, CardActions, Collapse, Avatar, IconButton, Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CodeWrapper from '../code/codeWrapper.js';
import Child from './child.js';
import style from '../../css/Default.module.css';
//Test cases
const example=[{
    detailed:"자바에서 String과 char의 구분이 엄격합니다.\n 자바는 파이썬과는 다르게 타입에 대한 제약이 강합니다.",
    formal:'public class Test {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("abcd");\n\t}\n}',
    language:"java",
},{
    detailed:`보시다시피, string 리터럴을 나타내는 ""를 사용해 주셔야 합니다.\n String으로 정확히 해주셔야 합니다.`,
    formal:'public class Test {\n\tpublic static void main(String[] args) {\n\t\tString a = "abcd";\n\t\tSystem.out.println(a);\n\t}\n}',
    language:"java",
}];

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    'font-family': '-apple-system, BlinkMacSystemFont,"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
}));


//이 컴포넌트는 게시글을 나타냅니다. 
// 이 컴포넌트에는 id, title, context : [{detailed: , pos:숫자, formal:string, language:string}] 를 넣어주어야 합니다.

export default function RecipeReviewCard({props}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const Context = () => {
    const childlist =  props.context.map(elem =>
        <Typography variant="body1" color="textPrimary" style={{textAlign:'left', fontSize:'1.2rem', paddingTop:'2rem', overflow:'revert'}}>
            {elem.detailed.split('\n').map((line)=> {
              return  <Typography variant="body1" color="textPrimary" style={{textAlign:'left', fontSize:'1.2rem'}}>
                {line}</Typography>
            })}
            <CodeWrapper props={{number:0, formal:elem.formal, prefer:elem.language, num:0}}/>
        </Typography>
    );
    return (
        <CardContent>{childlist}</CardContent>
    );
   }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Q
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader="September 14, 2016"
      />
      <Context />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
        </CardContent>
      </Collapse>
      <Child props={{title:"이렇게 하셔야..", pos:5, context:example}}/>
      <Child props={{title:"문자와 문자열은 완전히 다릅니다.", pos:1, context:example}}/>
    </Card>
  );
}