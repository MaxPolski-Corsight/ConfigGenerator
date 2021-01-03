import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { render } from '@testing-library/react';


const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function TreeExample() {
  const classes = useStyles();
  const [config, setConfig] = useState(require('./config.json'));

  const x = config["LOGS"]["server_selection_timeout"];
  console.log(typeof x)
  /*const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );*/

  const renderT = (nodes, level) => {
      if (typeof(nodes) != 'object'){
          return (<TreeItem key={nodes} nodeId={level++} label={nodes}>nodes</TreeItem>)
      } else{
          return Object.keys(nodes).map(i => {
            return (<TreeItem key={i} nodeId={level++} label={i}>
                    {renderT(i,level)}
                  </TreeItem>)})
      }
  }

  const renderTree = (nodes, level) =>{
      console.log(nodes)
      return Object.keys(nodes).map(i => {
          return (<TreeItem key={i} nodeId={level++} label={i}>
              {typeof nodes[i] == 'object' ? renderTree(nodes[i],level++) : null}
                </TreeItem>)})
  };

  return (

    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderT(config,1)}
    </TreeView>

  );
}

