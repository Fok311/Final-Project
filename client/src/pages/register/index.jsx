import { Input, Button } from "react-daisyui";
import { useState } from "react";
import Swal from "sweetalert2";
import { register } from "../api/users";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

export default function Register() {
    const[user, setUser] = useState({
      username:"",
      name:"",
      email:"",
      password:""
    })
    const{ push } = useRouter();

    const onChangeHandler = (e) =>
        setUser({ ...user, [e.target.name]: e.target.value })
    
    const { mutate, isLoading } = useMutation(register, {
        onSuccess: data => {
            Swal.fire({
                title:"Register Successfully",
                text: data.msg,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Go to Login"
            }).then(res => {
                if(res.isConfirmed) push("/login")
        })
        },
        onError: (error) => {
            Swal.fire("Failed to register", error.response.data.msg, "error");
          },
        });
    

    const onSubmitHandler = (e) => {
        e.preventDefault();
        mutate(user)
    }
  return (
    <div className="grid grid-cols-12">
      <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <Input
              className="w-full"
              type="text"
              placeholder="Name"
              name="name"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              className="w-full"
              type="text"
              placeholder="Username"
              name="username"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              className="w-full"
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              className="w-full"
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
            />
          </div>
          <Button className="block w-full">register</Button>
        </form>
      </div>
    </div>
  );
}
