import Form from "../components/form/Form";
import { useEffect, useContext } from "react";
import { RoomDataContext } from "../context/RoomContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const JoinPage = () => {
  const { isJoined, roomId, isLoading} = useContext(RoomDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isJoined && isLoading) navigate(`/room/${roomId}`);
  }, [isJoined, isLoading, roomId]);

  if (isLoading) return <Loading />;
  if (!isLoading && !isJoined) return <Form />;
};

export default JoinPage;
