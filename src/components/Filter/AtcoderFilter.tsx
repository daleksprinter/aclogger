import React, {useState} from "react";
import {Input, MenuItem, Paper, Select} from "@mui/material";
import {statusfactory} from "../../modules/status";

const Statuses = [statusfactory.Accept(), statusfactory.WrongAnswer(), statusfactory.RuntimeError(), statusfactory.CompileError(), statusfactory.InternalError(), statusfactory.TimeLimitEceeded(), statusfactory.MemoryLimitEceeded(), statusfactory.OutputLimitEceeded()]
const AtCoderProblemPoints = Array.from({length: 31}, (_, i) => i * 100);
export const AtcoderFilter = () => {
    const [atcoder_lower_point, setAlp]  = useState(0)
    const [atcoder_upper_point, setAup]  = useState(2000)
    const [atcoder_status, setAs]  = useState(["AC"])

    const handleChange = (e: any) => {
        const val = e.target.value
        switch(e.target.name){
            case "atocder_lower_point" :
                setAlp(val)
                break
            case "atcoder_upper_point" :
                setAup(val)
                break
            case "atcoder_status" :
                setAs(val)
                break
            default:
                break
        }
    }
    return (
        <div>
            <h3>AtCoder</h3>

            <span>Point : </span>
            <Select
                value={atcoder_lower_point}
                onChange={handleChange}
                inputProps={{
                  name: 'atocder_lower_point',
                  id: 'atocder_lower_point',
                }}
              >
                {AtCoderProblemPoints.map(p => {
                    return (
                        <MenuItem value={p}>{p}</MenuItem>
                    )
                })}
            </Select>
            <span> ~ </span>

            <Select
                value={atcoder_upper_point}
                onChange={handleChange}
                inputProps={{
                  name: 'atcoder_upper_point',
                  id: 'atcoder_upper_point',
                }}
              >
                {AtCoderProblemPoints.map(p => {
                    return (
                        <MenuItem value={p}>{p}</MenuItem>
                    )
                })}
            </Select>

            <div></div>
            <span>Status : </span>
            <Select
              labelId="atcoder_status"
              id="atcoder_status"
              name="atcoder_status"
              multiple
              value={atcoder_status}
              onChange={handleChange}
              input={<Input id="atcoder_status" />}
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
