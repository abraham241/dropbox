import { Auth } from "aws-amplify";
import axios from "axios";
import { useEffect, useState } from "react";
const link =
  "https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-list";
const AllFile = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.username;
      axios
        .get(link, { params: { userId: userId } })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            setFiles(response.data);
          }
        })
        .catch((error) => console.error(`Error: ${error}`));
    })();
  }, []);
  const downloadFile = (fileName) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        const userId = user.username;
        axios
          .get(
            "https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-download",
            { params: { userId: userId, fileName: fileName } }
          )
          .then((response) => {
            const url = response.data.url;
            window.open(url, "_blank");
          })
          .catch((error) => console.error(`Error: ${error}`));
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  const deleteFile = async (fileName) => {
    const user = await Auth.currentAuthenticatedUser();
    const userId = user.username;
    console.log(fileName);

    axios
      .delete(
        `https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-delete?userId=${userId}&fileName=${fileName}`
      )
      .then((res) => {
        // this.showFilesView();  // Refresh the file list after delete
        console.log(res);
        window.location.reload();
        axios
          .get(link, { params: { userId: userId } })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              setFiles(response.data);
            }
          })
          .catch((error) => console.error(`Error: ${error}`));
      })
      .catch((error) => console.error(`Delete Error: ${error}`));
  };
  return (
    <div className="w-full flex flex-wrap gap-3">
      {files.reverse().map((img, i) => (
        <div key={i} className="p-2 border rounded w-full max-w-[300px]">
          <div className="w-full h-[100px] flex justify-center items-center text-[30px] uppercase font-bold bg-blue-700 text-gray-100 rounded">{img.type.split("/").at(-1)}</div>
          <div className="flex flex-col items-start gap-2 py-2">
            <div className="uppercase text-[14px] text-red-800">{img.name.split(" ").at(0).slice(0,20).split("%")[0]}</div>
            <div className="bg-blue-200 rounded px-2">{(img.size / 1024).toFixed(2) + "KB"}</div>
            <div className="grid grid-cols-2 gap-3 w-full">
            <button className="bg-green-600 text-white rounded-sm" onClick={() => downloadFile(img.name)}>
              <i className="fas fa-arrow-down"></i> Download
            </button>
            <button
              className="bg-red-600 px-2 py-2 rounded-sm text-white flex justify-center items-center gap-3"
              onClick={() => deleteFile(img.name)}
            >
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllFile;
