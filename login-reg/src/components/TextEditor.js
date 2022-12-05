
import '../App.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import "react-quill/dist/quill.snow.css"

export const TextEditor = ({changeState}) => {
  // const [value,setValue] = useState("");
  const modules = {
    toolbar: [
      [{header: [1,2,3,4,5,6,false]
      }],
      [{font : []}],
      [{size: []}],
      ["bold","italic","underline","strike","blockquote"],
      [{list:'ordered'},
    {list:'bullter'},
  {indent: "-1"},
  {indent: "+1"}],
  ["link","video","image"]]
    
  }

  return (
    <div className="te-container">
     <div className='te-row'>
      <div className='editor'>
        <ReactQuill theme= "snow" onChange = {changeState} className = "editor-input"
        modules={modules}/>
      </div>
      
      </div>
    </div>
  );
}

