import {MenuItem, Paper, Select} from "@mui/material";
import React, {useState} from "react";

const yukicoderProblemPoints = Array.from({length: 7}, (_, i) => i);
export const YukicoderFilter = () => {
    const [yukicoder_lower_point, setYlp]  = useState(0)
    const [yukicoder_upper_point,setYup]  = useState(6)

    const handleChange = (e: any) => {
        const val = e.target.value
        switch(e.target.name){
            case "yukicoder_lower_point" :
                setYlp(val)
                break
            case "yukicoder_upper_point" :
                setYup(val)
                break
            default:
                break
        }
    }
    return (
        <div>
            <h3>yukicoder</h3>
            <span>Level : </span>
            <Select
                value={yukicoder_lower_point}
                onChange={handleChange}
                inputProps={{
                  name: 'yukicoder_lower_point',
                  id: 'yukicoder_lower_point',
                }}
              >
                {yukicoderProblemPoints.map(p => {
                    return (
                        <MenuItem value={p}>{p}</MenuItem>
                    )
                })}
            </Select>
            <span> ~ </span>
            <Select
                value={yukicoder_upper_point}
                onChange={handleChange}
                inputProps={{
                  name: 'yukicoder_upper_point',
                  id: 'yukicoder_upper_point',
                }}
              >

                {yukicoderProblemPoints.map(p => {
                    return (
                        <MenuItem value={p}>{p}</MenuItem>
                    )
                })}
            </Select>
        </div>
    )
}
