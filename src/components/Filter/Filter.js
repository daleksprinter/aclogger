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
            codeforces_status: "",
            aoj_status: "",
            yukicoder_lower_point: "",
            yukicoder_upper_point: "",
            yukicoder_status: "",
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
            case "yukicoder_status" :
                this.setState({yukicoder_status : e.target.value})
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
                <TextField
                    id="codeforces_lower_point"
                    label="Codeforces Point From"
                    className={styles.textField}
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'codeforces_lower_point'
                />
                <TextField
                    id="codeforces_upper_point"
                    label="Codeforces Point To"
                    className={styles.textField}
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'codeforces_upper_point'
                />
                <TextField
                    id="codeforces_status"
                    label="Codeforces Status"
                    className={styles.textField}
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'codeforces_status'
                />
                <div>AOJ</div>
                <TextField
                    id="aoj_status"
                    label="AOJ Status"
                    className={styles.textField}
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'aoj_status'
                />
                <div>yukicoder</div>
                <TextField
                    id="yukicoder_lower_point"
                    label="yukicoder Point From"
                    className={styles.textField}
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'yukicoder_lower_point'
                />
                <TextField
                    id="yukicoder_upper_point"
                    label="yukicoder Point To"
                    className={styles.textField}
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'yukicoder_upper_point'
                />
                <TextField
                    id="yukicoder_status"
                    label="yukicoder Status"
                    className={styles.textField}
                    margin="normal"
                    onChange = {this.handleChange}
                    name = 'yukicoder_status'
                />
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
