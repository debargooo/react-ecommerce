import React from 'react'
const testimonials = [
    {
      name: "Daniel Clifford",
      designation: "Verified Buyer",
      imgSrc: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-daniel.jpg",
      title: "This product exceeded my expectations!",
      text: "I was hesitant at first, but this product has been a game changer. The quality is top-notch and it's incredibly easy to use. I highly recommend it to anyone looking for reliable and affordable options."
    },
    {
      name: "Jonathan Walters",
      designation: "Verified Buyer",
      imgSrc: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-jonathan.jpg",
      title: "Fantastic customer service and fast delivery",
      text: "From the moment I placed my order, I received excellent customer service. My queries were answered promptly and my product arrived earlier than expected. Couldn't be happier!"
    },
    {
      name: "Kira Whittle",
      designation: "Verified Buyer",
      imgSrc: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-kira.jpg",
      title: "Great value for money",
      text: "This product offers great value for its price. It's durable, stylish, and works perfectly. I've recommended it to all my friends and family."
    },
    {
      name: "Jeanette Harmon",
      designation: "Verified Buyer",
      imgSrc: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-jeanette.jpg",
      title: "An overall wonderful shopping experience",
      text: "The shopping experience was seamless and enjoyable. The website is easy to navigate and I found exactly what I was looking for. Will definitely shop here again."
    },
    {
      name: "Patrick Abrams",
      designation: "Verified Buyer",
      imgSrc: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-patrick.jpg",
      title: "High-quality products and excellent support",
      text: "I've purchased several items from this store and have always been impressed with the quality. The support team is also very responsive and helpful. Highly recommend!"
    }
  ];
  

function Testimonial() {

 
    return (
        <>
        <h1 className="text-center text-3xl  text-black mt-[8rem] font-semibold">What Our Customers Are Saying?</h1>
        <div className="flex items-center justify-center">
     
      <div className="grid gap-6 transform scale-90 m-4 lg:grid-rows-2 lg:grid-cols-4 grid-cols-1">
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`p-8 rounded-lg shadow-lg text-white ${index === 0 ? 'bg-purple-700 lg:col-span-2' : ''} ${index === 1 ? 'bg-gray-600' : ''} ${index === 2 ? 'text-black bg-white lg:row-span-2' : ''} ${index === 3 ? 'text-black bg-white' : ''} ${index === 4 ? 'bg-gray-900 lg:col-span-2' : ''}`}>
            <div className="flex items-center mb-6">
              <img className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4" src={testimonial.imgSrc} alt={testimonial.name} />
              <div>
                <p className={`text-sm font-semibold ${index === 2 || index === 3 ? 'text-gray-700' : 'text-gray-200'}`}>{testimonial.name}</p>
                <p className={`text-sm ${index === 2 || index === 3 ? 'text-gray-700 opacity-50' : 'text-gray-200 opacity-50'}`}>{testimonial.designation}</p>
              </div>
            </div>
            <div>
              <h4 className={`text-xl font-semibold mb-4 ${index === 2 || index === 3 ? 'text-gray-800' : 'text-gray-100'}`}>{testimonial.title}</h4>
              <p className={`text-base ${index === 2 || index === 3 ? 'text-gray-900' : 'text-gray-300'}`}>{testimonial.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    )
}

export default Testimonial