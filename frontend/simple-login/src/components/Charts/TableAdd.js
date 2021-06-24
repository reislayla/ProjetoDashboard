import React, {Component} from 'react';
import { Button } from 'antd';

class TableAdd extends Component {
    constructor(props) {
        super(props);

        const { query = {} } = props;
        console.log("handleTable", props);
        this.state = { query };

        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel(e) {
        e.preventDefault();
        console.log('You have canceled');
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center">

                    {/* To be configured */}
                    {/*<Button key="2" onClick={this.handleCancel} type="primary" danger>Cancel</Button>*/}

                    {/* Execute button to render table */}
                    <Button  type="default" onClick={this.props.onClick} style={{ background: "gray", borderColor: "gray", color:"white"}}>Execute</Button>
                </div>
            </div>
        );
    }
}

export default TableAdd;