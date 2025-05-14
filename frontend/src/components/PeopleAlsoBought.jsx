import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecommendations = async () => {
			try {
				const res = await axios.get("/products/recommendations");
				console.log(res.data);
				setRecommendations(res.data);
			} catch (error) {
				toast.error(error.response.data.message || "An error occurred while fetching recommendations");
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-col-3'>
  {recommendations.map((product, index) => {
    // If the product is undefined or missing an image, skip rendering
    if (!product || !product.image) {
      console.warn("Skipping invalid product at index", index, product);
      return null; // Skip this product card
    }

    return <ProductCard key={product._id} product={product} />;
  })}
</div>

	);
};
export default PeopleAlsoBought;