// /app/interview/type/page.tsx
import Link from 'next/link';

const categories = [
  { name: 'MBA', slug: 'mba' },
  { name: 'Technical', slug: 'technical' },
  { name: 'HR', slug: 'hr' },
  { name: 'SAT', slug: 'sat' },
  { name: 'GMAT', slug: 'gmat' },
  { name: 'CSAT', slug: 'csat' },
];

export default function InterviewCategory() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose Interview Type</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <Link
            key={cat.slug}
            href={`/dashboard/interview/type/${cat.slug}`}
            className="border rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="text-xl font-semibold">{cat.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
