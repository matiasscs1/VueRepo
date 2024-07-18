import axios from 'axios';
import { DoctorModel } from '../models/Doctor_model';

// Configuración del cliente API
const apiClient = axios.create({
  baseURL: 'https://medicaapp.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// crear doctores

// Crear doctor
export const crearDoctor = async (doctor: DoctorModel): Promise<{ data: DoctorModel | null; error: string | null }> => {
    try {
        const response = await apiClient.post<DoctorModel>('/doctors', doctor);
        return { data: response.data, error: null };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error al crear el doctor:', error.message);
            return { data: null, error: 'Hubo un error al crear el doctor.' };
        } else {
            console.error('Error inesperado:', error);
            return { data: null, error: 'Hubo un error inesperado.' };
        }
    }
};




export const obtenerDoctores = async (): Promise<{ data: DoctorModel[] | null; error: string | null }> => {
    try {
        const response = await apiClient.get<DoctorModel[]>('/doctors');
        console.log('Doctores:', response.data);
        return { data: response.data, error: null };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error al obtener los doctores:', error.message);
            return { data: null, error: 'Hubo un error al obtener los doctores.' };
        } else {
            console.error('Error inesperado:', error);
            return { data: null, error: 'Hubo un error inesperado.' };
        }
    }
};

// Eliminar doctores por ID
export async function eliminarDoctores(_id: string): Promise<boolean> {
    try {
        const response = await apiClient.delete(`/doctors/${_id}`);
        if (response.status === 200) {
            console.log('Usuario eliminado correctamente');
            return true;
        }
        return false;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                console.log('Usuario no encontrado');
            } else {
                console.log('Ocurrió un error al eliminar el usuario:', error.message);
            }
        } else {
            console.log('Error inesperado:', error);
        }
        return false;
    }
}





export async function actualizarDoctor(doctor: DoctorModel, _id: string): Promise<boolean> {
    try {
        await apiClient.put(`/doctors/${_id}`, doctor);
        return true;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404 || error.response?.status === 500) {
                console.log('Datos ya registrados en el sistema, no se puede repetir');
            } else {
                console.log('Ocurrió un error al actualizar el paciente:', error.message);
            }
        } else {
            console.log('Error inesperado:', error);
        }
        return false;
    }
}


