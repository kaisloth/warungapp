import React, {useEffect, useRef, forwardRef, use} from 'react'

let AddProductOverlay = forwardRef((props, formAddProductOverlay) => {

    const imageInput = useRef(null);
    const previewImage = useRef(null);
    const labelImageInput = useRef(null);
    const alertForm = useRef(null);
    const textAlertForm = useRef(null);
    const inputNama = useRef(null);
    const inputHarga = useRef(null);
    const formAddProduct = useRef(null);

    useEffect(()=> {
        imageInput.current.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function(e) {
                labelImageInput.current.innerHTML = 'Ubah Gambar'
                previewImage.current.src = e.target.result;
                previewImage.current.style.display = 'block';
              }
              reader.readAsDataURL(file);
            } else {
              previewImage.current.style.display = 'none';
            }
          });

        })
        
        let addProductSubmit = () => {
            if(labelImageInput.current.innerHTML == 'Pilih Gambar' && inputHarga.current.value != '' && inputNama.current.value != '') {
                alertForm.current.classList.replace('hidden', 'flex');
                textAlertForm.current.innerHTML = 'Pilih gambar terlebih dahulu!'

                setTimeout(() => {
                    alertForm.current.classList.replace('flex', 'hidden');
                }, 3000);
            }
        }


  return (
    <>
        <div ref={formAddProductOverlay} className='fixed h-screen w-screen bg-[rgba(0,0,0,.5)] hidden justify-center pt-32 z-50'>
            <div className='bg-white border border-gray-200 w-80 h-fit px-8 pb-8 pt-4 rounded-lg flex flex-col'>
                <button className='self-end cursor-pointer translate-x-4' type='button' onClick={() => {formAddProductOverlay.current.classList.replace('flex', 'hidden');formAddProduct.current.reset(); previewImage.current.style.display = 'none';}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.9545 5.95548C6.39384 5.51614 7.10616 5.51614 7.5455 5.95548L11.999 10.409L16.4524 5.95561C16.8918 5.51627 17.6041 5.51627 18.0434 5.95561C18.4827 6.39495 18.4827 7.10726 18.0434 7.5466L13.59 12L18.0434 16.4534C18.4827 16.8927 18.4827 17.605 18.0434 18.0444C17.6041 18.4837 16.8918 18.4837 16.4524 18.0444L11.999 13.591L7.5455 18.0445C7.10616 18.4839 6.39384 18.4839 5.9545 18.0445C5.51517 17.6052 5.51516 16.8929 5.9545 16.4535L10.408 12L5.9545 7.54647C5.51516 7.10713 5.51517 6.39482 5.9545 5.95548Z" fill="#323544"/>
                    </svg>
                </button>
                <h2 className='mt-2 text-center text-2xl font-extrabold text-slate-900 select-none mb-6'>Tambah Produk</h2>
                <div ref={alertForm} className='justify-center bg-red-300 text-white py-1 px-2 rounded-sm hidden'>
                    <p ref={textAlertForm}>Alert!</p>
                </div>
                <form ref={formAddProduct} action={`${import.meta.env.VITE_API_URL}/product/add`} method='post' encType='multipart/form-data' className='flex flex-col gap-2 mt-2'>
                    <input ref={inputNama} name='name' className='border border-gray-200 rounded-sm p-1' type="text" placeholder='Nama Produk' required />
                    <input ref={inputHarga} name='price' className='border border-gray-200 rounded-sm p-1' type="text" placeholder='Harga Produk' required />
                    <div className='flex flex-col gap-2'>
                         <label htmlFor="input-gambar" className="border border-gray-200 p-2 rounded-sm w-fit cursor-pointer hover:bg-gray-200 flex gap-1 items-center">
                            <svg width="23" height="22" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.89453 6.93457C7.99707 6.93457 7.26953 7.66211 7.26953 8.55957C7.26953 9.45703 7.99707 10.1846 8.89453 10.1846H8.90453C9.80199 10.1846 10.5295 9.45703 10.5295 8.55957C10.5295 7.66211 9.80199 6.93457 8.90453 6.93457H8.89453Z" fill="#343C54"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.5 5.5C3.5 4.25736 4.50736 3.25 5.75 3.25H18.75C19.9926 3.25 21 4.25736 21 5.5V18.5C21 19.7426 19.9926 20.75 18.75 20.75H5.75C4.50736 20.75 3.5 19.7426 3.5 18.5V5.5ZM5.75 4.75C5.33579 4.75 5 5.08579 5 5.5V15.5807L6.45103 13.6808C7.35463 12.4977 9.13749 12.5025 10.0347 13.6905L11.2502 15.3001C11.6008 15.7643 12.3234 15.6701 12.5431 15.1315L14.5208 10.2852C15.1881 8.65008 17.3928 8.3859 18.4274 9.81704L19.5 11.3006V5.5C19.5 5.08579 19.1642 4.75 18.75 4.75H5.75ZM5 18.5V18.0031C5.0557 17.962 5.10659 17.9124 5.15073 17.8546L7.64311 14.5913C7.94431 14.1969 8.5386 14.1985 8.83766 14.5945L10.0532 16.2041C11.1048 17.5966 13.2726 17.3139 13.9319 15.6983L15.9096 10.8519C16.1321 10.3069 16.867 10.2188 17.2118 10.6959L19.5 13.8608V18.5C19.5 18.9142 19.1642 19.25 18.75 19.25H5.75C5.33579 19.25 5 18.9142 5 18.5Z" fill="#343C54"/>
                            </svg>
                            <span ref={labelImageInput}>Pilih Gambar</span>
                        </label>
                         <input ref={imageInput} id='input-gambar' name="image" type="file" accept=".jpg, .jpeg, .png, .webp" className="hidden" required />
                         <img ref={previewImage} src="" alt="Thumbnail Preview" width="160" height="120" loading="lazy" className="hidden aspect-video mt-1 self-center" />
                    </div>
                    <button onClick={addProductSubmit} className='border border-gray-800 rounded-sm py-1 mt-6 cursor-pointer bg-gray-700 text-white hover:bg-gray-600' type='submit'>Tambah</button>
                </form>
            </div>  
        </div>
    </>
  )
});

export default AddProductOverlay