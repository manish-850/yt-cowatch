import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { RoomDataContext } from "../../context/RoomContext";

const Users = () => {
    const { roomData} = useContext(RoomDataContext);
  return (
        <div className="user-list">
          {roomData?.users.map((user) => {
            const isSynced = user.status?.isSynced ?? true;
            return (
              <Badge
                variant="secondary"
                key={user.id}
              >
                <span
                  className="user"
                  style={{
                    backgroundColor: isSynced ? "#22c55e" : "#ef4444",
                  }}
                />
                {user.isAdmin && <Shield size={12} />}
                {user.username}
              </Badge>
            );
          })}
        </div>
  )
}

export default Users