'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Stack,
    Grid,
    List,
    ListItem,
    ListItemText,
    Tabs,
    Tab,
    Paper,
    Snackbar,
    Alert,
} from '@mui/material';
import { Info, FilterList, MoreVert, GridView, Add, Download, DragIndicator, Check, AspectRatio } from '@mui/icons-material';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const chartData = [
    { date: '3 July', temp: 24.0 },
    { date: '4 July', temp: 23.5 },
    { date: '5 July', temp: 25.8 },
    { date: '6 July', temp: 26.3 },
    { date: '7 July', temp: 27.2 },
];

const climateData = [
    { label: 'Temperature', value: '26.3°C' },
    { label: 'Humidity', value: '74%' },
    { label: 'Pressure', value: '1013 hPa' },
    { label: 'Wind Speed', value: '12 km/h' },
    { label: 'Wind Direction', value: 'NE' },
    { label: 'Precipitation', value: '0 mm' },
    { label: 'UV Index', value: '7' },
    { label: 'Visibility', value: '10 km' },
];

const temperatureData = [
    { label: 'Current Temp', value: '26.3°C' },
    { label: 'Feels Like', value: '28.1°C' },
    { label: 'Min Today', value: '22.5°C' },
    { label: 'Max Today', value: '29.8°C' },
    { label: 'Dew Point', value: '18.2°C' },
    { label: 'Heat Index', value: '27.5°C' },
    { label: 'Soil Temp', value: '24.1°C' },
    { label: 'Water Temp', value: '23.7°C' },
];

// Initial widgets configuration
const initialWidgets = [
    { id: 'meteo', type: 'meteo', size: { xs: 12, md: 5 }, height: 352 },
    { id: 'climate', type: 'climate', size: { xs: 12, md: 3.5 }, height: 352 },
    { id: 'temperature', type: 'temperature', size: { xs: 12, md: 3.5 }, height: 352 },
];

const WidgetContent = ({ type }: { type: string }) => {
    if (type === 'meteo') {
        return (
            <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                            Meteo
                        </Typography>
                        <Info fontSize="small" color="action" />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                        <IconButton size="small">
                            <FilterList fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>
                <Chip label="LAST UPDATED 3MIN AGO" size="small" variant="outlined" sx={{ mb: 2, alignSelf: 'flex-start' }} />

                <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Min: 23.5°C
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        26.3°C
                    </Typography>
                </Stack>

                {/* Real Chart */}
                <Box sx={{ flex: 1, minHeight: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5A9FFF" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#5A9FFF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: '#9ca3af', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: '#9ca3af', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: 'none',
                                    borderRadius: 8,
                                    color: '#fff'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="temp"
                                stroke="#5A9FFF"
                                strokeWidth={2}
                                fill="url(#colorValue)"
                                dot={{ fill: '#5A9FFF', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        );
    }

    const data = type === 'climate' ? climateData : temperatureData;
    const title = type === 'climate' ? 'Climate' : 'Temperature';

    return (
        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography variant="subtitle1" fontWeight="bold">
                        {title}
                    </Typography>
                    <Info fontSize="small" color="action" />
                </Stack>
                <Stack direction="row" spacing={0.5}>
                    <IconButton size="small">
                        <FilterList fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                        <MoreVert fontSize="small" />
                    </IconButton>
                </Stack>
            </Stack>
            <Chip label="LAST UPDATED 3MIN AGO" size="small" variant="outlined" sx={{ mb: 2, alignSelf: 'flex-start' }} />

            <List dense sx={{ flex: 1, overflow: 'auto' }}>
                {data.map((item, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            borderBottom: index < data.length - 1 ? 1 : 0,
                            borderColor: 'divider',
                            px: 0,
                            py: 1.5,
                        }}
                    >
                        <ListItemText
                            primary={item.label}
                            secondary={null}
                            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                        />
                        <Typography variant="body2" fontWeight={600}>
                            {item.value}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </CardContent>
    );
};

function SortableWidget({ id, widget, isLayoutMode, onResize }: { id: string, widget: any, isLayoutMode: boolean, onResize: (id: string, newWidth: number, newHeight: number) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id, disabled: !isLayoutMode });

    const cardRef = useRef<HTMLDivElement>(null);
    const startSizeRef = useRef<{ width: number, height: number } | null>(null);
    const startPosRef = useRef<{ x: number, y: number } | null>(null);

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (cardRef.current) {
            startSizeRef.current = {
                width: cardRef.current.offsetWidth,
                height: cardRef.current.offsetHeight
            };
            startPosRef.current = { x: e.clientX, y: e.clientY };

            document.addEventListener('mousemove', handleResizeMove);
            document.addEventListener('mouseup', handleResizeEnd);
        }
    };

    const handleResizeMove = (e: MouseEvent) => {
        if (startSizeRef.current && startPosRef.current && cardRef.current) {
            const deltaX = e.clientX - startPosRef.current.x;
            const deltaY = e.clientY - startPosRef.current.y;

            const newWidth = Math.max(200, startSizeRef.current.width + deltaX);
            const newHeight = Math.max(200, startSizeRef.current.height + deltaY);

            // Calculate grid columns (approximate)
            // Assuming container width is roughly 1200px (lg breakpoint) or available width
            // This is a simplified estimation for the grid system

            onResize(id, newWidth, newHeight);
        }
    };

    const handleResizeEnd = () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
        startSizeRef.current = null;
        startPosRef.current = null;
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <Grid size={{ xs: widget.size.xs, md: widget.size.md }} ref={setNodeRef} style={style} {...attributes}>
            <Card
                ref={cardRef}
                elevation={0}
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    height: widget.height || 352,
                    border: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
                    ...(isLayoutMode && {
                        borderStyle: 'dashed',
                        borderColor: 'primary.main',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(90, 159, 255, 0.05)' : 'rgba(90, 159, 255, 0.05)',
                    })
                }}
            >
                {isLayoutMode && (
                    <>
                        {/* Drag Handle */}
                        <Box
                            {...listeners}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 10,
                                cursor: 'grab',
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                border: 1,
                                borderColor: 'divider',
                                p: 0.5,
                                '&:active': { cursor: 'grabbing' },
                            }}
                        >
                            <DragIndicator fontSize="small" sx={{ transform: 'rotate(90deg)' }} />
                        </Box>

                        {/* Resize Handle */}
                        <Box
                            onMouseDown={handleResizeStart}
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 20,
                                height: 20,
                                zIndex: 10,
                                cursor: 'nwse-resize',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end',
                                p: 0.5,
                            }}
                        >
                            <Box sx={{
                                width: 0,
                                height: 0,
                                borderStyle: 'solid',
                                borderWidth: '0 0 10px 10px',
                                borderColor: 'transparent transparent primary.main transparent',
                                transform: 'rotate(0deg)',
                                opacity: 0.5
                            }} />
                        </Box>
                    </>
                )}
                <WidgetContent type={widget.type} />
            </Card>
        </Grid>
    );
}

export function WaterSystemDashboard() {
    const [tabValue, setTabValue] = React.useState(0);
    const [widgets, setWidgets] = useState(initialWidgets);
    const [isLayoutMode, setIsLayoutMode] = useState(false);
    const [showSaveToast, setShowSaveToast] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setWidgets((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleResize = (id: string, newWidth: number, newHeight: number) => {
        // Calculate grid columns based on container width
        // Assuming a standard 12-column grid
        const containerWidth = containerRef.current?.offsetWidth || 1200;
        // Subtracting spacing (4 * 8px = 32px) and padding (2 * 32px = 64px)
        // This is an approximation, actual calculation might be more complex
        const effectiveContainerWidth = containerWidth - (4 * 8) - (2 * 32);
        const colWidth = effectiveContainerWidth / 12;

        // Calculate closest column span
        let cols = Math.round(newWidth / colWidth);
        cols = Math.max(3, Math.min(12, cols)); // Min 3 cols, max 12 cols

        setWidgets((items) => items.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    size: { ...item.size, md: cols },
                    height: newHeight
                };
            }
            return item;
        }));
    };

    const handleLayoutToggle = () => {
        if (isLayoutMode) {
            // Saving changes
            setShowSaveToast(true);
        }
        setIsLayoutMode(!isLayoutMode);
    };

    return (
        <Box>
            {/* Tabs outside container */}
            <Tabs
                value={tabValue}
                onChange={(e, v) => setTabValue(v)}
                sx={{
                    mb: 0,
                    pt: '8px',
                    minHeight: 'auto',
                    '& .MuiTabs-indicator': {
                        bottom: 0,
                        height: 3,
                        backgroundColor: 'primary.main',
                    },
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        minHeight: 'auto',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        padding: '6px 16px',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '6px',
                        borderRadius: '8px',
                        border: (theme) => `0.5px solid ${theme.palette.divider}`,
                        bgcolor: 'background.default',
                        color: 'text.secondary',
                        mr: 1,
                        mb: '8px',
                        transition: 'all 0.2s',
                        '&:hover': {
                            border: (theme) => theme.palette.mode === 'dark'
                                ? '0.5px solid #4B5563'
                                : '0.5px solid #9CA3AF',
                            bgcolor: (theme) => theme.palette.mode === 'dark'
                                ? '#1F2937'
                                : '#E5E7EB',
                        },
                        '&.Mui-selected': {
                            color: 'primary.main',
                            border: (theme) => `0.8px solid ${theme.palette.primary.main}`,
                            bgcolor: (theme) => theme.palette.mode === 'dark'
                                ? '#012A61'
                                : '#DFECFF',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: (theme) => theme.palette.mode === 'dark'
                                    ? '#023478'
                                    : '#BED9FF',
                            },
                        },
                    },
                }}
            >
                <Tab label="Water System Dashboard" />
                <Tab label="Greenhouse North Wing Dashboard" />
                <Tab label="Energy Efficiency Dashboard" />
            </Tabs>

            {/* Container with border aligned with tab indicator */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Water System Dashboard
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            onClick={handleLayoutToggle}
                            sx={{
                                border: 1,
                                borderColor: isLayoutMode ? 'success.main' : 'divider',
                                borderRadius: 1,
                                color: isLayoutMode ? 'success.main' : 'text.secondary',
                                bgcolor: isLayoutMode ? (theme) => theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(76, 175, 80, 0.1)' : 'transparent',
                                '&:hover': {
                                    bgcolor: isLayoutMode ? (theme) => theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.2)' : 'rgba(76, 175, 80, 0.2)' : 'action.hover',
                                    borderColor: isLayoutMode ? 'success.dark' : 'text.primary',
                                }
                            }}
                            size="small"
                        >
                            {isLayoutMode ? <Check fontSize="small" /> : <GridView fontSize="small" />}
                        </IconButton>
                        <IconButton
                            sx={{
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                color: 'text.secondary',
                                '&:hover': {
                                    borderColor: 'text.primary',
                                    bgcolor: 'action.hover',
                                }
                            }}
                            size="small"
                        >
                            <Add fontSize="small" />
                        </IconButton>
                        <IconButton
                            sx={{
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                color: 'text.secondary',
                                '&:hover': {
                                    borderColor: 'text.primary',
                                    bgcolor: 'action.hover',
                                }
                            }}
                            size="small"
                        >
                            <Download fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={widgets.map(item => item.id)}
                        strategy={rectSortingStrategy}
                    >
                        <Grid container spacing={4} ref={containerRef}>
                            {widgets.map((widget) => (
                                <SortableWidget
                                    key={widget.id}
                                    id={widget.id}
                                    widget={widget}
                                    isLayoutMode={isLayoutMode}
                                    onResize={handleResize}
                                />
                            ))}
                        </Grid>
                    </SortableContext>
                </DndContext>
            </Paper>
            <Snackbar
                open={showSaveToast}
                autoHideDuration={3000}
                onClose={() => setShowSaveToast(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setShowSaveToast(false)} severity="success" sx={{ width: '100%' }}>
                    Layout saved successfully
                </Alert>
            </Snackbar>
        </Box>
    );
}
