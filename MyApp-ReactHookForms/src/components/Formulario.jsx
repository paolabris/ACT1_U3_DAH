import { useForm } from "react-hook-form";
import { edadValidator } from "./validators";

const Formulario = () => {

    const { register, formState: { errors }, watch, handleSubmit } = useForm({
        defaultValues: {
            nombre: 'Paola',
            direccion: 'Francisco I. Madero'
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    const incluirTelefono = watch('incluirTelefono');

    return <div>
        <h2>MyApp Usuarios</h2>
        <p>Bienvenido(a) {watch('nombre')}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombre</label>
                <input type="text" {...register('nombre', {
                    required: true,
                    maxLength: 20
                })} />
                {errors.nombre?.type === 'required' && <p>El campo nombre es requerido</p>}
                {errors.nombre?.type === 'maxLength' && <p>El campo nombre debe tener menos de 20 caracteres</p>}
            </div>
            <div>
                <label>Dirección</label>
                <input type="text" {...register('direccion', {
                    required: true
                })} />
            </div>
            <div>
                <label>Email</label>
                <input type="text" {...register('email', {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                })} />
                {errors.email?.type === 'pattern' && <p>El formato del email es incorrecto</p>}
            </div>
            <div>
                <label>Edad</label>
                <input type="text" {...register('edad', {
                    validate: edadValidator
                })} />
                {errors.edad && <p>La edad debe estar entre 18 y 50 años</p>}
            </div>
            <div>
                <label>País</label>
                <select {...register('pais')}>
                    <option value="MEX">México</option>
                    <option value="USA">Estados Unidos</option>
                    <option value="CAN">Canada</option>
                </select>
            </div>
            <div>
                <label>¿Desea incluir teléfono?</label>
                <input type="checkbox" {...register('incluirTelefono')} />
            </div>
            {incluirTelefono && (
                <div>
                    <label>Teléfono</label>
                    <input type="text" {...register('telefono')} />
                </div>
            )}
            <input type="submit" value="Enviar" />
        </form>
    </div>
}

export default Formulario;