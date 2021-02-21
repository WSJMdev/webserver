import React, {useState} from 'react';
import { classnames, DataGrid } from '@material-ui/data-grid';
import Question from './question.js';
import { makeStyles } from '@material-ui/core/styles';
const columns = [
  { field: 'id', headerName: 'id', width: 80 },
  { field: '글이름', headerName: '글이름', width: 400 },
  { field: '작성자', headerName: '작성자', width: 160 },
  {
    field: '작성일',
    headerName: '작성일',
    width: 170,
  },
  {
    field: '조회',
    headerName: '조회',
    width: 100,
  }
];

const useStyles = makeStyles((theme) => ({
    root : {
        height: '90vh', 
        width: '100%'
    }
}));

const rows = [
  { id: 1, 글이름: 'Java 질문입니다.', 작성자: 'mize159', 작성일:"2015",조회: 35 }
]
const example=[{
    detailed:`이 코드가 왜 안될까요...
분명히 abcd 출력하는 방법 책 대로 따라했는데, 출력이 안됩니다. 
아무리 봐도 뭐가 잘못인지 모르겠습니다.`,
    pos:"",
    formal:"public class Test {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println('abcd');\n\t}\n}",
    language:"java"
}];
export default function DataTable() {
    const classes = useStyles();
    const [reading, setReading] = useState("");
    const handleClick = (e) => {
        console.log(e.row.id);
        setReading(e.row.id);
    }
    if(reading==""){
        return (
            <div className={classes.root}>
                <DataGrid rows={rows} columns={columns} pageSize={15} autowidth={true} autoHeight={true} onCellClick={handleClick} hideFooterSelectedRowCount={true}/>
            </div>
        );
    } else {
        return(
            <Question props={{id:reading, title:rows[reading - 1]["글이름"], context:example}}/>
        );
    }
}