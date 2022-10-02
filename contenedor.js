const fs = require("fs");

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }

    save = async(product)=>{
        try {
            
            if(fs.existsSync(this.nameFile)){
                const contenido = await fs.promises.readFile(this.nameFile);
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const lastIdAdded = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                    const newProduct={
                        id: lastIdAdded+1,
                        ...product
                    }
                    productos.push(newProduct);
                    await fs.promises.writeFile(this.nameFile, JSON.stringify(productos, null, 2))
                } else{
                   
                    const newProduct={
                        id:1,
                        ...product
                    }
                  
                    await fs.promises.writeFile(this.nameFile, JSON.stringify([newProduct], null, 2));
                }
            } else{
                
                const newProduct={
                    id:1,
                    ...product
                }
                await fs.promises.writeFile(this.nameFile, JSON.stringify([], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async(id)=>{
        try {
            if(fs.existsSync(this.nameFile)){
                const contenido = await fs.promises.readFile(this.nameFile,"utf8");
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.id===id);
                    return producto
                } else{
                    return "El archivo esta vacio"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async()=>{
        try {
            const contenido = await fs.promises.readFile(this.nameFile);
            const productos = JSON.parse(contenido);
            return productos
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try {
            const contenido = await fs.promises.readFile(this.nameFile);
            const productos = JSON.parse(contenido);
            const newProducts = productos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.nameFile, JSON.stringify(newProducts, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

    
}

const listaProductos = new Contenedor("./productos.txt")
const producto1 = {
    
   
}

const crearProducto = async()=>{
    await listaProductos.save(producto1);
    const resultadoId = await listaProductos.getById();
    console.log(resultadoId)
    const productos = await listaProductos.getAll();
    console.log(productos)
    await listaProductos.deleteById();
}

crearProducto();