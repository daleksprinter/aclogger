import React from 'react';
import {Paper, TextField, Button, Select, MenuItem, Input} from '@material-ui/core';
import {conditionsDTO} from "../../modules/condition";
import '../Filter/Filter.css'

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
})

export default class Filter extends React.Component{

    constructor() {
        super();
        this.state = {
            from_date: "",
            to_date: "",
            atocder_lower_point: "",
            atcoder_upper_point: "",
            atcoder_status: [],
            codeforces_lower_point: "",
            codeforces_upper_point: "",
            codeforces_status: [],
            aoj_status: [],
            yukicoder_lower_point: "",
            yukicoder_upper_point: "",
        }
    }

    handleChange = (e) => {
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
       const conddto = new conditionsDTO(
           this.state.from_date,
           this.state.to_date,
           this.state.atcoder_lower_point,
           this.state.atcoder_upper_point,
           this.state.atcoder_status,
           this.state.codeforces_lower_point,
           this.state.codeforces_upper_point,
           this.state.codeforces_status,
           this.state.aoj_status,
           this.state.yukicoder_lower_point,
           this.state.yukicoder_upper_point,
           this.state.yukicoder_status
       )
        this.props.update(conddto)
    }
    render(){
        return (
            <Paper className="filter">
                <div>Common</div>
                <TextField
                    id="from_date"
                    label="From Date"
                    type="date"
                    defaultValue="2020-05-24"
                    className={styles.textField}
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'from_date'
                />
                <TextField
                    id="to_date"
                    label="To Date"
                    className={styles.textField}
                    type="date"
                    defaultValue="2023-05-24"
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'to_date'
                />

                <div>AtCoder</div>
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
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={600}>600</MenuItem>
                    <MenuItem value={700}>700</MenuItem>
                    <MenuItem value={800}>800</MenuItem>
                    <MenuItem value={900}>900</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={1100}>1100</MenuItem>
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
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={600}>600</MenuItem>
                    <MenuItem value={700}>700</MenuItem>
                    <MenuItem value={800}>800</MenuItem>
                    <MenuItem value={900}>900</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={1100}>1100</MenuItem>
                </Select>

                <Select
                  labelId="atcoder_status"
                  id="atcoder_status"
                  name="atcoder_status"
                  multiple
                  value={this.state.atcoder_status}
                  onChange={this.handleChange}
                  input={<Input id="atcoder_status" />}
                >
                  {["AC", "WA", "RE"].map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>

                <div>CodeForces</div>
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
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={600}>600</MenuItem>
                    <MenuItem value={700}>700</MenuItem>
                    <MenuItem value={800}>800</MenuItem>
                    <MenuItem value={900}>900</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={1100}>1100</MenuItem>
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
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                    <MenuItem value={300}>300</MenuItem>
                    <MenuItem value={400}>400</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={600}>600</MenuItem>
                    <MenuItem value={700}>700</MenuItem>
                    <MenuItem value={800}>800</MenuItem>
                    <MenuItem value={900}>900</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={1100}>1100</MenuItem>
                </Select>

                <Select
                  labelId="codeforces_status"
                  id="codeforces_status"
                  name="codeforces_status"
                  multiple
                  value={this.state.codeforces_status}
                  onChange={this.handleChange}
                  input={<Input id="codeforces_status" />}
                >
                  {["AC", "WA", "RE"].map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>

                <div>AOJ</div>
                <Select
                  labelId="aoj_status"
                  id="aoj_status"
                  name="aoj_status"
                  multiple
                  value={this.state.aoj_status}
                  onChange={this.handleChange}
                  input={<Input id="aoj_status" />}
                >
                  {["AC", "WA", "RE"].map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>

                <div>yukicoder</div>
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
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
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
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                </Select>

                <div></div>
                <Button
                        variant="outlined"
                        color="primary"
                        className={styles.button}
                        onClick = {this.handleClick}
                >
                      Filter
                </Button>

            </Paper>
      );
    }
}
