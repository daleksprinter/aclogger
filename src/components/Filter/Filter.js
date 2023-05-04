import React from 'react';
import {Paper, TextField, Button} from '@material-ui/core';

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
            atcoder_status: "",
            codeforces_lower_point: "",
            codeforces_upper_point: "",
            codeforces_status: "",
            aoj_status: "",
            yukicoder_lower_point: "",
            yukiconder_upper_point: "",
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
                this.setState({atocder_lower_point : e.target.value})
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
            case "yukiconder_upper_point" :
                this.setState({yukiconder_upper_point : e.target.value})
                break
            case "yukicoder_status" :
                this.setState({yukicoder_status : e.target.value})
                break
            default:
                break
        }
    }

    handleClick = () => {
    }
    render(){
        return (
            <div>
                <Paper>
                    <TextField
                        id="from_date"
                        label="From Date"
                        className={styles.textField}
                        margin="normal"
                        onChange = {this.handleChange}
                        name = 'from_date'
                    />
                </Paper>
                    <Button
                            variant="outlined"
                            color="primary"
                            className={styles.button}
                            onClick = {this.handleClick}
                        >
                          Filter
                    </Button>
            </div>
      );
    }
}
