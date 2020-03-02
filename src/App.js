import React from 'react';

import './App.css';
import { TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';

const App = () => {
  return (
    <div className='form'>
      <Formik
        initialValues={{ firstName: '' }}
        onSubmit={data => {
          console.log('submit: ', data);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              name='firstName'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              <Button type='submit'>Submit</Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default App;
