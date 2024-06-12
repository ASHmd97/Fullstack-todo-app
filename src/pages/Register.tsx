import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import axiosInstance from "../config/axios.config";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  // ** Handle Submit **
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await axiosInstance.post("/users/register", data).then((res) => {
      console.log(res);
    });
  };

  console.log(errors);


  // ** Render **
  const renderFormInput = REGISTER_FORM.map(
    ({ name, placeholder, type, validation }, index) => (
      <div key={index}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderFormInput}

        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
