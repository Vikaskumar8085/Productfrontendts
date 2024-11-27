import React, { ReactNode, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { TfiAlignLeft, TfiAlignRight } from "react-icons/tfi";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../Hooks/Reduxhook/hooks";
import { getUserapiCall } from "../../Services/UserApiSerice";
import { setUserRole } from "../../Redux/UserSlice";
import toast from "react-hot-toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collable, setcollable] = useState<boolean>(false);
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const Roletype: any = useAppSelector((state) => state.user.Role);
//get the hasAnswered value from the local storage
    const hasAnswered = localStorage.getItem("hasAnswered");
    
  const getUserRoleType = async () => {
    try {
      const response: any = await getUserapiCall();
      if (response.success) {
        dispatch(setUserRole(response.result));
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getUserRoleType();
if(hasAnswered === "false"){
      //delay the modal for 5 seconds
        setTimeout(() => {
            setShowSecurityModal(true);
        }, 5000);
    }
    

  }, [0]);
  const handleSkip = () => {
    //update local storage value to true
    localStorage.setItem("hasAnswered", "true");
    setShowSecurityModal(false);
  }
  return (
    <>
      <div className="flex block">
        <Sidebar collable={collable} Roletype={Roletype} />
        <div className="main block w-screen overflow-hidden h-screen">
          <Header collable={collable} setcollable={setcollable} />
          <div className="content p-4 min-h-screen">{children}</div>
        </div>
      </div>

      {/* Modal */}
      {showSecurityModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Hello</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowSecurityModal(false)}
            >
              Close
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSkip}>
              Skip Security Question 
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
