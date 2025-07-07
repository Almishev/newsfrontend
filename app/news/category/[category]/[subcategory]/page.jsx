import React from 'react';
import Link from 'next/link';

const base_api_url = process.env.NEXT_PUBLIC_API_URL;

async function getNews(category, subcategory) {
  const res = await fetch(`${base_api_url}/api/category/${category}/${subcategory}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.news || [];
}

const SubcategoryPage = async ({ params }) => {
  const { category, subcategory } = params;
  const news = await getNews(category, subcategory);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">
        {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} за {category}
      </h1>
      {news.length === 0 ? (
        <div className="text-gray-700 text-lg">Няма новини за <b>{category}</b> – <b>{subcategory}</b>.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((item) => (
            <Link
              key={item._id}
              href={`/news/${item.slug}`}
              className="bg-white rounded shadow p-4 flex flex-col gap-2 hover:bg-gray-50 transition"
            >
              {item.image && <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded" />}
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <div className="text-sm text-gray-500">{item.date} | {item.category} | {item.subcategory}</div>
              <div className="text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.description }} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubcategoryPage; 