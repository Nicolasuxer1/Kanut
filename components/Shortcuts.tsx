'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Stack, Grid, Paper, Snackbar, Alert } from '@mui/material';
import { Opacity, Thermostat, Air, Bolt, MoreVert, Edit, Check, Add, MoreHoriz, DragIndicator } from '@mui/icons-material';
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

const initialShortcuts = [
    { id: '1', icon: Opacity, title: 'Alerts', subtitle: 'Water System', color: '#5A9FFF' },
    { id: '2', icon: Thermostat, title: 'Overview', subtitle: 'Heating System', color: '#5A9FFF' },
    { id: '3', icon: Air, title: 'Controls', subtitle: 'Ventilation System', color: '#5A9FFF' },
    { id: '4', icon: Bolt, title: 'Automation', subtitle: 'Cooling System', color: '#5A9FFF' },
    { id: '5', icon: Opacity, title: 'Controls', subtitle: 'Water System', color: '#5A9FFF' },
];

function SortableItem(props: { id: string; shortcut: any; isEditing: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props.id, disabled: !props.isEditing });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...attributes}
            sx={{
                minWidth: { xs: 260, sm: 280, md: 300 },
                flexShrink: 0,
            }}
        >
            <Card
                elevation={0}
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    height: '100%',
                    border: 1,
                    borderColor: 'divider',
                    cursor: props.isEditing ? 'grab' : 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: 'none',
                    position: 'relative',
                    '&:hover': {
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.12)',
                        transform: 'translateY(-2px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.08)',
                        bgcolor: 'action.hover',
                        cursor: props.isEditing ? 'grabbing' : 'pointer',
                    },
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    {props.isEditing && (
                        <Box
                            {...listeners}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 32,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: 'text.disabled',
                                cursor: 'grab',
                                '&:active': { cursor: 'grabbing' },
                                zIndex: 10,
                            }}
                        >
                            <DragIndicator fontSize="small" sx={{ transform: 'rotate(90deg)' }} />
                        </Box>
                    )}
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mt: props.isEditing ? 1 : 0 }}>
                        {/* Icon */}
                        <Box
                            sx={{
                                bgcolor: `${props.shortcut.color}20`,
                                p: 1.5,
                                borderRadius: 1.5,
                                display: 'flex',
                                flexShrink: 0,
                            }}
                        >
                            <props.shortcut.icon sx={{ color: props.shortcut.color, fontSize: 28 }} />
                        </Box>

                        {/* Title and Subtitle */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body1" fontWeight={600} noWrap>
                                {props.shortcut.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                                {props.shortcut.subtitle}
                            </Typography>
                        </Box>

                        {/* More Icon */}
                        <IconButton size="small" sx={{ flexShrink: 0 }}>
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}

export function Shortcuts() {
    const [items, setItems] = useState(initialShortcuts);
    const [isEditing, setIsEditing] = useState(false);
    const [showSaveToast, setShowSaveToast] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Saving changes
            setShowSaveToast(true);
        }
        setIsEditing(!isEditing);
    };

    return (
        <>
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
                        Shortcuts
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            onClick={handleEditToggle}
                            sx={{
                                border: 1,
                                borderColor: isEditing ? 'success.main' : 'divider',
                                borderRadius: 1,
                                color: isEditing ? 'success.main' : 'text.secondary',
                                bgcolor: isEditing ? (theme) => theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.1)' : 'rgba(76, 175, 80, 0.1)' : 'transparent',
                                '&:hover': {
                                    bgcolor: isEditing ? (theme) => theme.palette.mode === 'dark' ? 'rgba(46, 125, 50, 0.2)' : 'rgba(76, 175, 80, 0.2)' : 'action.hover',
                                    borderColor: isEditing ? 'success.dark' : 'text.primary',
                                }
                            }}
                            size="small"
                        >
                            {isEditing ? <Check fontSize="small" /> : <Edit fontSize="small" />}
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
                    </Stack>
                </Stack>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={items.map(item => item.id)}
                        strategy={rectSortingStrategy}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3,
                                overflowX: 'auto',
                                pb: 1, // Space for scrollbar
                                // Hide scrollbar for cleaner look but keep functionality
                                '&::-webkit-scrollbar': {
                                    height: 6,
                                },
                                '&::-webkit-scrollbar-track': {
                                    bgcolor: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    bgcolor: 'divider',
                                    borderRadius: 4,
                                },
                            }}
                        >
                            {items.map((shortcut) => (
                                <SortableItem
                                    key={shortcut.id}
                                    id={shortcut.id}
                                    shortcut={shortcut}
                                    isEditing={isEditing}
                                />
                            ))}
                        </Box>
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
                    Changes saved successfully
                </Alert>
            </Snackbar>
        </>
    );
}
