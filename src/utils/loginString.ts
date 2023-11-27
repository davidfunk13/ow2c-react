const loginString = import.meta.env.PROD ? `${import.meta.env.VITE_API_URI}/battlenet/login` : "http://localhost:3001/battlenet/login";
export default loginString;
