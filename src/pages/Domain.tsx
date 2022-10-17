import React from "react";

import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import {State as StoreState} from "../store";
import {Dispatch} from "redux";
import * as Actions from "../store/domains/actions";
import {DomainModel as TableModel} from "../api/Domains";
import {connect} from "react-redux";

interface PropsFromState {
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch

function Domain(props: AllProps) {
  return (
    <Paper id="domains">
      <Typography variant="h1">Domain</Typography>
    </Paper>
  )
}

function mapStateToProps(state: StoreState): PropsFromState {
  return {
  }
}

function mapDispatchToProps(dispatch: Dispatch): PropsFromDispatch {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Domain);