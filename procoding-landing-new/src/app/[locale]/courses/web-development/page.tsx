import { getCourseBySlug } from "@/lib/api";
import WebDevLandingPage from "./WebDevLandingPage";

export default async function Page({ params }: { params: { courseSlug: string; locale: string } }) {
  const course = await getCourseBySlug(params.courseSlug);
  return <WebDevLandingPage course={course} locale={params.locale} />;
}