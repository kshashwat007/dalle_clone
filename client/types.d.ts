export interface Post{
  _id: string
  name: string,
  prompt: string
}

interface  IForm {
  name: string
  prompt: string
  photo: string
}

interface IFormField {
  labelName?: string,
  type?: string,
  name?: string,
  placeholder?: string,
  value?: string,
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isSurpriseMe?: boolean,
  handleSurpriseMe?: () => void
}