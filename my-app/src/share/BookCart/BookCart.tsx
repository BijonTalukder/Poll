import "./BookCart.scss";
const BookCart = () => {
  return (
    <div className="book-container">
      <div className="inner-container">
        <div className="book-img">
          <img alt="" src="/Assets/Img/331501.png" />
        </div>
        <div className="caption">
          <h4 className="caption-title">একাত্তরের মুজিব</h4>
         
          <h4 className="caption-author text-center">হুমায়ুন</h4>
        <h3 className="text-blue-500">৳ ৩২৩</h3>
        </div>
      </div>
    </div>
  );
};

export default BookCart;
