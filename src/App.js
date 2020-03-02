import React from 'react';

import './App.css';
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import { Formik, Field, Form, useField } from 'formik';

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const App = () => {
  return (
    <div className='form'>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yogurt: ''
        }}
        onSubmit={(data, { setSubmitting }) => {
          // make async call
          setSubmitting(true);
          console.log('submit: ', data);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <Field
                placeholder='first name'
                name='firstName'
                type='input'
                as={TextField}
              />
            </div>
            <div>
              <Field
                placeholder='last name'
                name='lastName'
                type='input'
                as={TextField}
              />
            </div>
            <div>
              <Field name='isTall' type='checkbox' as={Checkbox} />
            </div>
            <div>Cookies: </div>
            <Field
              name='cookies'
              type='checkbox'
              vlue='chocolate chip'
              as={Checkbox}
            />
            <Field
              name='cookies'
              type='checkbox'
              vlue='snickerdoodle'
              as={Checkbox}
            />
            <Field name='cookies' type='checkbox' vlue='sugar' as={Checkbox} />
            <div>Yogurt</div>
            <MyRadio name='yogurt' type='radio' value='peach' label='peach' />
            <MyRadio
              name='yogurt'
              type='radio'
              value='blueberry'
              label='blueberry'
            />
            <MyRadio name='yogurt' type='radio' value='apple' label='apple' />
            {/* <Field name='yogurt' type='radio' value='peach' as={Radio} />
            <Field name='yogurt' type='radio' value='blueberry' as={Radio} />
            <Field name='yogurt' type='radio' value='apple' as={Radio} /> */}
            <div>
              <Button disabled={isSubmitting} type='submit'>
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
