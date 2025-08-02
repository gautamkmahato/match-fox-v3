
import polar from '@/lib/polar/polar';
import polarTest from '@/test';
import Link from 'next/link';


export default async function Polar() {
  
  const products = await polar.products.list({ isArchived: false })

  console.log(products)

  const handle = () =>{
    polarTest()
  }

  return (
    <>
      <h1>Test products</h1>
      {products?.result?.items.map((product, index) =>(
        <div key={index}>
          <p>{product.name}</p>
          <p>{product.prices[0].priceAmount}</p>
          <Link href={`/payment/checkout?products=${product.id}`}>Pay Now</Link>
          <a href={`/api/polar/?products=${product.id}`}>Buy Product</a>
        </div>
      ))}
      {/* <button onClick={handle}>click</button> */}
    </>
  )
}
