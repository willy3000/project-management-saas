import React, { useState } from "react";




export default function ImageTest() {
  const [image, setImage] = useState("");


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      // console.log(base64String)
      setImage(`data:image/png;base64, ${base64String}`);
    };

    console.log(reader.readAsDataURL(file))
  };


  return (
    <>
      <input type="file" onChange={(e) => handleFileInputChange(e)} />
      <img src={image} alt="" width={'250px'}/>
    </>
  );
}
