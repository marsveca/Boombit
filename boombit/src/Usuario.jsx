import React, {useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Actividad } from './Actividad';
import { paises } from './paises';
import { usuarioDefault } from './usuarioDefault.js';






export const Usuario = () => {


    const setValue = (e) => {
        if(e.target.type === 'checkbox')
            setUsuario({...usuario, [e.target.name]: e.target.checked});    
        else
            setUsuario({...usuario, [e.target.name]: e.target.value});
    }


    const url = 'https://localhost:44332/api/Usuario';
    const [visible, setVisible] = useState(0);
    const [visibleActividad, setVisibleActividad] = useState(0);
    const [usuario, setUsuario] = useState({...usuarioDefault});
    const [usuarios, setUsuarios] = useState([]);
    useEffect(() => { getData(); }, [0]);
    const getData = () => {
        fetch(url,{mode: 'cors'}).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(({items, totalCount}) => {
            setUsuarios(items);  

        });
    };

    let array = [];
    const showDialogCrear = () => { setVisible(!visible) }
    const showDialogActividad = () => { setVisibleActividad(!visibleActividad) }
    const crearUsuario = (e) => { 
            e.preventDefault();

            let data = usuario;

            fetch(url, {
                method: usuario.id == 0 ? 'POST' : 'PUT', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
               getData();
               setUsuario({...usuarioDefault}); 
               showDialogCrear();
            });


    };

    const getActividad = (id) => {
            let data = usuarios.find((e) => e.id == id);

            setUsuario(data);
            showDialogActividad();
    }

    const editarUsuario = (id) => { 



        let data = usuarios.find((e) => e.id == id);

        setUsuario(data);
        showDialogCrear();
        


};


  return (
    <>
    <button className='btn btn-primary' onClick={ showDialogCrear }> Crear </button>
    <table>
        <thead>
            <tr>
            <th>
                Nombre
            </th>
            <th>
                Apellido
            </th>
            <th>
                Email
            </th>
            <th>
                Fecha Nacimiento
            </th>
            <th>
                Telefono
            </th>
            <th>
                Pais Residencia
            </th>
            <th>
                Contactar
            </th>
            <th>
            </th>
            </tr>
        </thead>
        <tbody>
            {
                usuarios.map(element => {
                    return <tr key={element.nombre}>
                        <td>{element.nombre}</td>
                        <td>{element.apellido}</td>
                        <td>{element.email}</td>
                        <td>{element.fechaNacimiento}</td>
                        <td>{element.telefono}</td>
                        <td>{element.paisResidencia}</td>
                        <td>{element.contactar ? 'SI' : 'NO'}</td>
                        <td><Button type='button' onClick={() => editarUsuario(element.id)} >Editar</Button>
                        <Button type='button' onClick={() => getActividad(element.id)} >Actividades</Button>
                        </td>
                    </tr>
                })
            }
        </tbody>
    </table>
    <dialog  className='mdl-dialog' open={ visibleActividad }> <Actividad idUsuario={usuario.id}></Actividad></dialog>
           
    <dialog open={ visible } className='mdl-dialog' >
    <Form onSubmit={crearUsuario}>
        <FormGroup>
          <Label for="nombre">Nombre</Label>
          <Input required name="nombre" id="nombre" placeholder="Nombre del Usuario" value={usuario.nombre} onChange={ e => setValue(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="apellido">Apellido</Label>
          <Input name="apellido" id="apellido" placeholder="Apellido del Usuario" value={usuario.apellido} onChange={ e => setValue(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="Correo electronico" value={usuario.email} onChange={ e => setValue(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="fechaNacimiento">Fecha Nacimiento</Label>
          <Input type="date" name="fechaNacimiento" id="fechaNacimiento" placeholder="Fecha Nacimiento" value={usuario.fechaNacimiento} onChange={ e => setValue(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="telefono">Telefono</Label>
          <Input name="telefono" type='number' id="telefono" placeholder="Telefono" value={usuario.telefono} onChange={ e => setValue(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="paisResidencia">Pais Residencia</Label>
          <Input type="select" name="paisResidencia" id="paisResidencia" value={usuario.paisResidencia} onChange={ e => setValue(e)}>
            {
                paises.map(e =>  <option key={e.text} value={e.id}>{e.text}</option>)
            }
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" name="contactar" value={usuario.contactar} onChange={ e => setValue(e)}/>{' '}
            Contactarme
          </Label>
        </FormGroup>
        <input type='submit'  value='Submit'></input>
        <Button type='button' onClick={showDialogCrear} >Cerrar</Button>
      </Form>
    </dialog>
    </>    

  )
}
