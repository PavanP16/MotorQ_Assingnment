"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../resources/logo.jpeg";
import { useRouter } from "next/navigation";
import axios from "axios";

const EnrollVehicle = ({ vehicles}: any) => {

  const router = useRouter();

  const { handleSubmit, reset ,register } = useForm();
  const [selectedMake, setSelectedMake] = useState("");
  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [vinPrefix, setVinPrefix] = useState<string>("");

  const handleMakeChange = (selectedMake: string) => {
    setSelectedMake(selectedMake);
    const modelsForSelectedMake = vehicles
      .filter((vehicle: any) => vehicle.make === selectedMake)
      .map((vehicle: any) => vehicle.model);
    setFilteredModels(modelsForSelectedMake);
  };

  const handleModelChange = (selectedModel: string) => {

    const vinPrefixForSelectedModel = vehicles
      .filter((vehicle: any) => vehicle.model === selectedModel)
      .map((vehicle: any) => vehicle.vinPrefix);
    setVinPrefix(vinPrefixForSelectedModel[0]);
  }

  

  const onSubmit = async(formData: any) => {
   
   try {
    const res = axios.post("/api/enrollments", formData);
    
   } catch (error) {
    console.log(error);
    
   }

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[70vw]">
      <Image src={Logo} alt="Logo" className="w-40 h-40 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Enroll Vehicle
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="make" className="block text-gray-600 font-bold">
              Make:
            </label>
            <select
              id="make"
              {...register("make")}
              required
              className="border rounded-md p-2 w-full"
              onChange={(e) => handleMakeChange(e.target.value)}
            >
              <option value="" disabled selected>
                Select Make
              </option>
              {vehicles?.map((vehicle: any) => (
                <option key={vehicle.id} value={vehicle.make}>
                  {vehicle.make}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="model" className="block text-gray-600 font-bold">
              Model:
            </label>
            <select
              id="model"
              {...register("model")}
              required
              className="border rounded-md p-2 w-full"
              onChange={(e) => handleModelChange(e.target.value)}
            >
              <option value="" disabled selected>
                Select Model
              </option>
                <option  value="A8">
                  A8
                </option>
                <option  value="A9">
                  A9
                </option><option  value="A10">
                  A10
                </option>
              
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-gray-600 font-bold">
              Year:
            </label>
            <input
              type="number"
              id="year"
              {...register("year")}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="vinPrefix"
              className="block text-gray-600 font-bold"
            >
              VIN (First 8 Characters):
            </label>
            {/* Autopopulate this field based on data populated by Admin */}
            <select
              id="vinPrefix"
              {...register("vinPrefix")}
              required
              className="border rounded-md p-2 w-full"
            >
              <option value="" disabled selected>
                Select VIN
              </option>

              <option key={vinPrefix} value={vinPrefix}>
                {vinPrefix}
              </option>

            </select>  
          </div>
          <div>
            <label
              htmlFor="vinSuffix"
              className="block text-gray-600 font-bold"
            >
              VIN (Next 9 Characters):
            </label>
            <input
              type="text"
              id="vinSuffix"
              {...register("vinSuffix")}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="licensePlate"
              className="block text-gray-600 font-bold"
            >
              License Plate:
            </label>
            <input
              type="text"
              id="licensePlate"
              {...register("licensePlate")}
              required
              className="border rounded-md p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-800 w-full"
          >
            Enroll Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollVehicle;