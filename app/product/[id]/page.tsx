// app/product/[id]/page.tsx
import { GET_PRODUCT_DETAILS } from "@/graphql/queries/getProductDetails";
import { fetchGraphQL } from "@/lib/api-client";
import { PriceSection } from "@/components/product/PriceSection";
import { ImageGallery } from "@/components/utility/ImageGallery";
import { ProductActions } from "@/components/product/ProductAction";
import { calculateSellingPrice, calculateDiscountPercentage, formatPrice } from "@/lib/price-utils";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchGraphQL(GET_PRODUCT_DETAILS, { uid: id });
  const product = data.getProducts.result.products[0];

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <nav className="flex items-center text-sm text-gray-500 mb-8 capitalize">
        <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <a href="/products" className="hover:text-gray-900 transition-colors">Products</a>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium truncate">{product.enName}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        <ImageGallery images={product.images} />

        <div className="mt-8 lg:mt-0">
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {product.enName}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">(128 customer reviews)</span>
              <span className="text-sm text-green-600 font-medium">✓ In Stock</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">SKU: {product.uid}</p>
          </div>

          <div className="py-6 border-b border-gray-200">
            <PriceSection variant={product.variants?.[0]} />
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="py-6 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Select Variant</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.variants.map((variant: any, idx: number) => {
                  const isInStock = variant.quantity > 0;
                  const sellingPrice = calculateSellingPrice(variant);
                  const discountPercent = calculateDiscountPercentage(variant);
                  
                  return (
                    <button
                      key={idx}
                      className={`relative p-3 rounded-xl border-2 transition-all text-left ${
                        idx === 0 
                          ? 'border-gray-900 bg-gray-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-400 hover:shadow-sm'
                      } ${!isInStock && 'opacity-50 cursor-not-allowed'}`}
                      disabled={!isInStock}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium text-gray-500">Variant</span>
                        {!isInStock && (
                          <span className="text-xs text-red-500 font-medium">Out of stock</span>
                        )}
                      </div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {variant.posItemCode || variant.ebsItemCode}
                      </div>
                      <div className="text-lg font-bold text-gray-900 mt-2">
                        {formatPrice(sellingPrice)}
                      </div>
                      {discountPercent > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                          {variant.discount?.type === 'percentage' 
                            ? `${discountPercent}% OFF`
                            : `Save ${formatPrice(variant.discount?.amount)}`
                          }
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {product.priceAndStocks && product.priceAndStocks.length > 0 && (
            <div className="py-6 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Key Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.priceAndStocks.slice(0, 4).map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">{item.enLabel}</p>
                      <p className="text-sm font-medium text-gray-900">{item.values[0]?.enName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ProductActions product={product} variants={product.variants} />
        </div>
      </div>

     
    </main>
  );
}