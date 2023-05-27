import React, {useState} from "react";
import {getdate} from "../../modules/utils";
import {Paper, TextField} from "@mui/material";

export const DateFilter = () => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1)
    const fd = getdate(d.getTime())

    const [from_date, setFromdate] = useState(fd)
    const [to_date, setTodate] = useState(getdate(new Date().getTime()))

    const handleChange = (e: any) => {
        const val = e.target.value
        switch(e.target.name){
            case "from_date" :
                setFromdate(val)
                break
            case "to_date" :
                setTodate(val)
                break
            default:
                break
        }
    }

    return (
       <div>
           <TextField
                id="from_date"
                label="From Date"
                type="date"
                defaultValue={from_date}
                margin="normal"
                onChange = {handleChange}
                name = 'from_date'
            />
            <TextField
                id="to_date"
                label="To Date"
                type="date"
                defaultValue={to_date}
                margin="normal"
                onChange = {handleChange}
                name = 'to_date'
            />
       </div>
    )
}
