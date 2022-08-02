import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#F88E35',
    },
    secondary: {
      main: '#F5F5E9',
    },
    error: {
      main: red.A400,
    },
    text: {
      main: '#545454',
      dark: '#1D1D21',
    },
    light: {
      main: '#F5F5E9',
    },
    red: {
      main: '#E11900',
    },
    sky: {
      light: '#E0F2FE',
      dark: '#0EA5E9',
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  }
});

theme = createTheme(theme, {
  components: {
    // Name of the component
    MuiAppBar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          background: theme.palette.primary.main,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          paddingLeft: '0px',
          paddingRight: '0px',
          justifyContent: 'space-between',
          [theme.breakpoints.up('md')]: {
            minHeight: '72px',
            paddingLeft: '0px',
            paddingRight: '0px',
          },
          [theme.breakpoints.down('md')]: {
            minHeight: '48px',            
            paddingLeft: '0px',
            paddingRight: '0px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: '500',
        },
        h1: {
          fontSize: '2rem',
          fontWeight: '800',
          [theme.breakpoints.down('md')]: {
            fontSize: '1.2rem',
          },
        },
        h2: {
          fontSize: '2rem',
          fontWeight: '800',
          [theme.breakpoints.down('md')]: {
            fontSize: '1.2rem',
          },
        },
        h3: {
          fontSize: '1.5rem',
          fontWeight: '800',
          [theme.breakpoints.down('md')]: {
            fontSize: '1.125rem',
          },
        },
        h4: {
          fontSize: '1.25rem',
          fontWeight: '800',
          [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
          },
        },
        h5: {
          fontSize: '1.125rem',
          fontWeight: '800',
          [theme.breakpoints.down('md')]: {
            fontSize: '0.875rem',
          },
        },
        h6: {
          fontSize: '0.75rem',
          fontWeight: '500',
          [theme.breakpoints.down('md')]: {
            fontSize: '0.5rem',
          },
        },
        paragraph: {
          fontSize: '1rem',
          fontWeight: '400',
          [theme.breakpoints.down('md')]: {
            fontSize: '0.75rem',
          },
        },
        body1: {
          fontSize: '1rem',
          fontWeight: '500',
          [theme.breakpoints.down('md')]: {
            fontSize: '0.75rem',
          },
        },
        body2: {
          fontSize: '0.875rem',
          fontWeight: '500',
          [theme.breakpoints.down('md')]: {
            fontSize: '0.75rem',
          },
        },
        caption: {
          fontSize: '1.25rem',
          fontWeight: '600',
          [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
          },
        },
        overline: {
          fontSize: '0.875rem',
          fontWeight: '500',
          [theme.breakpoints.down('md')]: {
            fontSize: '0.75rem',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: '800',
          borderRadius: '20px',
          [theme.breakpoints.down('md')]: {
            fontSize: '0.75rem',
          },
        },
        contained: {
          color: '#FFF',
        }
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          "& .Mui-disabled": {
            color: '#FFF !important',
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
        },
        grouped: {
          paddingLeft: '10px',
          paddingRight: '10px',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.16)',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.16)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingBottom: '12px !important',
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down('sm')]: {
            minWidth: '28px',
            height: '28px',
            padding: '0 4px',
            margin: '0 2px',
          },
          '&.Mui-selected': {
            color: theme.palette.light.main,
            background: theme.palette.primary.main,
            '&:hover': {
              background: theme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          color: '#FFF',
          fontWeight: '800'
        }
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          lineHeight: '1.6rem',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          width: '230px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.7',
          marginBottom: '5px',
        },
      }
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          padding: '10px 0',
        },
      },
    },
  },
});

export default theme;