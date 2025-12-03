// lib/api.ts
export async function getCourseBySlug(slug: string) {
  const res = await fetch(
    `https://docker-image-production-b2d9.up.railway.app/wp-json/wp/v2/course?slug=${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch course page: ${res.statusText}`);
  }

  const data = await res.json();
  return data[0];
}