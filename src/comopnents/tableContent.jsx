import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CountryJSON from "../data/countries.json";
const useStyles = makeStyles((theme) => ({
  minWidth: {
    minWidth: 150,
  },
}));

const CustomSwitch = withStyles({
  switchBase: {
    color: "#ff7332",
    "&$checked": {
      color: green[500],
    },
    "&$checked + $track": {
      backgroundColor: green[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function TableContent(props) {
  debugger;
  const [datalist, setDatalist] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);
  const classes = useStyles();
  const handleChange = (index, event) => {
    let toUpdate = [...datalist];
    toUpdate[index].isRelevant = event.target.checked ? "true" : "false";
    setDatalist(toUpdate);
  };
  useEffect(() => {
    setDatalist(props.grapheneJSON);
  }, [props]);
  const columns = [
    {
      name: "Publication number",
      label: "Publication Number",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <div className={classes.minWidth}>{value}</div>;
        },
      },
    },
    {
      name: "title",
      label: "Name",
      width: "300px",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Typography className="wrappedContent">{value}</Typography>;
        },
      },
    },
    {
      name: "Patenting date",
      label: "Patent Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Owner",
      label: "Owner",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Patent status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Publication number",
      label: "Publication Number",
      options: {
        display: false,
        customBodyRender: (value) => {
          let cCode = value.split("-")[0];
          return cCode && CountryJSON[cCode];
        },
      },
    },
    {
      name: "Family ID",
      label: "Family ID",
      options: {
        display: false,
      },
    },
    {
      name: "title",
      label: "title",
      options: {
        display: false,
      },
    },
    {
      name: "Google link",
      label: "googleLink",
      options: {
        display: false,
      },
    },
    {
      name: "isRelevant",
      label: "Assign Label",
      options: {
        customBodyRender: (value, meta) => {
          return (
            <FormGroup>
              <FormControlLabel
                control={
                  <CustomSwitch
                    checked={value === "true"}
                    onChange={(event) => handleChange(meta.rowIndex, event)}
                    name="checkedA"
                  />
                }
                label={
                  value
                    ? value === "true"
                      ? "relevant"
                      : "irrelevant"
                    : "Select"
                }
              />
            </FormGroup>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "multiple",
    rowsPerPage: 50,
    expandableRows: true,
    onRowSelectionChange: (rowsSelectedNow) => {
      setRowsSelected(rowsSelectedNow);
    },
    renderExpandableRow: (rowData, rowMeta) => {
      debugger;
      return (
        <tr>
          <td colSpan={6}>
            <Paper className="innerPaper">
              <span className="grayish">{`country: ${rowData[5]}`}</span>
              <span className="grayish">{`family ID: ${rowData[6]}`}</span>
              <p>
                <span>{rowData[7]}</span>
                <a href={`${rowData[8]} `}> View more on Google</a>
              </p>
            </Paper>
          </td>
        </tr>
      );
    },
    searchPlaceholder: "Enter keywords",
    filterType: "checkbox",
    elevation: 0,
    filter: false,
    print: false,
    selectToolbarPlacement: "none",
    sortOrder: {
      name: "timestamp",
      direction: "desc",
    },
    responsive: "vertical",
    rowsSelected: rowsSelected,
    onRowSelectionChange: (rowsSelectedNow) => {
      setRowsSelected(rowsSelectedNow);
    },
  };
  return <MUIDataTable data={datalist} columns={columns} options={options} />;
}
