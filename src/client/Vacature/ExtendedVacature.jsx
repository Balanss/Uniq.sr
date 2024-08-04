import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import { FileUploader } from "react-drag-drop-files";
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from "react-google-recaptcha";

export default function ExtendedVacature() {

    const [resume, setResume] = useState({
        name: 'bob',
        lastName: '',
        Adres:'',
        DateOfBirth: '',
        Question1: '',
        Question2: '',
        Question3: '',
        Question4: '',
        email: '',
        phone: '',
        message: '',
        message2:'',
    })

 


    const [secret, setSecret] = useState('');
    const [agree, setAgree] = useState(false);
    const [googleCaptcha, setGoogleCaptcha] = useState(''); 

    
const [file, setFile] = useState();

const fileTypes = ["pdf"];



    const storedItem = JSON.parse(localStorage.getItem('item'));

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
       if(!file) {
          toast.error('Please upload a file');
          return;
       }

       if(secret.length > 0){
        return;
       }


       if(!agree) {
           toast.error('Please agree to terms and conditions');
           return;
       }

       const formData = new FormData();
       formData.append('name', resume.name);
       formData.append('lastName', resume.lastName);
       formData.append('Adres', resume.Adres);
       formData.append('DateOfBirth', resume.DateOfBirth);
       formData.append('Question1', resume.Question1);
       formData.append('Question2', resume.Question2);
       formData.append('Question3', resume.Question3);
       formData.append('Question4', resume.Question4);
       formData.append('message2', resume.message2);
       formData.append('email', resume.email);
       formData.append('phone', resume.phone);
       formData.append('message', resume.message);


       if (file) {
           formData.append('file', file,file.name);
       }
   
       try {
           const response = await axios.post('/api/resume', formData, {
               headers: {
                   'Content-Type': 'multipart/form-data'
               }
           });
           console.log(response);
              if (response.status === 200) {
                  toast.success('Resume submitted successfully');
              }
              else {
                  toast.error('Error submitting resume');
                  console.log(response)
              }
       } catch (error) {
           console.error('Error submitting resume:', error);
              toast.error('Error submitting resume');
       }
    };


    const handleCaptchaResponseChange = (response) => {
        setGoogleCaptcha(response ? true : false);
      };
    


  return (
    <div className='min-h-screen p-8 md:w-[85vw] md:m-auto grid md:grid-cols-2 md:text-sm text-md'>
        <section>
            <div className='text-left space-y-8 bg-slate-100/50 p-4'>
                <h1 className='text-3xl'>{storedItem.title}</h1>
                <p className='text-xl'>Description <br /> <span>{storedItem.description}</span></p>
                <p className='text-xl'>Location <br /> <span>{storedItem.location}</span></p>
                <p className='text-xl'>Date <br /> <span>{storedItem.date}</span></p>
                <p className='text-xl'>Status <br /> <span>{storedItem.status}</span></p>
                <p className='text-xl'>Pay <br /> <span>{storedItem.pay}</span></p>
                <p className='text-xl'>Goals <br /> <span>{storedItem.goals}</span></p>
                <p className='text-xl'>Benefits <br /> <span>{storedItem.benefits}</span></p>
                <p className='text-xl'>Responsibilities <br /> <span>{storedItem.responsibilities}</span></p>
                <p className='text-xl'>Requirements: {storedItem.requirements.map((item,index) => (
                    <li key={index}>{item}</li>
                ))}</p>
            </div>
        </section>
                    <hr className='md:hidden' />
        <section>
            <form className='text-left space-y-4 bg-slate-100/50 p-4' onSubmit={handleSubmit}>
                <div className='space-y-4 mb-4'>
                  <section className='grid grid-cols-2 gap-4'>
                  <input type="text" placeholder='Naam' className='w-full p-2 border-2 border-gray-400/20'  onChange={
                        (e) => setResume({...resume, name: e.target.value})
                    }/>

                    <input type="text" placeholder='Achternaam' className='w-full p-2 border-2 border-gray-400/20'  onChange={
                        (e) => setResume({...resume, lastName: e.target.value})
                    }/>

                        <input type="text" placeholder='Date of Birth' className='w-full p-2 border-2 border-gray-400/20'  onChange={
                        (e) => setResume({...resume, DateOfBirth: e.target.value})
                    }/>
                  </section>

                  <section className='grid grid-cols-2 gap-2'>
                  <input type="email" placeholder='Email' className='w-full p-2 border-2 border-gray-400/20' 
                    onChange={
                        (e) => setResume({...resume, email: e.target.value})
                    } />


                    <input type="Telefoonnummer" placeholder='Phone' className='w-full p-2 border-2 border-gray-400/20' 
                    onChange={
                        (e) => setResume({...resume, phone: e.target.value})
                    }/>
                  </section>

                   <section className='grid grid-cols-2 '>
                   <input type="text" placeholder='Adres' className='w-full p-2 border-2 border-gray-400/20'  onChange={
                        (e) => setResume({...resume, Adres: e.target.value})
                    }/>
                   </section>

                    <hr />
                    <section className='grid grid-cols-1 items-center gap-y-4'>
              
                    <label>
                    Beschik je over eigen vervoer?
                    <input type="text" placeholder=' Ja/Nee' className='w-full p-2 mt-2 border-2 border-gray-400/20'  onChange={
                        (e) => setResume({...resume, Question2: e.target.value})
                    }/>
                    </label>

                    <label>
                    Ben je tussen 3:00 s’morgen en 18:00 s’middags beschikaar?
                    <input type="text" placeholder='Ja/Nee' className='w-full p-2 mt-2 border-2 border-gray-400/20'  onChange={
                        (e) => setResume({...resume, Question3: e.target.value})
                    }/>
                    </label>

                    <label className='text-gray-600 '>
                    Wat is jouw laatstgenoten opleiding (Afgerond MBO is een vereiste)
                    <input type="text" placeholder='Vul hier aan' className='w-full  p-2 mt-2 border-2 border-gray-400/20'  onChange={
                        (e) => setResume({...resume, Question1: e.target.value})
                    }/>
                    </label>

                    <label>
                    Hoe heb je ons gevonden? (Facebook, Instagram, TikTok, Vrienden/Familie, Radio, TV, Billboard)
                    <input type="text" placeholder='Hoe heb je ons gevonden? (Facebook, Instagram, TikTok, Vrienden/Familie, Radio, TV, Billboard)' className='w-full p-2 mt-2 border-2 border-gray-400/20'  onChange={
                        (e) => setResume({...resume, Question4: e.target.value})
                    }/>
                    </label>

                    </section>
                

                        <section className='flex flex-col gap-2'>
                       <label>
                          Motivatie
                       <textarea minLength={5} placeholder='Motivatie' className='w-full p-2 border-2 border-gray-400/20 min-h-[150px]'  
                    onChange={
                        (e) => setResume({...resume, message: e.target.value})
                    }></textarea>
                       </label>

                    <label>
                    Geef hier een korte toelichting waarom jij bij ons wilt werken en wat voor ervaring je hebt.
                    <textarea minLength={5} placeholder='Geef hier een korte toelichting waarom jij bij ons wilt werken en wat voor ervaring je hebt.' className='w-full p-2 border-2 border-gray-400/20 min-h-[150px]'  
                    onChange={
                        (e) => setResume({...resume, message2: e.target.value})
                    }></textarea>
                    </label>
                    <hr />
                 <label>
                    Upload jouw CV
                    <input 
                    type="file"
                    accept=".pdf"
                    multiple={false}
                    onChange={(e) => setFile(e.target.files[0])}
                    />


                 </label>
                        </section>
                  

                    


                    <input type='hidden' onChange={(e) => setSecret('e.target.value')} />
             

                 
     
                  
                </div>
                <label className='flex gap-2'>
                <input type="checkbox"  onChange={
                        (e) => setAgree(!agree)
                }/> <span className='ml-2'>Accept terms and conditions</span>
                </label>
                <ReCAPTCHA sitekey={import.meta.env.VITE_GOOGLE_CAPTIA_KEY} onChange={handleCaptchaResponseChange} theme="dark" className=' ' />
          
                <button className='w-full p-2 bg-[#f9a826] text-white'>Apply</button>
            </form>

  
        </section>
        <Toaster />
    </div>
  )
}
