
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getById, updateUser } from '../../Services/userservice';
import { useParams } from 'react-router-dom';
import classes from './UserEditPage.module.css';
import Title from '../../Components/Title/Title';
import Input from '../../Components/Input/Input';
import { EMAIL } from '../../Contants/patterns'
import Button from '../../Components/Button/Button';

export default function UserEditPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { userId } = useParams();
  const isEditMode = userId;

  useEffect(() => {
    if (!isEditMode) return;
    const loadUser = async () => {
      const user = await getById(userId);
      reset(user);
    };
    loadUser();
  }, [isEditMode, userId, reset]);

  const submit = userData => {
    updateUser(userData);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit User' : 'Add User'} />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            label="Name"
            {...register('name', { required: true, minLength: 3 })}
            error={errors.name}
          />
          <Input
            label="Email"
            {...register('email', { required: true, pattern: EMAIL })}
            error={errors.email}
          />
          <Input
            label="Address"
            {...register('address', { required: true, minLength: 5 })}
            error={errors.address}
          />

          <Input label="Is Admin" type="checkbox" {...register('isAdmin')} />
          <Button type="submit" />
        </form>
      </div>
    </div>
  );
}
