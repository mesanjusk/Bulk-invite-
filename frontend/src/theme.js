import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#2563EB', dark: '#1D4ED8', light: '#DBEAFE', contrastText: '#fff' },
    secondary:  { main: '#7C3AED', dark: '#6D28D9', light: '#EDE9FE', contrastText: '#fff' },
    background: { default: '#F1F5F9', paper: '#ffffff' },
    text:       { primary: '#0F172A', secondary: '#64748B' },
    success:    { main: '#16A34A' },
    warning:    { main: '#D97706' },
    error:      { main: '#DC2626' },
    info:       { main: '#0EA5E9' },
    divider:    '#E2E8F0',
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    h4: { fontWeight: 800, letterSpacing: '-0.03em' },
    h5: { fontWeight: 700, letterSpacing: '-0.02em' },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button:    { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#F1F5F9',
          color: '#0F172A',
        },
        '*::-webkit-scrollbar': { width: '6px', height: '6px' },
        '*::-webkit-scrollbar-thumb': { backgroundColor: '#CBD5E1', borderRadius: '999px' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)',
        },
      },
    },
    MuiAppBar:  { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: {
      styleOverrides: {
        root:      { borderRadius: 12, minHeight: 40, paddingInline: 20 },
        contained: { boxShadow: 'none', '&:hover': { boxShadow: '0 4px 12px rgba(37,99,235,0.3)' } },
      },
    },
    MuiChip:       { styleOverrides: { root: { fontWeight: 600, borderRadius: 999 } } },
    MuiTextField:  { defaultProps: { size: 'small', fullWidth: true } },
    MuiFormControl:{ defaultProps: { size: 'small', fullWidth: true } },
    MuiDialog:     { styleOverrides: { paper: { margin: 12, width: 'calc(100% - 24px)' } } },
    MuiTabs:       { styleOverrides: { indicator: { height: 3, borderRadius: 999 } } },
    MuiTableCell:  { styleOverrides: { head: { fontWeight: 700, color: '#0F172A' } } },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&.Mui-selected': {
            backgroundColor: '#DBEAFE',
            color: '#1D4ED8',
            '& .MuiListItemIcon-root': { color: '#1D4ED8' },
            '&:hover': { backgroundColor: '#BFDBFE' },
          },
        },
      },
    },
  },
});

export default theme;
