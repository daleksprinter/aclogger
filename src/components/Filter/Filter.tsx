import React from 'react';
import {Paper, TextField, Button, Select, MenuItem, Input, SelectChangeEvent, } from '@mui/material';
import {conditionsDTO} from "../../modules/condition";
import '../Filter/Filter.css'
import {Status, statusfactory} from "../../modules/status";

const Statuses = [statusfactory.Accept(), statusfactory.WrongAnswer(), statusfactory.RuntimeError(), statusfactory.CompileError(), statusfactory.InternalError(), statusfactory.TimeLimitEceeded(), statusfactory.MemoryLimitEceeded(), statusfactory.OutputLimitEceeded()]
const AtCoderProblemPoints = Array.from({length: 31}, (_, i) => i * 100);
const CodeforcesProblemPoints = Array.from({length: 31}, (_, i) => i * 100);
const yukicoderProblemPoints = Array.from({length: 7}, (_, i) => i);
interface AppProps{
   update: any
}
interface AppState{
    from_date: string
    to_date:string
    atcoder_lower_point: number,
    atcoder_upper_point: number,
    atcoder_status: string[],
    codeforces_lower_point: number,
    codeforces_upper_point: number,
    codeforces_status: string[],
    aoj_status: string[],
    yukicoder_lower_point: number,
    yukicoder_upper_point: number,
}

export default class Filter extends React.Component<AppProps, AppState>{

    constructor(props: AppProps) {
        super(props);
        this.state = {
            from_date: "2017-01-01",
            to_date: "2025-01-01",
            atcoder_lower_point: 0,
            atcoder_upper_point: 10000,
            atcoder_status: ["AC"],
            codeforces_lower_point: 0,
            codeforces_upper_point: 10000,
            codeforces_status: ["AC"],
            aoj_status: ["AC"],
            yukicoder_lower_point: 0,
            yukicoder_upper_point: 10,
        }
    }

    handleChange = (e: any) => {
        switch(e.target.name){
            case "from_date" :
                this.setState({from_date : e.target.value})
                break
            case "to_date" :
                this.setState({to_date : e.target.value})
                break
            case "atocder_lower_point" :
                this.setState({atcoder_lower_point : e.target.value})
                break
            case "atcoder_upper_point" :
                this.setState({atcoder_upper_point : e.target.value})
                break
            case "atcoder_status" :
                this.setState({atcoder_status : e.target.value})
                break
            case "codeforces_lower_point" :
                this.setState({codeforces_lower_point : e.target.value})
                break
            case "codeforces_upper_point" :
                this.setState({codeforces_upper_point : e.target.value})
                break
            case "codeforces_status" :
                this.setState({codeforces_status : e.target.value})
                break
            case "aoj_status" :
                this.setState({aoj_status : e.target.value})
                break
            case "yukicoder_lower_point" :
                this.setState({yukicoder_lower_point : e.target.value})
                break
            case "yukicoder_upper_point" :
                this.setState({yukicoder_upper_point : e.target.value})
                break
            default:
                break
        }
    }

    handleClick = () => {
        const from_date = new Date(this.state.from_date).getTime()
        const to_date = new Date(this.state.to_date).getTime()
        const atcoder_lower_point = this.state.atcoder_lower_point
        const atcoder_upper_point = this.state.atcoder_upper_point
        const atcoder_status = this.state.atcoder_status.map(s => new Status(s))
        const codeforces_lower_point = this.state.codeforces_lower_point
        const codeforces_upper_point= this.state.codeforces_upper_point
        const codeforces_status= this.state.codeforces_status.map((s => new Status(s)))
        const aoj_status = this.state.aoj_status.map(s=> new Status(s))
        const yukicoder_lower_point = this.state.yukicoder_lower_point
        const yukicoder_upper_point= this.state.yukicoder_upper_point

        const conddto = new conditionsDTO(
            from_date,
            to_date,
            atcoder_lower_point,
            atcoder_upper_point,
            atcoder_status,
            codeforces_lower_point,
            codeforces_upper_point,
            codeforces_status,
            aoj_status,
            yukicoder_lower_point,
            yukicoder_upper_point
        )
        console.log(conddto)
        this.props.update(conddto)
    }
    render(){
        return (
            <Paper className="filter">
                <TextField
                    id="from_date"
                    label="From Date"
                    type="date"
                    defaultValue="2017-05-24"
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'from_date'
                />
                <TextField
                    id="to_date"
                    label="To Date"
                    type="date"
                    defaultValue="2023-05-24"
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'to_date'
                />

                <h3>AtCoder</h3>

                <span>Point : </span>
                <Select
                    value={this.state.atcoder_lower_point}
                    onChange={this.handleChange}
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
                    value={this.state.atcoder_upper_point}
                    onChange={this.handleChange}
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
                  value={this.state.atcoder_status}
                  onChange={this.handleChange}
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
                    value={this.state.codeforces_lower_point}
                    onChange={this.handleChange}
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
                    value={this.state.codeforces_upper_point}
                    onChange={this.handleChange}
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
                  value={this.state.codeforces_status}
                  onChange={this.handleChange}
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
                  value={this.state.aoj_status}
                  onChange={this.handleChange}
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
                    value={this.state.yukicoder_lower_point}
                    onChange={this.handleChange}
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
                    value={this.state.yukicoder_upper_point}
                    onChange={this.handleChange}
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
                        onClick = {this.handleClick}
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
}
