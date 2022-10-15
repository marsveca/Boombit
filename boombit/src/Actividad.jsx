import React, {useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useActividad } from './hooks/useActividad';

export const Actividad = ({idUsuario}) => {

    const { actividades } = useActividad(idUsuario);
     console.log(actividades)


  return (
    <>
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
                Usuario Id
            </th>
            <th>
                Fecha Creacion
            </th>
            <th>
                Actividad
            </th>
            </tr>
        </thead>
        <tbody>
            {
                actividades.map(element => {
                    return <tr key={element.id}>
                        <td>{element.nombre}</td>
                        <td>{element.apellido}</td>
                        <td>{element.idUsuario}</td>
                        <td>{element.fechaCreacion}</td>
                        <td>{element.actividad}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
    
    </>    

  )
}
