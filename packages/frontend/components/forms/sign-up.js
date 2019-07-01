import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../ui/input';
import Button from '../ui/button';

const signupScheme = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

function Signup() {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
      validationSchema={signupScheme}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            errors={touched.name && errors.name}
          />
          <Input
            type="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            errors={touched.email && errors.email}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            value={values.password}
            errors={touched.password && errors.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="passwordConfirmation"
            label="Confirm Password"
            value={values.passwordConfirmation}
            errors={touched.passwordConfirmation && errors.passwordConfirmation}
            onChange={handleChange}
          />
          <Button
            isSubmit
            disabled={isSubmitting}
            className="w-full sm:w-auto"
            color="#6F6F6F"
          >
            LEARN MORE
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default Signup;
