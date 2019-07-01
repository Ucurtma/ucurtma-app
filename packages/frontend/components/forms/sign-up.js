import { Formik } from 'formik';
import Input from '../ui/input';

function Signup() {
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input label="Name" value={values.name} onChange={handleChange} />
        </form>
      )}
    </Formik>
  );
}

export default Signup;
