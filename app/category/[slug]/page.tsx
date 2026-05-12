import CategoryClient from "./CategoryClient";

export function generateStaticParams() {
  return [
    { slug: "elektronik" },
    { slug: "komputer" },
    { slug: "handphone" },
    { slug: "pakaian-pria" },
    { slug: "pakaian-wanita" },
    { slug: "kecantikan" },
    { slug: "rumah-tangga" },
    { slug: "tas-sepatu" },
    { slug: "mainan" },
    { slug: "olahraga" },
    { slug: "makanan" },
    { slug: "otomotif" },
    { slug: "kesehatan" },
    { slug: "hobi" },
    { slug: "voucher" },
  ];
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}
