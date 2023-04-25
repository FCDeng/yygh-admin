import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem'; 
const TreeList = ({ data, treeHandle }) => {
    const itemHandle = item => {
        if (!item.children) { treeHandle(item.id, item) }
    }
    const TreeItemRender = () => {
        return data.map(item => {
            if (item.children && item.children.length) {
                return TreeItemRender(item.children)
            }
            return <TreeItem onClick={itemHandle} key={item.id} nodeId={item.id} label={item.value} >
            </TreeItem>
        })
    }
    return <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
        {TreeItemRender()}
    </TreeView >
}

export default TreeList