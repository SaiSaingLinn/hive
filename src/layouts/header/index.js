import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography 
              variant="h2" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
              HIVE Commerce
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Header;