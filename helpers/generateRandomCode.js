const generateRandomCode = () => {
    return "#" + (Math.random() + 1).toString(36).substring(4);
  };
  
  export default generateRandomCode;