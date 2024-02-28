import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { GetCurrentUser } from "../apiCalls/users";
import { SetUser } from "../redux/usersSlice";
import { message } from "antd";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getPresentUser = async () => {
    
    try {
      dispatch(ShowLoading())
      const response = await GetCurrentUser()
      dispatch(HideLoading())

      if (response.success) {
        dispatch(SetUser(response.data))
      }
      else {
        dispatch(SetUser(null))
        message.error(response.message)
        localStorage.removeItem("token")
        navigate('/login')
      }
    }
    catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
    
  }

  return <div>ProtectedRoute</div>;
}

export default ProtectedRoute;
