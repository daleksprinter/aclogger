import React, {useState} from 'react';
import {Paper, TextField, Button, Select, MenuItem, Input, SelectChangeEvent, } from '@mui/material';
import {conditionsDTO} from "../../modules/condition";
import '../Filter/Filter.css'
import {Status, statusfactory} from "../../modules/status";
import {getdate} from "../../modules/utils"
const Statuses = [statusfactory.Accept(), statusfactory.WrongAnswer(), statusfactory.RuntimeError(), statusfactory.CompileError(), statusfactory.InternalError(), statusfactory.TimeLimitEceeded(), statusfactory.MemoryLimitEceeded(), statusfactory.OutputLimitEceeded()]
const AtCoderProblemPoints = Array.from({length: 31}, (_, i) => i * 100);
const CodeforcesProblemPoints = Array.from({length: 31}, (_, i) => i * 100);
const yukicoderProblemPoints = Array.from({length: 7}, (_, i) => i);
interface AppProps{
   update: any
}
const Filter = (props: AppProps) => {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1)
    const fd = getdate(d.getTime())

    const [from_date, setFromdate] = useState(fd)
    const [to_date, setTodate] = useState(getdate(new Date().getTime()))
    const [atcoder_lower_point, setAlp]  = useState(0)
    const [atcoder_upper_point, setAup]  = useState(2000)
    const [atcoder_status, setAs]  = useState(["AC"])
    const [codeforces_lower_point, setClp]  = useState(0)
    const [codeforces_upper_point, setCup]  = useState(3000)
    const [codeforces_status,setCs]  = useState(["AC"])
    const [aoj_status,setAojs]  = useState(["AC"])
    const [yukicoder_lower_point, setYlp]  = useState(0)
    const [yukicoder_upper_point,setYup]  = useState(6)

    const handleChange = (e: any) => {
        const val = e.target.value
        switch(e.target.name){
            case "from_date" :
                setFromdate(val)
                break
            case "to_date" :
                setTodate(val)
                break
            case "atocder_lower_point" :
                setAlp(val)
                break
            case "atcoder_upper_point" :
                setAup(val)
                break
            case "atcoder_status" :
                setAs(val)
                break
            case "codeforces_lower_point" :
                setClp(val)
                break
            case "codeforces_upper_point" :
                setCup(val)
                break
            case "codeforces_status" :
                setCs(val)
                break
            case "aoj_status" :
                setAojs(val)
                break
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

    const handleClick = () => {
        const conddto = new conditionsDTO(
            new Date(from_date).getTime(),
            new Date(to_date).getTime(),
            atcoder_lower_point,
            atcoder_upper_point,
            atcoder_status.map(s => new Status(s)),
            codeforces_lower_point,
            codeforces_upper_point,
            codeforces_status.map((s => new Status(s))),
            aoj_status.map(s=> new Status(s)),
            yukicoder_lower_point,
            yukicoder_upper_point
        )
        props.update(conddto)
    }
    return (
        <Paper className="filter">
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
                <MenuItem value={0}>
                  <em></em>
                </MenuItem>
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
                <MenuItem value={0}>
                  <em></em>
                </MenuItem>
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
                <MenuItem value={0}>
                  <em></em>
                </MenuItem>
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
                 <MenuItem value={0}>
                  <em></em>
                </MenuItem>
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


            <div></div>
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


            <div></div>
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
                <MenuItem value={0}>
                  <em></em>
                </MenuItem>
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

                <MenuItem value={0}>
                  <em></em>
                </MenuItem>
                {yukicoderProblemPoints.map(p => {
                    return (
                        <MenuItem value={p}>{p}</MenuItem>
                    )
                })}
            </Select>

            <div></div>
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
