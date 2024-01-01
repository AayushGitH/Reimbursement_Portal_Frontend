import React from 'react'
import './ButtonStyle.css'

const Button = (props) => {

    const name = props.name;
    const click = props.click;
    const type = props.type;
    const ml = props.ml;
    const mr = props.mr;
    const mt = props.mt;
    const mb = props.mb;
    const pl = props.pl;
    const pr = props.pr;
    const fs = props.fs;
    const fc = props.fc;
    const color = props.color;
    const disabled = props.disabled
    const ref = props.ref
    const active = props.active

  return (
    <button className='btn' disabled={disabled} style={{marginLeft:ml, marginRight:mr, fontSize:fs, color:fc, marginTop:mt, marginBottom:mb, backgroundColor:color , paddingLeft:pl , paddingRight:pr}} ref={ref} type={type} onClick={click}>{name}</button>
  )
}

export default Button