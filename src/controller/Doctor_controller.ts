import axios from 'axios';
import { DoctorModel } from '../models/Doctor_model';

// Configuración del cliente API
const apiClient = axios.create({
  baseURL: 'https://medicaapp.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

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

export async function eliminarDoctores(email: string): Promise<boolean> {
    try {
        await apiClient.delete('/doctors', { data: { email } });
        return true;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                console.log('No se encontró la cédula a eliminar');
            } else {
                console.log('Ocurrió un error al eliminar el paciente:', error.message);
            }
        } else {
            console.log('Error inesperado:', error);
        }
        return false;
    }
}

export async function obtenerDoctorPorId(_id: string): Promise<DoctorModel | null> {
    try {
        const response = await apiClient.get<DoctorModel>(`/doctors/${_id}`, {
            headers: {
                'Cache-Control': 'no-cache',
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error al obtener el doctor por ID:', error.message);
        } else {
            console.error('Error inesperado:', error);
        }
        return null;
    }
}

export const mesRegistroDoctores = async (): Promise<number[] | null> => {
    try {
        const { data, error } = await obtenerDoctores();
        if (error) {
            console.error('Error al obtener los doctores:', error);
            return null;
        }
        
        const mesRegistroArray = Array.from({ length: 12 }, () => 0);
        
        if (data) {
            data.forEach((doctor: DoctorModel) => {
                const fechaRegistro = new Date(doctor.Fecha_de_Registro);
                const mesRegistro = fechaRegistro.getMonth();
                mesRegistroArray[mesRegistro] += 1;
            });
        }
        return mesRegistroArray;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error al obtener los doctores:', error.message);
        } else {
            console.error('Error inesperado:', error);
        }
        return null;
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

export async function diagnostico(_id: string): Promise<boolean> {
    try {
        await apiClient.post(`/diagnosticado/${_id}`);
        return true;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404 || error.response?.status === 500) {
                console.log('Datos ya registrados en el sistema, no se puede repetir');
            } else {
                console.log('Ocurrió un error al registrar el diagnóstico:', error.message);
            }
        } else {
            console.log('Error inesperado:', error);
        }
        return false;
    }
}

export async function guardarReceta(_id: string): Promise<boolean> {
    try {
        await apiClient.get(`/receta/${_id}`);
        return true;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404 || error.response?.status === 500) {
                console.log('Datos ya registrados en el sistema, no se puede repetir');
            } else {
                console.log('Ocurrió un error al guardar la receta:', error.message);
            }
        } else {
            console.log('Error inesperado:', error);
        }
        return false;
    }
}
