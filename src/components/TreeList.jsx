import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
const TreeList = ({ data, treeHandle }) => {
    const itemHandle = item => {
        if (!item.children) { treeHandle(item) }
    }
    const renderTree = (nodes) => (
        <TreeItem sx={{p:1}} onClick={() => itemHandle(nodes)} key={nodes.depcode} nodeId={nodes.depcode} label={nodes.depname}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    return <TreeView
        // aria-label="file system navigator"
        // defaultCollapseIcon={<ExpandMoreIcon />}
        // defaultExpandIcon={<ChevronRightIcon />}
        // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{  flexGrow: 1, maxWidth: 400, overflowY: 'auto', flex:1 }}
    >
        {data.map(item => {
            return renderTree(item)
        })}
    </TreeView >
}

export default TreeList