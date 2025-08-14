import React from "react";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

const ChapterContent = ({ chapter, content }) => {
  
  // Ensure content.content is always an array
  const contentArray = content?.content?.concept?.sections;

  return (
    <div className="p-10">
      
      <h2 className="font-medium text-2xl">{chapter?.name}</h2>
      <p className="text-gray-500" onClick={()=>console.log(contentArray)}>{chapter?.about}</p>
      <div className="flex my-6  ml-20 justify-center">
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>
      <div>
        {contentArray?.map((item,index)=>(
          <div className="p-5 bg-sky-50 mb-3 rounded-lg">
            <h2 className=" text-lg font-extrabold">{item?.title}</h2>
            <p className="text-sm mt-2">{item?.content}</p>
            {item?.code&&<p className="bg-black text-white  border-8 border-gray-600"><code>{item?.code}</code></p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
