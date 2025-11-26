// lib/api.ts
export async function getCourseBySlug(slug: string) {
    const res = await fetch(`http://procoding-headless.local/wp-json/wp/v2/course?slug=web-development`, {
      next: { revalidate: 60 },
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch course: ${res.statusText}`);
    }
  
    const data = await res.json();
    console.log(data)
    return data[0];
  }