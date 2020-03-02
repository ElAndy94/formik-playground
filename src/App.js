import React from 'react';

import './App.css';
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { Formik, Field, Form, useField, FieldArray } from 'formik';
import * as yup from 'yup';

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required()
    })
  )
});

const App = () => {
  return (
    <div className='form'>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yogurt: '',
          pets: [{ type: 'cat', name: 'jarvis' }]
        }}
        validationSchema={validationSchema}
        // validate={values => {
        //   const errors = {};

        //   if (values.firstName.includes('bob')) {
        //     errors.firstName = 'no bob';
        //   }
        //   return errors;
        // }}
        onSubmit={(data, { setSubmitting }) => {
          // make async call
          setSubmitting(true);
          console.log('submit: ', data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <MyTextField
                placeholder='first name'
                name='firstName'
                // type='input'
              />
            </div>
            <div>
              <MyTextField
                placeholder='last name'
                name='lastName'
                // type='input'
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
            <div>Selector</div>
            <FieldArray name='pets'>
              {arrayHelpers => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        type: 'frog',
                        name: ''
                      })
                    }
                  >
                    add pet
                  </Button>
                  {values.pets.map((pet, index) => {
                    return (
                      <div key={index}>
                        <MyTextField
                          placeholder='pet name'
                          name={`pets.${index}.name`}
                        />
                        <Field
                          name={`pets.${index}.type`}
                          type='select'
                          as={Select}
                        >
                          <MenuItem value='cat'>cat</MenuItem>
                          <MenuItem value='dog'>dog</MenuItem>
                          <MenuItem value='frog'>frog</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          x
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <Button disabled={isSubmitting} type='submit'>
              Submit
            </Button>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
