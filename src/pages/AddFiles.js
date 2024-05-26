import { Auth } from "aws-amplify";
import axios from "axios";
import { useState } from "react";

const AddFiles = () => {
    const [file,setFiles] = useState(null);
    const onFileUpload = async () => {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.username;
    
        if (file instanceof File) {
            const reader = new FileReader();
    
            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1]; // remove the mime type
                const data = {
                    userId: userId,
                    fileName: file.name,
                    fileType: file.type,
                    fileContent: base64data
                };
    
                axios.post("https://rjbw9ux3u9.execute-api.us-west-2.amazonaws.com/prod1/file-upload", data).then(() => {
                    window.location.href = "/";
                })
                .catch(error => {
                    console.error(`Upload Error: ${error}`);
        });
        }

        reader.onerror = (error) => {
            console.error(`File Reading Error: ${error}`);
        }

            reader.readAsDataURL(file);
        } else {
            console.log('No file selected for upload');
        }
    }
    const onFileChange = event => {
        setFiles(event.target.files[0]);
    }
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <h1>Add new file</h1>
      <div className="w-[800px] h-[400px] shadow grid grid-cols-2 rounded p-2 gap-3">

        <div className="grid grid-rows-[1fr_40px] gap-3">
          <div className="bg-gray-100 relative flex justify-center items-center">
            <p className="uppercase text-xl font-bold text-center text-gray-500">Drag your file here or click to add.</p>
          <input type="file" onChange={onFileChange} className="opacity-0 absolute w-full h-full select-none"/>
          </div>
          <button className="btn btn-success me-3" onClick={onFileUpload}>
            Upload File
          </button>
        </div>

        <div className="">
            {file ? <img className="w-full object-cover" src={URL.createObjectURL(file)} alt="preview"/> : <p>Preview</p>}
        </div>
      </div>
    </div>
  );
};

export default AddFiles;
