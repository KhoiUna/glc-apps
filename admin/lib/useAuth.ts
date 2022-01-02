import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useAuth() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: user } = useSWR("/api/user", fetcher);

  useEffect(() => {
    if (!user?.isAuthenticated) Router.push("/login");
  }, [user]);

  return { user };
}
