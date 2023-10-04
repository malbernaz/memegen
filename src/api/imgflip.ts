const IMGFLIP_URL = "https://api.imgflip.com/";

export type MemeFormat = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  boxCount: number;
};

type ResponseType<T> =
  | { success: true; data: T }
  | { success: false; error_message: string };

class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

const api = {
  async get<T = unknown>(endpoint: string) {
    const res = await fetch(`${IMGFLIP_URL}/${endpoint}`);

    const data: ResponseType<T> = await res.json();

    if (!data.success) {
      throw new APIError(data.error_message);
    }

    return data.data;
  },
};

export async function getPopularMemes() {
  try {
    return await api.get<{ memes: MemeFormat[] }>("get_memes");
  } catch (error) {
    if (error instanceof APIError) {
      console.error(error.message);
    }
  }
}
