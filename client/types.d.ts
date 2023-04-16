export interface Post{
  _id: string
  _name: string
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
  handleChange?: (e: React.FormEvent) => void,
  isSurpriseMe?: boolean,
  handleSurpriseMe?: () => void
}