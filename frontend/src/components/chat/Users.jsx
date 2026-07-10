import { UsersRound, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useContext } from "react";
import { RoomDataContext } from "../../context/RoomContext";

const Users = () => {
    const { roomData} = useContext(RoomDataContext);
  return (
    <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="active-user-container">
          <UsersRound size={16}/>
          <span>Active Viewers ({roomData?.users.length || 0})</span>
        </div>
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
      </div>
  )
}

export default Users