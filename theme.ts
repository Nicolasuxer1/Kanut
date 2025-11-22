import { createTheme } from '@mui/material/styles';

// Color palette based on design system
const palette = {
    primary: {
        20: '#EFF6FF',
        0: '#DFECFF',
        50: '#BED9FF',
        100: '#A3C9FF',
        200: '#7AB2FF',
        300: '#5A9FFF',
        400: '#2380FF',
        500: '#006BFF',
        600: '#0165EE',
        700: '#0155C8',
        800: '#0247A5',
        900: '#023478',
        950: '#012A61',
    },
    error: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
    },
    warning: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
    },
    success: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A',
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
    },
    grey: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
        950: '#0A0A0A',
    },
};

export const getTheme = (mode: 'light' | 'dark') => createTheme({
    palette: {
        mode,
        ...(mode === 'dark' ? {
            primary: {
                main: palette.primary[300],
                light: palette.primary[200],
                dark: palette.primary[400],
                contrastText: '#fff',
            },
            error: {
                main: palette.error[500],
                light: palette.error[400],
                dark: palette.error[600],
            },
            warning: {
                main: palette.warning[500],
                light: palette.warning[400],
                dark: palette.warning[600],
            },
            success: {
                main: palette.success[500],
                light: palette.success[400],
                dark: palette.success[600],
            },
            background: {
                default: '#272625', // Fondo general
                paper: '#121212',   // Nav bar, side bar, containers
            },
            text: {
                primary: palette.grey[50],  // #F9FAFB
                secondary: palette.grey[400], // #9CA3AF
            },
            divider: '#3D3D3D',   // Gris neutro para borders
            action: {
                hover: palette.grey[800],   // #1F2937
                selected: palette.grey[700], // #374151
            },
        } : {
            primary: {
                main: palette.primary[500],
                light: palette.primary[300],
                dark: palette.primary[700],
                contrastText: '#fff',
            },
            error: {
                main: palette.error[600],
                light: palette.error[400],
                dark: palette.error[700],
            },
            warning: {
                main: palette.warning[600],
                light: palette.warning[400],
                dark: palette.warning[700],
            },
            success: {
                main: palette.success[600],
                light: palette.success[400],
                dark: palette.success[700],
            },
            background: {
                default: palette.grey[50],  // #F9FAFB
                paper: '#FFFFFF',
            },
            text: {
                primary: palette.grey[900], // #111827
                secondary: palette.grey[600], // #4B5563
            },
            divider: palette.grey[200],   // #E5E7EB
            action: {
                hover: palette.grey[100],   // #F3F4F6
                selected: palette.grey[200], // #E5E7EB
            },
        }),
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: ({ ownerState, theme }) => {
                    const color = ownerState.color || 'default';
                    const variant = ownerState.variant || 'filled';
                    const mode = theme.palette.mode;

                    // Helper to get palette color safely
                    const getPaletteColor = (c: string) => {
                        if (c === 'default') return theme.palette.grey;
                        // @ts-ignore
                        return theme.palette[c];
                    };

                    const paletteColor = getPaletteColor(color);

                    if (variant === 'filled') {
                        if (color === 'default') {
                            return {
                                backgroundColor: mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
                                color: mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800],
                                fontWeight: 600,
                                borderRadius: '9999px',
                                border: `1px solid ${mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]}`,
                                '&:hover': {
                                    backgroundColor: mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
                                },
                            };
                        }

                        // Specific override for Success color in Dark mode as requested
                        if (color === 'success' && mode === 'dark') {
                            return {
                                backgroundColor: '#1C2B21',
                                border: '1px solid #2A7948',
                                color: '#4ADE80', // Using a bright green for text to ensure contrast
                                fontWeight: 600,
                                borderRadius: '9999px',
                                '&:hover': {
                                    backgroundColor: '#233528',
                                },
                            };
                        }

                        // General style for other colors/light mode
                        return {
                            backgroundColor: mode === 'dark'
                                ? `${paletteColor.main}1A` // 10% opacity
                                : paletteColor[50],
                            border: `1px solid ${mode === 'dark' ? paletteColor[800] : paletteColor[200]}`,
                            color: mode === 'dark'
                                ? paletteColor[300]
                                : paletteColor[700],
                            fontWeight: 600,
                            borderRadius: '9999px',
                            '&:hover': {
                                backgroundColor: mode === 'dark'
                                    ? `${paletteColor.main}26` // 15% opacity
                                    : paletteColor[100],
                            },
                        };
                    }

                    if (variant === 'outlined') {
                        if (color === 'default') {
                            return {
                                borderColor: theme.palette.divider,
                                color: theme.palette.text.secondary,
                                borderRadius: '9999px',
                            };
                        }
                        return {
                            borderColor: mode === 'dark' ? paletteColor[800] : paletteColor[200],
                            color: mode === 'dark' ? paletteColor[300] : paletteColor[700],
                            borderRadius: '9999px',
                            backgroundColor: 'transparent',
                        };
                    }
                },
            },
        },
    },
});

// Export palette for direct use in components
export { palette };
