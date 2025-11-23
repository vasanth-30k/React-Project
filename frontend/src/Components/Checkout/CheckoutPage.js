import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createOrder } from '../../Services/orderservices';
import classes from './CheckoutPage.module.css';
import Title from '../Title/Title';
import Input from '../Input/Input';
import Button from '../Button/Button';
import OrderItemsList from '../OrderItemsList/OrderItemsList';
import Map from '../Map/Map';

export default function CheckoutPage() {
    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({ ...cart, name: user.name || '', address: user.address || '',});

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const submit = async data => {
        if (!order.addressLatLng) {
            toast.warning('Please select your location on the map');
            return;
        }

        await createOrder({ ...order, name: data.name, address: data.address });
        navigate('/payment');
    };

    const handleMapChange = 
    useCallback(latlng => {
            console.log(latlng);
            setOrder(prevOrder => 
        ({ ...prevOrder, addressLatLng:
        latlng }));
        }, []);

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className={classes.container}>
                <div className={classes.content}>
                    <Title title="Order Form" fontSize="1.6rem"/>
                    <div className={classes.inputs}>
                        <Input 
                        defaultValue={user.name}
                        label="Name"
                        {...register('name', { required: true })}
                        error={errors.name}
                        />
                        <Input 
                        defaultValue={user.address}
                        label="Address"
                        {...register('address', { required: true })}
                        error={errors.address}
                        />
                    </div>
                    <OrderItemsList order={order} />
                </div>
                <div>
                    <Title title="Choose Your Location" fontSize="1.6rem"/>
                    <Map 
                        location={order.addressLatLng}
                        onChange={handleMapChange}
                    />
                </div>
                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <Button 
                            type="submit"
                            text="Go To Payment"
                            width="100%"
                            height="3rem"
                        />
                    </div>
                </div>
            </form>
        </>
  );
}
