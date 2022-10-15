import React, { useEffect, useState } from 'react'


export const useActividad = (idUsuario = 0) => {
    const url = `https://localhost:44332/api/Usuario/actividades/${idUsuario}`;
    const [actividades, setactividades] = useState([]);

    useEffect(() => { getData(); }, [idUsuario]);

    const getData = () => {
        fetch(url,{mode: 'cors'}).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(({items, totalCount}) => {
            setactividades([...items]);  

        });
    };
    return{
        actividades
    };
}
