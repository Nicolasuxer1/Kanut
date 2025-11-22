'use client';

import React from 'react';
import { Box, TextField, InputAdornment, IconButton, Avatar, Typography, Switch, Stack } from '@mui/material';
import { Search, NotificationsOutlined, LightMode, DarkMode, WbSunny } from '@mui/icons-material';
import { useTheme } from 'next-themes';

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === 'dark';

    return (
        <Box
            sx={{
                py: 2,
                px: 4,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                {/* Search */}
                <TextField
                    size="small"
                    placeholder="Search..."
                    sx={{ width: 320 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 2 },
                    }}
                />

                {/* Right Section */}
                <Stack direction="row" spacing={3} alignItems="center">
                    {/* Theme Toggle */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <LightMode fontSize="small" sx={{ color: !isDark ? 'warning.main' : 'text.disabled' }} />
                        <Switch
                            checked={isDark}
                            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                            size="small"
                        />
                        <DarkMode fontSize="small" sx={{ color: isDark ? 'primary.main' : 'text.disabled' }} />
                    </Stack>

                    {/* Weather Widget */}
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                            bgcolor: 'action.hover',
                            py: 0.5,
                            px: 2,
                            borderRadius: 3,
                        }}
                    >
                        <WbSunny sx={{ color: 'warning.main', fontSize: 18 }} />
                        <Typography variant="body2">26.3°C</Typography>
                        <Typography variant="body2" color="text.secondary">74%</Typography>
                        <Typography variant="body2" color="text.secondary">510 W/m²</Typography>
                    </Stack>

                    {/* Notifications */}
                    <IconButton size="small">
                        <NotificationsOutlined />
                    </IconButton>

                    {/* User Profile */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" fontWeight={600}>
                                Carlos Bustamante
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Acme Farm
                            </Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: 'warning.main', width: 36, height: 36 }}>CB</Avatar>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}
