import React, {ReactNode} from "react";
import {State as StoreState} from "../store";
import {Dispatch} from "redux";
import {connect} from "react-redux";

import * as Actions from '../store/domains/actions'
import {DomainModel, DomainModel as TableModel} from '../api/Domains'

import EditPage from "./EditPage";
import Button from "@material-ui/core/Button";
import {NavigateFunction, useNavigate} from "react-router-dom";

interface PropsFromState {
  loading: boolean;
  tableData: Array<TableModel>;
  totalRecords: number,
  offset: number,
  limit: number,
}

interface PropsFromDispatch {
  doFetch: typeof Actions.Fetch;
  doSave: typeof Actions.Save;
}

type AllProps = PropsFromState & PropsFromDispatch

const fields = [
  {field: "name", header: "Domain Name", type: "string"},
];

function generateShowDomain(id:string, navigator:NavigateFunction) {
  return function() {
    navigator(`/domain/${id}`)
  }
}

function Domains(props: AllProps) {
  const navigator = useNavigate();

  const columns = [
    {
      field: "name", header: "Domain Name"
    },
    {
      field: "actions", header: "Actions", cellFunc: (data: any) => {
        return (
          <div>
            <Button
              key="view"
              children="View"
              variant={"contained"}
              onClick={generateShowDomain(data.id, navigator)}
            />
          </div>
        )
      }
    }
  ];

  const editProps = {
    ...props,
    pageName: "Domains",
    columns: columns,
    fields: fields,
    defaultModel: {
      name: ""
    }
  }

  return EditPage<DomainModel>(editProps);
}

function mapStateToProps(state: StoreState): PropsFromState {
  return {
    loading: state.domains.busy,
    tableData: state.domains.data,
    totalRecords: state.domains.totalLength,
    limit: state.domains.limit,
    offset: state.domains.offset,
  }
}

function mapDispatchToProps(dispatch: Dispatch): PropsFromDispatch {
  return {
    doFetch: (offset: number, limit: number) => dispatch(Actions.Fetch(offset, limit)),
    doSave: (data: TableModel, offset: number, limit: number) => dispatch(Actions.Save(data, offset, limit)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Domains);
