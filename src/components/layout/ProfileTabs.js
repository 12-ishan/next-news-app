import React, { useState } from 'react';
import { Tabs, Tab, Box, Button,Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { fetchProfile } from '@/redux/slice/authSlice';
import { useSelector } from 'react-redux';

const ProfileTabs = ({ handleLogout }) => {
  const [value, setValue] = useState(0);
  
  const orders = useSelector((state) => state.auth.orders);
  const customer = useSelector((state) => state.auth.customer);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', marginTop: 2 }}>
      
      <Box sx={{ borderRight: 1, borderColor: 'divider', width: '20%' }}>
        <Tabs
          orientation="vertical" 
          value={value}
          onChange={handleChange}
          aria-label="Vertical profile tabs"
          sx={{ minWidth: 150 }}
        >
          <Tab icon={<PersonIcon />} label="My Profile" />
          <Tab icon={<HomeIcon />} label="Delivery Address" />
          <Tab icon={<ShoppingCartIcon />} label="My Orders" />
          <Tab icon={<FavoriteIcon />} label="My Wishlist" />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        {value === 0 && (
          <Box>
            <Typography variant="h6">My Profile</Typography>
            <Typography variant="body1">
              Username: {customer.username}
            </Typography>
            <Typography variant="body1">
              Email: {customer.email}
            </Typography>
          </Box>
        )}

        {value === 1 && (
          <Box>
            <Typography variant="h6">Delivery Address</Typography>
            <Typography variant="body1">
              
            </Typography>
          </Box>
        )}

        {value === 2 && (
          <Box>
            <Typography variant="h6">My Orders</Typography>
            <Typography variant="body1">
            <div className="row mb-5">
                            <div className="col-md-12">
                                <div className="p-3">
                                <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center">Date Placed</th>
                <th className="text-center">Order Status</th>
                <th className="text-center">Total Amount</th>
                <th className="text-center">Quantity</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
            {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={ order.id }>
                    <td className="text-center"> 
                    {new Date(order.created_at).toLocaleString()}  
                    </td>
                    <td className="text-center">
                    {order.order_status} 
                    </td>
                    <td className="text-center">
                    {order.order_items.price * order.order_items.quantity} 
                    </td>
                    <td className="text-center"> 
                    {order.order_items.quantity}
                    </td>
                    <td className='text-center'> 
                      <Link href={`/my-order/${order.id}`}>View Order</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No order yet.</td>
                </tr>
              )}
            
            </tbody>
          </table>
                                </div>
                            </div>
                        </div>
            </Typography>
          </Box>
        )}

        {value === 3 && (
          <Box>
            <Typography variant="h6">My Wishlist</Typography>
            <Typography variant="body1">
             
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileTabs;
