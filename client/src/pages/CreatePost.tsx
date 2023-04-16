import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField,Loader } from '../components'
import { IForm } from '../../types'


const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setform] = useState<IForm>({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setloading] = useState(false)

  return (
    <div>CreatePost</div>
  )
}

export default CreatePost