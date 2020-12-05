const axios = require("axios");
const dashboard = () => {
  let media = null;
  let offset = 0;
  let chunckSize = 3.5 * 1024 * 1024;
  let total = 0;
  let counter = 0;
  async function apiUpload(data) {
    return new Promise((resolve, reject) => {
      console.log("api called", data.length);
      const formData = new FormData();
      formData.append("file", data);
      axios
        .post("http://localhost:3005/api/mediaupload", formData, {
          headers: {
            "content-type": "multipart/form-data",
            "enctype": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          resolve({
            data: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
          reject({
            error: error,
          });
        });
      return;
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(media.size);
    const reader = new FileReader();

    reader.onloadend = async () => {
      console.log("progress", (total / media.size) * 100);
    //   let data = new Uint8Array(reader.result);
      let data = reader.result.split("base64,")[1];
      let response = await apiUpload(data);
      if (response.data == 'ok') {
        total += data.length;
        offset += chunckSize;
        seek();
      } else {
        return;
      }
    };
    seek();
    function seek() {
        counter+=1;
        console.log(counter);
      if (offset >= media.size) {
        console.log(total);
        return;
      }
      let blob = media.slice(offset, offset + chunckSize);
      reader.readAsDataURL(blob);
    }
  };
  const handleChange = (event) => {
    media = event.target.files[0];
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};
export default dashboard;
