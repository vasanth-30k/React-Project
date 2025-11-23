import React from 'react';
import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound({ 
  message= "Nothing found",
  linkRoute= "/",
  linkText= "Back to menu"
}) {
  return (
    <div className={classes.container}>
        {message}
        <Link to={linkRoute}>{linkText}</Link>
    </div>
  );
}



