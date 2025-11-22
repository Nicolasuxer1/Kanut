'use client';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Shortcuts } from '@/components/Shortcuts';
import { AlertsTable } from '@/components/AlertsTable';
import { WaterSystemDashboard } from '@/components/WaterSystemDashboard';
import { Dashboard, Edit, Add, Wifi } from '@mui/icons-material';
import { Typography, Chip, IconButton } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Stack sx={{ flex: 1, overflow: 'auto' }}>
        <Header />
        <Box sx={{ p: 5 }}>
          {/* Dashboard Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            {/* Left: Icon + Title + Badge */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Dashboard sx={{ fontSize: 32, color: 'text.primary' }} />
              <Typography variant="h4" fontWeight="bold">
                Dashboard
              </Typography>
              <Chip
                label={
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <span>Online</span>
                    <Wifi sx={{ fontSize: 14 }} />
                  </Stack>
                }
                size="small"
                color="success"
              />
            </Stack>

            {/* Right: Edit Button + Add Button */}
            <Stack direction="row" spacing={1}>
              <IconButton
                sx={{
                  bgcolor: 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' }
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                <Add />
              </IconButton>
            </Stack>
          </Stack>

          {/* Dashboard Content */}
          <Shortcuts />
          <AlertsTable />
          <WaterSystemDashboard />
        </Box>
      </Stack>
    </Box>
  );
}
