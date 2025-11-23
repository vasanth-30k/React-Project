import React from 'react';
import classes from './Loading.module.css';
import { useLoading } from '../../hooks/useLoading';

export default function Loading() {
    const { isLoading } = useLoading();
    if (!isLoading) return;
        return (
            <div className={classes.container}>
                <div className={classes.items}>
                    <img className={classes.loading} src="/Loading01.svg" alt="Loading!" />
                    <h1>Loading...</h1>
                </div>
            </div>
        );
}

