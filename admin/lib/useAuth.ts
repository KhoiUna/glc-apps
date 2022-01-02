import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useAuth({ redirectIfFound = false } = {}) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: user } = useSWR("/api/user", fetcher);

  useEffect(() => {
    if (!user?.isAuthenticated) Router.push("/login");
    if (user?.isAuthenticated && redirectIfFound) Router.push("/");
  }, [user]);

  return { user };
}
