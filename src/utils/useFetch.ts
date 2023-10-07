import useSWR from "swr";

export function useFetch<T>(url: string) {
    const { data, error, isLoading, mutate } = useSWR(url, async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        return data as T;
    }, {
        revalidateIfStale: true,
        revalidateOnMount: true,
        revalidateOnFocus: true,
    });

    return { data, error, isLoading, mutate };
}