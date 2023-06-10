import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// component
import Iconify from '../../../../components/iconify';
//
import { getCart } from '../../../../services/user/cart/cartRequest';
import { cartListSelector } from '../../../../redux/selectors';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartList = useSelector(cartListSelector);

  useEffect(() => {
    getCart(token, dispatch);
  }, [token, dispatch]);

  return (
    <StyledRoot>
      <Badge
        showZero
        badgeContent={cartList.filter((cart) => cart.user.id === currentUser.id).length}
        color="error"
        max={99}
      >
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} onClick={() => navigate('/dashboard/cart')} />
      </Badge>
    </StyledRoot>
  );
}
