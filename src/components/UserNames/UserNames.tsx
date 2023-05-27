import React, {useState} from 'react';
import {Paper, TextField, Button} from "@mui/material";

interface AppProps{
   handleClick: any
}
const UserNames = (props: AppProps) => {

    const [cfuser, setCfuser] = useState("")
    const [acuser, setAcuser] = useState("")
    const [aojuser, setAojuser] = useState("")
    const [ycuser, setYcuser] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case "cfuser" :
                setCfuser(e.target.value)
                break
            case "acuser" :
                setAcuser(e.target.value)
                break
            case "aojuser" :
                setAojuser(e.target.value)
                break
            case "ycuser" :
                setYcuser(e.target.value)
                break
            default:
                break
        }
    }

    const handleClick = () => {
        props.handleClick(acuser, cfuser, aojuser, ycuser)
    }
        return (
             <Paper style={{textAlign:'center', padding:'2%', marginBottom:'5%'}}>
                    <TextField
                        id="cfid"
                        label="Codeforces ID"
                        margin="normal"
                        onChange = {handleChange}
                        name = 'cfuser'
                    />
                    <div></div>
                    <TextField
                        id="acid"
                        label="AtCoder ID"
                        margin="normal"
                        onChange = {handleChange}
                        name = 'acuser'
                    />
                    <div></div>
                    <TextField
                        id="aojid"
                        label="Aizu Online Judge ID"
                        margin="normal"
                        onChange = {handleChange}
                        name = 'aojuser'
                    />
                    <div></div>
                    <TextField
                        id="ycid"
                        label="yukicoder ID"
                        margin="normal"
                        onChange = {handleChange}
                        name = 'ycuser'
                    />
                    <div></div>
                    <br></br>
                    <div id = 'status'>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick = {handleClick}
                        >
                           Refresh
                        </Button>
                    </div>
                </Paper>
        );
}

export default UserNames;
