"use client"

import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from "react";

const Form = () => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (formData: any) => {
    try {
      await axios.post("/api/vehicles", formData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const VinCheck = async (vin:string) => {

      const make  = register("make");
      const model = register("model");
      const year  = register("year");

      const payload:any = {
        make: make,
        model: model,
        year: year,
      };

    try {
      const response = await axios.get('/api/checkvin',payload);
      console.log(response);
      if (response.data === "VIN already exists") {

      } else {
        setError(null);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-4 w-[40vw] p-6 bg-white rounded-lg shadow-lg h-[50vh]"
  >
    <h1 className="text-gray-800 text-2xl text-center">List A Vehicle</h1>
    <div className="mb-4">
      <label
        htmlFor="make"
        className="block text-gray-600 font-bold transition-transform transform translate-y-2"
      >
        Make:
      </label>
      <input
        type="text"
        id="make"
        {...register("make")}
        required
        className="border rounded-md p-2 w-full transition-transform transform translate-y-2 focus:ring focus:ring-blue-300"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="model"
        className="block text-gray-600 font-bold transition-transform transform translate-y-2"
      >
        Model:
      </label>
      <input
        type="text"
        id="model"
        {...register("model")}
        required
        className="border rounded-md p-2 w-full transition-transform transform translate-y-2 focus:ring focus:ring-blue-300"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="year"
        className="block text-gray-600 font-bold transition-transform transform translate-y-2"
      >
        Year:
      </label>
      <input
        type="number"
        id="year"
        {...register("year")}
        required
        className="border rounded-md p-2 w-full transition-transform transform translate-y-2 focus:ring focus:ring-blue-300"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="vinPrefix"
        className="block text-gray-600 font-bold transition-transform transform translate-y-2"
      >
        vin (First 8 Characters):
      </label>
      <input
        type="text"
        id="vinPrefix"
        {...register("vinPrefix")}
        required
        //@ts-expect-error
        onChange={VinCheck}
        className="border rounded-md p-2 w-full transition-transform transform translate-y-2 focus:ring focus:ring-blue-300"
      />
      { error && <p className="text-red-500 text-xs italic">Already exists</p> }
    </div>
    <br>
    </br>
    <button
      type="submit"
      className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-transform transform hover:scale-105 w-full"
    >
      Add Vehicle
    </button>
  </form>
</div>

  );
};

export default Form;