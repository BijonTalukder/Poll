import { Link } from "react-router-dom";
import { IStores } from "../../constant";

interface StoreCartProps {
    data: IStores;
  }
const StoreCart:React.FC<StoreCartProps> = ({data}) => {
  return (
    <Link to={`/store/${data._id}`}>
       <div key={data._id} className="relative bg-white shadow-lg rounded-lg">
            
            {/* Kitchen Image */}
            <img 
              src={data?.imgUrl} 
              alt={`${data?.storeName} Photo`} 
              className="w-full h-40 object-cover rounded-lg" 
            />
            
            {/* Offer Badge */}
            {/* {kitchen.offer && (
              <span className="absolute top-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                {kitchen.offer}
              </span>
            )} */}
            
            {/* Kitchen Details */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{data.storeName}</h3>
              {/* <p className="text-sm text-gray-600">{kitchen.kitchenType}</p> */}
              
              {/* Ratings */}
              <div className="flex items-center mt-2">
                {/* {getStars(kitchen.rating)} */}
                {/* <span className="ml-2 text-gray-600 text-sm">({kitchen.rating.toFixed(1)})</span> */}
              </div>

              {/* Seller Info */}
              <div className="flex items-center mt-4">
                <img 
                //   src={kitchen.sellerPhoto} 
                  alt="Seller" 
                  className="w-12 h-12 rounded-full object-cover mr-3" 
                />
                <div>
                  <span className="block text-sm text-gray-700 font-semibold">Seller</span>
                  {/* <span className="block text-xs text-gray-500">{kitchen.distance} km away</span> */}
                </div>
              </div>

              {/* Call to action */}
              {/* <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none">
                View Kitchen
              </button> */}
            </div>
          </div></Link>
 
  )
}

export default StoreCart