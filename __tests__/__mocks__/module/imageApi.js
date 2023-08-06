// mock return image url, since to can not create blob URL image on msw with storybook;
const imageApi = {
  uploadImage: async (image, props) => {
    return { uploadedImageUrl: URL.createObjectURL(image) };
  },
};

export default imageApi;
