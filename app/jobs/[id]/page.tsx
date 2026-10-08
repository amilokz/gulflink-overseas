import jobsData from '../../../data/jobs.json';
import JobDetailClient from './JobDetailClient';

export function generateStaticParams() {
  return (jobsData as { id: string }[]).map((j) => ({ id: j.id }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = (jobsData as (typeof jobsData)[number][]).find((j) => j.id === params.id);
  if (!job) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-navy-700">Job not found.</p>
      </div>
    );
  }
  return <JobDetailClient job={job} />;
}
