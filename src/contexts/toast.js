import { createContext } from "react";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// toast.configure();

const notifyUserContext = createContext();

function NotifyUser({ children }) {
  return (
    <notifyUserContext.Provider value={{ toast }}>
      {children}
      <ToastContainer />
    </notifyUserContext.Provider>
  );
}

const useNotifyUser = () => useContext(notifyUserContext);

export { NotifyUser, useNotifyUser };
