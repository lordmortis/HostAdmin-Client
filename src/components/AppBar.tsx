import React from 'react';
//import PropTypes from 'prop-types';

import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class AppBar extends React.Component<any, any> {
    render() {
        return (
            <div>
                <MUIAppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Admin System
                        </Typography>
                    </Toolbar>
                </MUIAppBar>
            </div>
        );
    }
}

export default AppBar;