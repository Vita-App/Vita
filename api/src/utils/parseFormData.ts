export default (formData: any) => {
  const parsedData: any = {};

  Object.keys(formData).forEach((key) => {
    try {
      parsedData[key] = JSON.parse(formData[key]);
    } catch (e) {
      parsedData[key] = formData[key];
    }
  });

  return parsedData;
};
