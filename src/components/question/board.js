import React, {useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Question from './question.js';
import { makeStyles, TextField } from '@material-ui/core';
import Chip from '../search/chip.js';
let columns = [
  { field: 'id', headerName: 'id', width: 80 },
  { field: '글이름', headerName: '글이름', width: 400 },
  { field: '작성자', headerName: '작성자', width: 200 },
  {
    field: '작성일',
    headerName: '작성일',
    width: 200,
  },
  {
    field: '조회',
    headerName: '조회',
    width: 100,
  }
];
const windowsz = window.innerWidth / 8;
if(window.innerWidth < 600){
    columns = [
        { field: 'id', headerName: 'id', width: 20 },
        { field: '글이름', headerName: '글이름', width: 145 },
        { field: '작성자', headerName: '작성자', width: 100 },
        {
          field: '작성일',
          headerName: '작성일',
          width: 100,
        },
        {
          field: '조회',
          headerName: '조회',
          width: 100,
        }
    ];
}

console.log(windowsz);
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
    detailed:"이 코드가 왜 안될까요... \n 분명히 abcd 출력하는 방법 책 대로 따라했는데, 출력이 안됩니다.  아무리 봐도 뭐가 잘못인지 모르겠습니다.",
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
    //검색어 필터 서비스
    const isRight = (w) => {
        let flag = true;
        let chipData=[];
        for (var elem of chipData){
            if(!w.label.includes(elem)){
                flag = false;
            }
        }
        return flag
    }

    if(reading==""){
        return (
            <div className={classes.root}>
                <Chip />
                <DataGrid rows={rows} columns={columns} pageSize={15} autowidth={true} autoHeight={true} onCellClick={handleClick} hideFooterSelectedRowCount={true}/>
            </div>
        );
    } else {
        return(
            <Question props={{id:reading, title:rows[reading - 1]["글이름"], context:example}}/>
        );
    }
}