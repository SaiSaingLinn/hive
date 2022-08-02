import React from 'react';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { CheckCircleOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import theme from 'src/themes/theme';

const IconWrapper = styled('div')(({ theme }) => ({
  '& img': {
    width: 100,
    height: 100,
  }
}));

const SuccessWrapperList = styled('div')(({ theme }) => ({
  '& .MuiListItemText-root': {
    'span': {
      width: '150px',
      '@media (min-width: 600px)': {
        width: '100%',
      },
    }
  }
}));

export default function OrderSuccess() {
  const router = useRouter();
  const orderNumber = router.query.orderNumber;
  return (
    <>
      <Box mt={10} mb={10}>
        <div>
          <Container>
            <Box 
              sx={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexDirection: 'column'
              }}
            >
              <IconWrapper>
                <CheckCircleOutline sx={{ fontSize: 100, color: theme.palette.primary.main }} />
              </IconWrapper>
              <Box mt={4} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <Typography variant="body1" mb={2}>Your order have been placed successfully!</Typography>
                <Typography variant="h4" component="h2" mb={1}>Thanks for shopping with us.</Typography>
                <Typography variant="body1" component="p">Order Number: {orderNumber}</Typography>
              </Box>
              <Box mt={4}>
                <Link href="/" passHref>
                  <a>
                    <Button
                      variant="contained"  
                      fullWidth
                      sx={{
                        margin: '8px 0', 
                        minWidth: '130px',
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </a>
                </Link>
              </Box>
            </Box>
          </Container>
        </div>
      </Box>
    </>
  );
}
