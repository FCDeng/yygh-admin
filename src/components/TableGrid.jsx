import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Stack, Typography, Select, Button, TextField, FormControl, MenuItem, InputLabel, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
const TableGrid = ({ columns, rows }) => {
    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 10,
    });
    return <Box sx={{ overflow: 'hidden', flex: 1 }}>
        <DataGrid pageSize={5} rows={rows} columns={columns}
            autoHeight
            initialState={{
                ...data.initialState,
                // pinnedColumns: { right: ['actions'] },
                pinnedColumns: { left: ['name'], right: ['actions'] },
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 20]}
        />
    </Box>
}

export default TableGrid