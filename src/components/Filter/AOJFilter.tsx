import {Input, MenuItem, Paper, Select} from "@mui/material";
import React, {useState} from "react";
import {statusfactory} from "../../modules/status";


const Statuses = [statusfactory.Accept(), statusfactory.WrongAnswer(), statusfactory.RuntimeError(), statusfactory.CompileError(), statusfactory.InternalError(), statusfactory.TimeLimitEceeded(), statusfactory.MemoryLimitEceeded(), statusfactory.OutputLimitEceeded()]
export const AOJFilter = () => {

    const [aoj_status,setAojs]  = useState(["AC"])
    const handleChange = (e: any) => {
        const val = e.target.value
        switch(e.target.name){
            case "aoj_status" :
                setAojs(val)
                break
            default:
                break
        }
    }
    return (
        <div>
            <h3>AOJ</h3>
            <span>Status : </span>
            <Select
              labelId="aoj_status"
              id="aoj_status"
              name="aoj_status"
              multiple
              value={aoj_status}
              onChange={handleChange}
              input={<Input id="aoj_status" />}
            >
              {Statuses.map((s) => (
                <MenuItem value={s.getStatus()}>
                  {s.getStatus()}
                </MenuItem>
              ))}
            </Select>
        </div>
    )
}
