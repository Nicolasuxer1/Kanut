'use client';

import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Dashboard, Storage, Notifications, Tune, Opacity, Add } from '@mui/icons-material';

const menuItems = [
    { icon: Dashboard, label: 'Dashboard', active: true },
    { icon: Storage, label: 'Data Hub', active: false },
    { icon: Notifications, label: 'Alert Center', active: false },
    { icon: Tune, label: 'Control Studio', active: false },
];

export function Sidebar() {
    return (
        <Box
            sx={{
                width: 256,
                height: '100vh',
                bgcolor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                py: 3,
                px: 2,
            }}
        >
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, px: 1 }}>
                <Opacity sx={{ color: 'primary.main', fontSize: 32 }} />
                <Typography variant="h5" fontWeight="bold">
                    kanut.
                </Typography>
            </Box>

            {/* Workspace Section */}
            <Typography variant="caption" color="text.secondary" sx={{ px: 2, mb: 1, textTransform: 'uppercase', fontWeight: 600 }}>
                Workspace
            </Typography>
            <List sx={{ mb: 3 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            selected={item.active}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                '&.Mui-selected': {
                                    bgcolor: 'action.selected',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <item.icon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {/* My Views Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                    My Views
                </Typography>
                <Add fontSize="small" sx={{ color: 'text.secondary', fontSize: 16 }} />
            </Box>
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ borderRadius: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <Opacity fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Water System" primaryTypographyProps={{ fontSize: 14 }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}
