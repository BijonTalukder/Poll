
import { IoAddCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/feature/Cart/CartSlice";
import { RootState } from "../../redux/store";
import { FaMinus } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

// import { RootState } from "@reduxjs/toolkit/query";
const FoodCart = ({ data }: any) => {
  const dispatch = useDispatch();
  const handleClick = (data: any) => {
    console.log(data
    );

    dispatch(addItemToCart({
      item: {
        id: data._id,
        productName: data.productName,
        price: data.price,
        quantity: 1,
        ImgUrl: data.ImgUrl
      },
      storeId: data.storeId
    }))
  }
  const cartData = useSelector((state: RootState) => state.cart.items);
  // console.log(cartData)
  return (
    <div className="max-h-[245px] max-w-[496px] rounded-[12px] shadow-lg p-[10px]">
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2">
          <div className="lg:my-2">
            <h4 className="font-bp font-semibold text-[20px]">
              {data?.productName}
            </h4>
          </div>

          <div className="">
            <h5 className="font-bp text-[14px]">
              {
                data?.description
              }
              {/* 1 McChicken™, 1 Big Mac™, 1 Royal Cheeseburger, 3 medium */}
            </h5>
          </div>

          <div className="lg:my-2">
            <h5 className="font-bp text-[18px] font-bold">{data?.price}</h5>
          </div>
        </div>
        <div className="col-span-1 relative">
          <div className="max-h-[150px] w-full rounded-[12px] overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-[12px]"
              src={data?.ImgUrl}
              alt="Food Cart"
            />

            <div onClick={() => { handleClick(data) }} className="hover:shadow-[0px_4px_4px_0px_#00000040] rounded-tl-[30px] rounded-br-[12px] absolute right-0 bottom-0 w-[68px] h-[61px] bg-white opacity-85 flex justify-center items-center">

              {
                cartData.length && cartData.filter(i => i.id == data._id).length > 0 ?
                  <div className="flex justify-center items-center rounded-full w-8 h-8 bg-slate-900">
                    <span className="text-white font-bp">      {cartData.find(i => i.id === data._id)?.quantity || 1}
                    </span>
                  </div>

                  // <div className="flex items-center gap-1  rounded-lg bg-gray-100 shadow-md">
                  //   <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 cursor-pointer hover:bg-slate-700 transition-colors">
                  //     <FaMinus color="white" />
                  //   </div>
                  //   <span className="text-lg font-semibold text-gray-800">1</span>
                  //   <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 cursor-pointer hover:bg-slate-700 transition-colors">
                  //     <MdAdd color="white" />
                  //   </div>
                  // </div> 

                  : < IoAddCircleSharp className="focus:shadow-[0px_4px_4px_0px_#00000040]" size={38} />

              }
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
