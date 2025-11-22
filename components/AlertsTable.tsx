'use client';

import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Paper,
} from '@mui/material';
import { FilterList, Info, Warning, Error } from '@mui/icons-material';

const alerts = [
    {
        name: 'EC alta Zona A',
        id: 'ALERT-001',
        type: 'Informational',
        priority: 'HIGH',
        system: 'WATER SYSTEMS',
        time: '3 min ago',
        automation: 'Automation Rule Name',
        resolvedBy: 'JD',
        mutedBy: 'AB',
    },
    {
        name: 'EC alta Zona A',
        id: 'ALERT-001',
        type: 'Health - Crop',
        priority: 'HIGH',
        system: 'WATER SYSTEMS',
        time: '3 min ago',
        automation: 'Automation Rule Name',
        resolvedBy: 'FO',
        mutedBy: 'EG',
    },
    {
        name: 'EC alta Zona A',
        id: 'ALERT-001',
        type: 'System Warning',
        priority: 'HIGH',
        system: 'WATER SYSTEMS',
        time: '3 min ago',
        automation: 'Automation Rule Name',
        resolvedBy: 'JD',
        mutedBy: 'AB',
    },
];

export function AlertsTable() {
    return (
        <Paper
            elevation={0}
            sx={{
                mb: 4,
                p: 4,
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Alerts
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Chip label="Active (3)" variant="outlined" size="small" />
                    <Chip label="Muted (10)" variant="outlined" size="small" />
                    <Chip
                        label="Filters"
                        icon={<FilterList fontSize="small" />}
                        variant="outlined"
                        size="small"
                        deleteIcon={<Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'white' }}>3</Box>}
                        onDelete={() => { }}
                    />
                </Stack>
            </Stack>

            <Box sx={{
                overflowX: 'auto',
                '&::-webkit-scrollbar': { height: 6, background: 'transparent', display: 'none' },
                '&::-webkit-scrollbar-thumb': { backgroundColor: 'divider', borderRadius: 4 },
                '&::-webkit-scrollbar-thumb:hover': { backgroundColor: 'primary.main' },
                // Firefox
                scrollbarWidth: 'thin',
                // Show scrollbar on hover
                '&:hover::-webkit-scrollbar': { display: 'block' },
            }}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{
                                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#012A61' : '#DFECFF'
                            }}>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Alert Name</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Alert ID</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Type</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Priority</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Systems</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Triggered At</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Linked Automation</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Resolved By</TableCell>
                                <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>Muted By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {alerts.map((alert, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                            {alert.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{alert.id}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            {alert.type === 'Informational' && <Info fontSize="small" />}
                                            {alert.type === 'Health - Crop' && <Warning fontSize="small" />}
                                            {alert.type === 'System Warning' && <Error fontSize="small" />}
                                            <Typography variant="body2">{alert.type}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={alert.priority} color="error" size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={alert.system} variant="outlined" size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{alert.time}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="primary" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                            {alert.automation}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24, fontSize: 12 }}>
                                            {alert.resolvedBy}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        <Avatar sx={{ bgcolor: 'warning.main', width: 24, height: 24, fontSize: 12 }}>
                                            {alert.mutedBy}
                                        </Avatar>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
}
