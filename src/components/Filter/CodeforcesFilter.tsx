import React, {useState} from "react";
import {Input, MenuItem, Paper, Select} from "@mui/material";
import {statusfactory} from "../../modules/status";

const Statuses = [statusfactory.Accept(), statusfactory.WrongAnswer(), statusfactory.RuntimeError(), statusfactory.CompileError(), statusfactory.InternalError(), statusfactory.TimeLimitEceeded(), statusfactory.MemoryLimitEceeded(), statusfactory.OutputLimitEceeded()]
const CodeforcesProblemPoints = Array.from({length: 31}, (_, i) => i * 100);

export const CodeforcesFilter = () => {
    const [codeforces_lower_point, setClp]  = useState(0)
    const [codeforces_upper_point, setCup]  = useState(3000)
    const [codeforces_status,setCs]  = useState(["AC"])

    const handleChange = (e: any) => {
        const val = e.target.value
        switch(e.target.name){
            case "codeforces_lower_point" :
                setClp(val)
                break
            case "codeforces_upper_point" :
                setCup(val)
                break
            case "codeforces_status" :
                setCs(val)
                break
            default:
                break
        }
    }

    return (
       <div>
           <h3>CodeForces</h3>
            <span>Point : </span>
            <Select
                value={codeforces_lower_point}
                onChange={handleChange}
                inputProps={{
                  name: 'codeforces_lower_point',
                  id: 'codeforces_lower_point',
                }}
              >
                {CodeforcesProblemPoints.map(p => {
                    return (
                        <MenuItem value={p}>{p}</MenuItem>
                    )
                })}
            </Select>
            <span> ~ </span>

            <Select
                value={codeforces_upper_point}
                onChange={handleChange}
                inputProps={{
                  name: 'codeforces_upper_point',
                  id: 'codeforces_upper_point',
                }}
              >
                {CodeforcesProblemPoints.map(p => {
                    return (
                        <MenuItem value={p}>{p}</MenuItem>
                    )
                })}
            </Select>

            <div></div>
            <span>Status : </span>
            <Select
              labelId="codeforces_status"
              id="codeforces_status"
              name="codeforces_status"
              multiple
              value={codeforces_status}
              onChange={handleChange}
              input={<Input id="codeforces_status" />}
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
