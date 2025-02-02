import { X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import Image from "next/image";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <Image
                                height={100}
                                width={100}
                                src={selectedUser?.profilePic || "/avatar.png"}
                                alt={selectedUser?.fullname || "User"}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium">{selectedUser?.fullname}</h3>
                        <p className="text-sm text-base-content/70">
                            {selectedUser?.id && onlineUsers.includes(selectedUser.id)
                                ? "Online"
                                : "Offline"}
                        </p>
                    </div>
                </div>

                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;