import Form from "../components/form/Form";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useRoom from "@/hooks/room/useRoom";

const JoinPage = () => {
  const { isJoined, roomId, isLoading} = useRoom();
  const navigate = useNavigate();

  useEffect(() => {
    if (isJoined && isLoading) navigate(`/room/${roomId}`);
  }, [isJoined, isLoading, roomId]);

  if (isLoading) return <Loading />;
  if (!isLoading && !isJoined) return <Form />;
};

export default JoinPage;
