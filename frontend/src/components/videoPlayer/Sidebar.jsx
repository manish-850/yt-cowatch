import Chat from "../chat/Chat";
import Users from "../chat/Users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Sidebar() {
  return (
    <>
      <div className="p-2 bg-red-500">
        <Tabs defaultValue="chat" className="h-full bg-blue-500">
          <TabsList className="w-full bg-green-400">
            <TabsTrigger className="cursor-pointer" value="chat">Chat</TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="px-2 bg-yellow-400">
            <Chat/>
          </TabsContent>
          <TabsContent value="users" className={"bg-purple-500"}>
            <Users/>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
