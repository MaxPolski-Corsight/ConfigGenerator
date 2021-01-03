import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import testConfig from "./ConfigClass";
import AddIcon from '@material-ui/icons/Add';
var classes;

function configTreeRoot(node) {
  if (node.children == null) {
    return (
      <AccordionDetails>
        {node.type == "boolean" ? (
          <>
            {node.key} :
            <Switch
              checked={node.data}
              name={`${node.key}_text`}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </>
        ) : (
          <>
          <TextField
            id={`${node.key}_text`}
            label={`${node.key.split("_").join(" ")}`}
            type={node.type}
            defaultValue={node.data}
            InputLabelProps={{
              shrink: true,
            }}
          /> {node.type == 'array' ? <AddIcon/> : ''}
          </>
        )}
      </AccordionDetails>
    );
  } else {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${node.key}_${node.level}_content`}
          id={`${node.key}_${node.level}_header`}
        >
          {node.key}
        </AccordionSummary>
        {node.children.map((node) => configTreeRoot(node))}
      </Accordion>
    );
  }
}

function configTree(config_json, level) {
  return Object.entries(config_json).map(([key, value]) => {
    if (!value || typeof value != "object") {
      if (key == "whitelist_certainty_min_crop_size_px") {
        value = 5555555555555;
      }
      if (typeof value == "boolean") {
        return (
          <AccordionDetails>
            {key} :
            <Switch
              checked={value}
              name={`${key}_text`}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </AccordionDetails>
        );
      } else
        return (
          <AccordionDetails>
            <TextField
              id={`${key}_text`}
              label={`${key}`}
              type={typeof value}
              defaultValue={value}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccordionDetails>
        );
    } else {
      return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${key}_${level}_content`}
            id={`${key}_${level}_header`}
          >
            {key}
          </AccordionSummary>
          {configTree(value, level + 1)}
        </Accordion>
      );
    }
  });
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    whiteSpace: 'nowrap',
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ConfigView() {
  const [config, setConfig] = useState(require("./config.json"));
  const root = testConfig(config);
  classes = useStyles();
  return (
    <Container fixed>
      {configTreeRoot(root)}
      {console.log(config)}
    </Container>
  );
}
