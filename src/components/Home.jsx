import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
const [title, setTitle] = useState('');
const [value, setValue] = useState('');
const [searchParams, setSearchParams] = useSearchParams();
const pasteId = searchParams.get("pasteId");
const dispatch = useDispatch();
const allPaste = useSelector((state) => state.paste.pastes);


useEffect(() => {
  if(pasteId) {
    const paste = allPaste.find((p) => p._id === pasteId);
    setTitle(paste.title);
    setValue(paste.content);
  }
}, [pasteId])



function createPaste(){
    const paste = {
        title: title,
        content: value,
       _id: pasteId ||  Date.now().toString(36),
  createdAt: new Date().toISOString(),
    }


    if(pasteId){
        dispatch(updateToPastes(paste));
    }else{
dispatch(addToPastes(paste));
    }

setTitle('');
setValue('');
setSearchParams({});


}

  return (
    <div>
<div className='flex flex-row gap-4 place-content-between'>
    <input
  className="p-2 rounded-xl mt-2 pl-5 w-full border border-purple-300 bg-purple-50 text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
  type="text"
  placeholder="Enter title here"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<button 
onClick={createPaste} 
className='p-2 rounded-2xl mt-2' >
    {
        pasteId ? "Update my Paste" : "Create my Paste"
    }
</button>
</div>
<div className='mt-8'>
    <textarea
  className="rounded-xl mt-4 w-full min-h-[400px] p-4 border border-gray-300 bg-gray-50 text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-gray-400"
  placeholder="Enter content here"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={20}
/>
</div>

    </div>
  )
}

export default Home