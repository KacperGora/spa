import classes from './InputForm.module.css'
import React from 'react';
import Login from './Login';
const InputForm = () => {
    return (
      <section className={classes.cta}>
        <div className={classes.container}>
          <Login/>
         </div>
      
      </section>
    );

}

export default InputForm