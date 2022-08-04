import * as React from 'react';
 import {
   Formik,
   FormikHelpers,
   FormikProps,
   Form,
   Field,
   FieldProps,
 } from 'formik';
import { values } from 'faunadb';
 
 interface MyFormValues {
   fahrenheit: string;
 }
 
 export const MyApp: React.FC<{}> = () => {
   const initialValues: MyFormValues = { fahrenheit: '' };
   return (
     <div>
       <h1>My Example</h1>
       <Formik
         initialValues={initialValues}
         onSubmit={(values, actions) => {
           console.log({ values, actions });
           actions.setSubmitting(false);
         }}
       >
         <Form>
           <label htmlFor="fahrenheit">Fahrenheit: </label>
           <Field id="fahrenheit" name="fahrenheit" placeholder="Fahrenheit" />
           <button type="submit">Convert</button>
           <div>Celsius: {initialValues.fahrenheit} </div>
         </Form>
       </Formik>
        <DisplayConversion {...initialValues}/>
     </div>
   );
 };

export const DisplayConversion: React.FC<{}> = props =>
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> ={' '}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>;

export default MyApp;
