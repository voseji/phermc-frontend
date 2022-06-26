import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import * as yup from 'yup';
import _ from '@lodash';
import { BackendAPI } from "../api.utility";
import { handleAPIError } from "../api.utility";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - should be 4 chars minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
};


function JWTLoginTab(props) {
  // const dispatch = useDispatch();
  // const login = useSelector(({ auth }) => auth.login);
  // const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
  //   mode: 'onChange',
  //   defaultValues,
  //   resolver: yupResolver(schema),
  // });

  // const { isValid, dirtyFields, errors } = formState;

  // const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
  //   setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
  // }, [reset, setValue, trigger]);

  // useEffect(() => {
  //   login.errors.forEach((error) => {
  //     setError(error.type, {
  //       type: 'manual',
  //       message: error.message,
  //     });
  //   });
  // }, [login.errors, setError]);

  // function onSubmit(model) {
  //   dispatch(submitLogin(model));
  // }
  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
    const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsAuthenticating(true);
    try {
      const res = await BackendAPI.post('/auth/login',{email, password});
      localStorage.setItem('accessToken',res.data?.access_token);

      window.location.replace('apps/dashboards/project')
    } catch (error) {
      console.log(error)
      handleAPIError(error)
    }finally{
      setIsAuthenticating(false);      
    }
  }

  useEffect(() => {
    const token = window.localStorage.getItem('accessToken');
    console.log(token)
    /* REDIRECT USER TO THE DASHBOARD WHEN TOKEN IS PRESENT. */
    /* USER WILL BE KICKED OUT AND TOKEN DELETED IF TOKEN IS NOT VALID. */
    if(token) return window.location.replace('apps/dashboards/project')
  },[])

  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              error={!!errors.email}
              helperText={errors?.email?.message}
              onChange={e => setEmail(e.target.value)} 
              value={email}
              label="Email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      user
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              onChange={e => setPassword(e.target.value)}
              value={password}
              InputProps={{
                className: 'pr-2',
                type: showPassword ? 'text' : 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                      <Icon className="text-20" color="action">
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          // disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>

      <table className="w-full mt-32 text-center">
        <thead className="mb-4">
          <tr>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Role
              </Typography>
            </th>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Email
              </Typography>
            </th>
            <th>
              <Typography className="font-semibold text-11" color="textSecondary">
                Password
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography className="font-medium text-11" color="textSecondary">
                Admin
              </Typography>
            </td>
            <td>
              <Typography className="text-11">admin@fusetheme.com</Typography>
            </td>
            <td>
              <Typography className="text-11">admin</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography className="font-medium text-11" color="textSecondary">
                Staff
              </Typography>
            </td>
            <td>
              <Typography className="text-11">staff@fusetheme.com</Typography>
            </td>
            <td>
              <Typography className="text-11">staff</Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default JWTLoginTab;
