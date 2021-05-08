import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  groupedResultsByYear,
  groupedResultsByNoOfPatents,
  groupAndAverageByScore,
} from "../utils/utils";
import {
  Backdrop,
  ListSubheader,
  Button,
  List,
  ListItem,
  Dialog,
  DialogActions,
  DialogContent,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@material-ui/core";
import ChartD3 from "../ChartD3.jsx";
import BarChart from "../Bar.jsx";
import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from "@material-ui/icons/BarChart";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import TrendingUpSharpIcon from "@material-ui/icons/TrendingUpSharp";
import ShowChartSharpIcon from "@material-ui/icons/ShowChartSharp";
import BarChartSharpIcon from "@material-ui/icons/BarChartSharp";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "10px",
    backgroundColor: theme.palette.background.paper,
  },
  trendTitle: {
    display: "inline-block",
    "vertical-align": "super",
    "font-size": "20px",
    margin: "0px 10px",
    cursor: "pointer",
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function DataVisualizer(props) {
  const classes = useStyles();
  const [datalist, setDatalist] = useState(props.grapheneJSON);
  const [chartDialogStatus, setChartDialogStatus] = useState(false);
  useEffect(() => {
    setDatalist(props.grapheneJSON);
  }, [props]);
  const [chartDialogDetails, setChartDialogDetails] = useState({
    type: "",
    title: "",
    subtitle: "",
    searchResult: {},
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const toggleChartDialog = (type, title, subtitle) => {
    setChartDialogStatus(true);
    if (type === "trends") {
      const PatentGroupedByYear = groupedResultsByYear(datalist);
      setChartDialogDetails({
        type,
        title,
        subtitle,
        data: _.cloneDeep(PatentGroupedByYear),
      });
    } else if (type === "competitors" || type === "countries") {
      let prop = type === "competitors" ? "Owner" : "Publication number";
      const TopCompetirors = groupedResultsByNoOfPatents(datalist, prop);
      setChartDialogDetails({
        type,
        title,
        subtitle,
        data: _.cloneDeep(TopCompetirors),
      });
    } else if ((type = "technicalCompetitor")) {
      const TopCompetirors = groupAndAverageByScore(datalist, "Owner");
      debugger;
      setChartDialogDetails({
        type,
        title,
        subtitle,
        data: _.cloneDeep(TopCompetirors),
      });
    }
  };
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            button={true}
            onClick={handleClick}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <div className={classes.trendTitle}>
              Check Trends and other details
            </div>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListSubheader>
        }
        className={classes.root}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItem
            button={true}
            onClick={() =>
              toggleChartDialog(
                "trends",
                "Check Graphene Patent Trend",
                "analyze patent trend for Graphene"
              )
            }
          >
            <ListItemIcon>
              <ShowChartSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Check Graphene Patent Trend" />
          </ListItem>
          <ListItem
            button={true}
            onClick={() =>
              toggleChartDialog(
                "competitors",
                "Your top competitors by number of patents",
                "Maximum Graphene Patent owners in the world"
              )
            }
          >
            <ListItemIcon>
              <TrendingUpSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Top Competitors By number of patents" />
          </ListItem>
          <ListItem
            button={true}
            onClick={() =>
              toggleChartDialog(
                "technicalCompetitor",
                "Your main technical competitors",
                "Most Technical Patent owners in the world"
              )
            }
          >
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Top Technical Competitor" />
          </ListItem>
          <ListItem
            button={true}
            onClick={() =>
              toggleChartDialog(
                "countries",
                "Grphene patents in the world",
                "Graphene patents stats in various countries"
              )
            }
          >
            <ListItemIcon>
              <BarChartSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Countries with maximum number of Patents" />
          </ListItem>
        </Collapse>
      </List>
      {/* Dialog for Displaying data */}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={chartDialogStatus}
        scroll={"paper"}
        onClose={() => setChartDialogStatus(false)}
        maxWidth="lg"
      >
        <DialogContent>
          <Typography variant="h5">{chartDialogDetails.title}</Typography>
          <div className="stats">
            {chartDialogDetails.type === "trends" ? (
              <ChartD3
                data={chartDialogDetails.data}
                title={chartDialogDetails.title}
              />
            ) : (
              <BarChart data={chartDialogDetails.data} />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="focusBtn"
            onClick={() => {
              setChartDialogStatus(false);
            }}
            variant="outlined"
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
