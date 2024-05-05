import { createContext, useState } from 'react';
import Input from '../components/Input';
import NavBar from '../components/NavBar';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

enum Variant {
  SIGN_UP,
  LOGIN_IN,
}

export type Inputs = {
  email: string;
  password: string;
  username: string;
};

type AuthFormContext = {
  register: UseFormRegister<Inputs> | null;
  errors: FieldErrors<Inputs> | null;
};

export const AuthFromContext = createContext<AuthFormContext>({
  register: null,
  errors: null,
});

export default function LoginPage() {
  const [variant, SetVariant] = useState(Variant.LOGIN_IN);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
  } = useForm<Inputs>();

  console.log(errors);
  const { signup, login } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async ({
    password,
    email,
    username,
  }) => {
    try {
      if (variant === Variant.SIGN_UP) {
        await signup({
          email,
          password,
          username: username,
        });
      } else {
        await login({
          email,
          password,
        });
      }
      setAuthError('');
      navigate('/browse');
    } catch (error: any) {
      console.log(error);
      setAuthError(error.response.data.errors[0].msg);
    }
  };

  const handleChangeAuthVariant = () => {
    if (variant === Variant.LOGIN_IN) SetVariant(Variant.SIGN_UP);
    else SetVariant(Variant.LOGIN_IN);
    setAuthError('');
    clearErrors();
  };

  return (
    <div className="relative bg-black h-screen w-screen bg-opacity-50">
      <NavBar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === Variant.SIGN_UP ? 'Sign up' : 'Log in'}
          </h2>
          <AuthFromContext.Provider value={{ register, errors }}>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}>
              {variant === Variant.SIGN_UP && (
                <Input
                  id="username"
                  type="text"
                  lable="UserName"
                  name="username"
                />
              )}
              <Input
                id="email"
                type="email"
                lable="Email address"
                name="email"
              />
              <Input
                id="paassword"
                type="password"
                lable="Password"
                name="password"
                validate={
                  variant === Variant.SIGN_UP
                    ? () => {
                        const password = getValues('password');
                        if (password.length < 6) {
                          return 'Password must be greater then 8 characters';
                        }
                        if (!/[A-Z]/.test(password)) {
                          return 'Password must have at least one uppercase character';
                        }
                        if (!/\d/.test(password)) {
                          return 'Password must have a number';
                        }
                        if (!/[a-z]/.test(password)) {
                          return 'Password must have at least one lowercase character';
                        }
                        return true;
                      }
                    : undefined
                }
              />
              <input
                type="submit"
                className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              />
              {authError && <p className="text-red-500">{authError}</p>}
            </form>
          </AuthFromContext.Provider>

          {variant === Variant.LOGIN_IN ? (
            <p
              className="text-neutral-500 mt-12"
              onClick={handleChangeAuthVariant}>
              <span className="text-white ml-1 hover:underline cursor-pointer">
                First time using Netflix?
              </span>
            </p>
          ) : (
            <p
              className="text-neutral-500 mt-12"
              onClick={handleChangeAuthVariant}>
              <span className="text-white ml-1 hover:underline cursor-pointer">
                Already have an account
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
