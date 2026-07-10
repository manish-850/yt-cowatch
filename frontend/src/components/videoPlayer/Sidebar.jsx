import Chat from "../chat/Chat";
import Users from "../chat/Users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Tabs defaultValue="chat" className="h-full">
          <TabsList className="w-full sidebar-tabslist">
            <TabsTrigger className="cursor-pointer sidebar-tabstrigger" value="chat">Chat</TabsTrigger>
            <TabsTrigger className="cursor-pointer sidebar-tabstrigger" value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="px-2">
            <Chat/>
          </TabsContent>
          <TabsContent value="users">
            <Users/>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
