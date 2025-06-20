// /app/interview/type/[category]/page.tsx
import Link from 'next/link';

const subCategories = {
  mba: ['IIM', 'XLRI', 'FMS'],
  gmat: ['Duke', 'Harvard', 'Stanford'],
  technical: ['Frontend', 'Backend', 'DevOps'],
  hr: ['Entry-level', 'Managerial', 'Leadership'],
  sat: ['Reading', 'Math', 'Writing'],
  csat: ['Service', 'Support', 'Feedback'],
};


export default function SubCategoryPage({ params }) {
  const { category } = params;
  const items = subCategories[category.toLowerCase()];

  if (!items){
    return(
        <>
            <h1>Not Found</h1>
        </>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize mb-6">{category} Subcategories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(sub => (
          <Link
            key={sub}
            href={`/dashboard/interview/type/${category}/${sub.toLowerCase()}`}
            className="border rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="text-xl font-semibold">{sub}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
