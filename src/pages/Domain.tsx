import React from "react";

import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import {State as StoreState} from "../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import { useParams} from "react-router-dom";

interface PropsFromState {
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch

function Domain(props: AllProps) {
  const params:any = useParams();
  return (
    <Paper id="domains">
      <Typography variant="h1">Domain - {params.id}</Typography>
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