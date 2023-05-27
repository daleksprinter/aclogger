import React from 'react';
import {Paper, Button} from '@mui/material';
import {conditionsDTO} from "../../modules/condition";
import {DateFilter} from "./DateFilter";
import {YukicoderFilter} from "./yukicoderFilter";
import {AOJFilter} from "./AOJFilter";
import {CodeforcesFilter} from "./CodeforcesFilter";
import {AtcoderFilter} from "./AtcoderFilter";

interface AppProps{
   update: any
}
const Filter = (props: AppProps) => {
    const handleClick = () => {
        const conddto = new conditionsDTO(
            0, 0,
            0, 0, [],
            0, 0, [],
            [],
            0, 0
        )
        props.update(conddto)
    }
    return (
        <Paper style={{position:'relative', padding:'10px'}}>
            <DateFilter />
            <AtcoderFilter />
            <CodeforcesFilter />
            <YukicoderFilter />
            <AOJFilter />


            <Button
                variant="outlined"
                color="primary"
                onClick = {handleClick}
            >
                Filter
            </Button>

            <Button
                variant="outlined"
                color="primary"
            >
                Reset
            </Button>
        </Paper>
    );
}
export default Filter
