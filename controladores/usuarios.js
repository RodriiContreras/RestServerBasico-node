const {response} = require('express')


const usuariosGet = (req, res=response) =>{
    const parametros = req.query;
    res.json({
        msg:"get api",
        queryparams:parametros
    })
  }

  const usuariosPut = (req, res) =>{
      const id =req.params.id;
    res.json({
        msg:"put api",
        id:id
    })
}
 const usuariosPost=  (req, res) =>{
     const body= req.body;
    res.json({
        msg:"post api",
        body:body
    })
}

const usuariosDelete=  (req, res) =>{
    res.json({
        msg:"delete api"
    })
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}

