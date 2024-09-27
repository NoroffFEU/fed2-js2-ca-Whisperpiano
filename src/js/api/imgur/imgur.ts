const CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID;

export async function uploadImage(image: File) {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error uploading image");
    }

    const data = await response.json();

    return data.data.link;
  } catch (error) {
    console.error(error);
  }
}
