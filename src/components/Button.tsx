// importação dos atributos do botão do HTML -> tipagem importada do react
import { ButtonHTMLAttributes } from "react"
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {

    return (
    <button className='button' {...props}></button>
  )
}
