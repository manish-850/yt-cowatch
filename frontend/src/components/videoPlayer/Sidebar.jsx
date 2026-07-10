import Chat from "../chat/Chat";
import Users from "../chat/Users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, UserRound } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <div className="p-2">
        <Tabs defaultValue="chat" className="h-full">
          <TabsList className="w-full">
            <TabsTrigger className="cursor-pointer" value="chat">
              <MessageCircle />
              Chat
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="users">
              <UserRound />
              Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="px-2">
            <Chat />
          </TabsContent>
          <TabsContent value="users">
            <Users />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
