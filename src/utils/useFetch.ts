import useSWR from "swr";

export function useFetch<T>(url: string) {
    const { data, error, isLoading, mutate } = useSWR(url, async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        console.log("🚀 ~ file: useFetch.ts:7 ~ const{data,error}=useSWR ~ data:", data)

        return data as T;
    });

    return { data, error, isLoading, mutate };
}