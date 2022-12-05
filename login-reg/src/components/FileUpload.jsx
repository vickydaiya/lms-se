import DropFile from './DropFile';
import './FileUpload.css';

export const FileUpload = () => {

    const onFileChange = (files) => {
        console.log(files);
    }

    return(
        
        <div>
            <div className="submit_box">
            <DropFile onFileChange={(files) => onFileChange(files)}/>
            </div>
            <button className="ancPost"> Submit </button>
        </div>
    )
}