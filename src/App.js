import React from 'react';

import './App.css';
import { TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';

const App = () => {
  return (
    <div className='form'>
      <Formik
        initialValues={{ firstName: '', lastname: '' }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log('submit: ', data);

          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              name='firstName'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField
              name='lastName'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div>
              <Button disabled={isSubmitting} type='submit'>
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default App;
