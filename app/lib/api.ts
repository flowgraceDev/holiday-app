const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchTours() {
  console.log("vinay")
  const res = await fetch(`${API_URL}/api/tours`);
  const json = await res.json();
console.log("sharma",json)
  return json?.data?.map((item: any) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    duration: item.duration,
    people: item.people,
    image: item.image?.data?.attributes?.url
      ? `${API_URL}${item.image.data.attributes.url}`
      : "",
  }));
}

export async function fetchTourBySlug(slug: string) {
  const res = await fetch(
    `${API_URL}/api/tours?filters[slug][$eq]=${slug}&populate=*`
  );
  return res.json();
}

export async function createInquiry(data: any) {
  const res = await fetch(`${API_URL}/api/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  return res.json();
}