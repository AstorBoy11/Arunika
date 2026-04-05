type ApiLikeResponse = {
  success?: boolean;
  message?: string;
};

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  const json = (await response.json()) as T & ApiLikeResponse;

  if (!response.ok || json.success === false) {
    throw new Error(json.message ?? "Gagal memuat data");
  }

  return json as T;
}
