
interface FormDataProps {
    formData: any 
    setFormData: any
}
const CheckBox = ({formData, setFormData}:FormDataProps) => {
  return (
    <div className='flex'>
        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer`}>
                <span className='text-white'>Male</span>
                <input onChange={(e)=>setFormData({...formData, gender: e.target.id})} type="checkbox" name='male' id='male'
                checked={formData.gender === 'male'} className='w-[15px] border-green-900'/>
            </label>
        </div>

        <div className='form-control'>
            <label className={`label gap-2 cursor-pointer`}>
                <span className='text-white'>Female</span>
                <input onChange={(e)=>setFormData({...formData, gender: e.target.id})} type="checkbox" name="female" id='female'
                checked={formData.gender === 'female'} className='w-[15px] border-green-900'/>
            </label>
        </div>
    </div>
  )
}

export default CheckBox