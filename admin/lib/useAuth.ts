import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export default function useAuth({ redirectIfFound = false } = {}) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/user", fetcher);

  useEffect(() => {
    if (!data?.user?.isAuthenticated) Router.push("/login");
    if (data?.user?.isAuthenticated && redirectIfFound) Router.push("/");
  }, [data]);

  return { data };
}
