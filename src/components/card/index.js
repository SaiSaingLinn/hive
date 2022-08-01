import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid, Skeleton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import theme from 'src/themes/theme';

export default function ProductCard(props) {
  const { data, loading, page } = props;
  return (
    <Grid container spacing={6}>
      {(loading ? Array.from(new Array(6)) : data?.content)?.map((item, index) => (
        <Grid item md={4} sm={6} xs={12} key={index}>
          <Card sx={{ maxWidth: 400 }}>
            {
              item ? (
              <Link href={`/product/${item.id}?page=${page}`} passHref>
                <a>
                  <Box sx={{position: 'relative', width: '100%', height: 200}}>
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      layout="fill"
                      objectFit='cover'
                      priority={true}
                    />
                  </Box>
                </a>
              </Link>
              ) : (
                <Skeleton variant="rectangular" width="100%" height={200} />
              )
            }
            {
              item ? (
              <Link href={`/product/${item.id}?page=${page}`} passHref>
                <a>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.name}
                    </Typography>
                    <Typography variant="body1" sx={{color: theme.palette.primary.main}}>
                      {item?.amount} Ks
                    </Typography>
                  </CardContent>
                </a>
              </Link>
              ) : (
              <CardContent>
                <Skeleton />
                <Skeleton width="60%" />
              </CardContent>
              )
            }
            {
              item && 
              <CardActions>
                <Button size="small"><Link href={`/product/${item?.id}?page=${page}`}><a>View Detail</a></Link></Button>
              </CardActions>
            }
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
