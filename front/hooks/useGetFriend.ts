import { getFriend } from "@services/api/friend";
import { useQuery } from "@tanstack/react-query";
import { Friend } from "@type/friend";
import { useEffect, useState } from "react";

export const useGetFriend = () => {
  const [isConnected, setIsConnected] = useState<boolean>();

  const { data: friendInfo, isLoading } = useQuery<Friend>(["friend", "info"], () => getFriend(), {
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (friendInfo) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [friendInfo]);

  return { isConnected, friendInfo, isLoading };
};
