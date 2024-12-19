import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import SpinnerLoader from "./SpinnerLoader"

const WelcomeScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/chat")
    }, 10000)

    return () => clearTimeout(timer) // Cleanup the timer on component unmount
  }, [navigate])

  return (
    <div className="flex flex-col mt-[100px] mb-[100px] justify-center items-center h-screen w-full">
      <h1 className="font-extrabold text-red-500">Welcome to SpeedX.com!</h1>
      <p className="font-extrabold text-yellow-800">We are Redirecting you to the home page...</p>
      <SpinnerLoader />
      <h1 className="font-extrabold text-red-500">(Developed By Ushie Pius)</h1>
      <h1 className="font-extrabold text-blue-700">(The Bekwarra Son)</h1>
      <h1 className="font-extrabold text-blue-700">(a.k.a The Aspiring Blockchain Developer 2025)</h1>
    </div>
  );
};

export default WelcomeScreen;
