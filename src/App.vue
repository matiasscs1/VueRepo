<template>
  <div id="app">
    <h1>Doctores</h1>
    
    <!-- Campos de búsqueda -->
    <div class="search-filters">
      <input v-model="filtros.nombre" placeholder="Buscar por nombre" />
      <input v-model="filtros.apellido" placeholder="Buscar por apellido" />
      <input v-model="filtros.especialidad" placeholder="Buscar por especialidad" />
      <input v-model="filtros.ciudad" placeholder="Buscar por ciudad" />
      <button @click="resetFilters">Resetear filtros</button>
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Especialidad</th>
          <th>Ciudad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="doctor in doctoresFiltrados" :key="doctor._id">
          <td>{{ doctor.nombre }}</td>
          <td>{{ doctor.apellido }}</td>
          <td>{{ doctor.especialidad }}</td>
          <td>{{ doctor.ciudad }}</td>
          <td>
            <button @click="editarDoctor(doctor)">Editar</button>
            <button @click="eliminarDoctor(doctor._id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <form @submit.prevent="guardarDoctor">
      <h2>{{ doctorEditando ? 'Editar Doctor' : 'Agregar Doctor' }}</h2>
      <input v-model="doctor.nombre" placeholder="Nombre" required />
      <input v-model="doctor.apellido" placeholder="Apellido" required />
      <input v-model="doctor.especialidad" placeholder="Especialidad" required />
      <input v-model="doctor.telefono" placeholder="Teléfono" required />
      <input v-model="doctor.email" placeholder="Email" required />
      <input v-model="doctor.direccion_Consultorio" placeholder="Dirección Consultorio" required />
      <input v-model="doctor.ciudad" placeholder="Ciudad" required />
      <input v-model="doctor.nacimiento" type="date" placeholder="Fecha de Nacimiento" required />
      <input v-model="doctor.genero" placeholder="Género" required />
      <input v-model="doctor.password" type="password" placeholder="Contraseña" required />
      <input v-model="doctor.Número_de_matriculaMedica" placeholder="Número de Matrícula Médica" required />
      <button type="submit">{{ doctorEditando ? 'Actualizar' : 'Agregar' }}</button>
      <button type="button" @click="cancelarEdicion">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { obtenerDoctores, eliminarDoctores, actualizarDoctor, crearDoctor } from './controller/Doctor_controller';

export default {
  name: 'App',
  data() {
    return {
      doctores: [],
      doctor: {
        nombre: '',
        apellido: '',
        especialidad: '',
        telefono: '',
        email: '',
        direccion_Consultorio: '',
        ciudad: '',
        nacimiento: '',
        genero: '',
        password: '',
        Número_de_matriculaMedica: ''
      },
      doctorEditando: null,
      filtros: {
        nombre: '',
        apellido: '',
        especialidad: '',
        ciudad: ''
      }
    };
  },
  computed: {
    doctoresFiltrados() {
      return this.doctores.filter(doctor => {
        const filtroNombre = this.filtros.nombre.toLowerCase();
        const filtroApellido = this.filtros.apellido.toLowerCase();
        const filtroEspecialidad = this.filtros.especialidad.toLowerCase();
        const filtroCiudad = this.filtros.ciudad.toLowerCase();

        const nombreMatch = doctor.nombre ? doctor.nombre.toLowerCase().includes(filtroNombre) : false;
        const apellidoMatch = doctor.apellido ? doctor.apellido.toLowerCase().includes(filtroApellido) : false;
        const especialidadMatch = doctor.especialidad ? doctor.especialidad.toLowerCase().includes(filtroEspecialidad) : false;
        const ciudadMatch = doctor.ciudad ? doctor.ciudad.toLowerCase().includes(filtroCiudad) : false;

        return nombreMatch && apellidoMatch && especialidadMatch && ciudadMatch;
      });
    }
  },
  async created() {
    await this.cargarDoctores();
  },
  methods: {
    async cargarDoctores() {
      try {
        const { data, error } = await obtenerDoctores();
        if (error) {
          console.error('Error al obtener los doctores:', error);
        } else if (data) {
          this.doctores = data;
        }
      } catch (error) {
        console.error('Error en la llamada a obtenerDoctores:', error);
      }
    },
    async eliminarDoctor(id) {
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar este doctor?');
      if (confirmacion) {
        const resultado = await eliminarDoctores(id);
        if (resultado) {
          this.doctores = this.doctores.filter(doc => doc._id !== id);
        }
      }
    },
    editarDoctor(doctor) {
      this.doctorEditando = doctor._id;
      this.doctor = { ...doctor };
    },
    cancelarEdicion() {
      this.doctorEditando = null;
      this.doctor = {
        nombre: '',
        apellido: '',
        especialidad: '',
        telefono: '',
        email: '',
        direccion_Consultorio: '',
        ciudad: '',
        nacimiento: '',
        genero: '',
        password: '',
        Número_de_matriculaMedica: ''
      };
    },
    async guardarDoctor() {
      const doctorData = {
        nombre: this.doctor.nombre,
        apellido: this.doctor.apellido,
        especialidad: this.doctor.especialidad,
        telefono: this.doctor.telefono,
        email: this.doctor.email,
        direccion_Consultorio: this.doctor.direccion_Consultorio,
        ciudad: this.doctor.ciudad,
        nacimiento: this.doctor.nacimiento,
        genero: this.doctor.genero,
        password: this.doctor.password,
        Número_de_matriculaMedica: this.doctor.Número_de_matriculaMedica
      };

      if (this.doctorEditando) {
        const resultado = await actualizarDoctor(doctorData, this.doctorEditando);
        if (resultado) {
          const index = this.doctores.findIndex(doc => doc._id === this.doctorEditando);
          this.doctores.splice(index, 1, { ...this.doctor, _id: this.doctorEditando });
          this.cancelarEdicion();
        }
      } else {
        const { data, error } = await crearDoctor(doctorData);
        if (data) {
          this.doctores.push(data);
          this.cancelarEdicion();
        } else if (error) {
          console.error('Error al crear el doctor:', error);
        }
      }
    },
    resetFilters() {
      this.filtros = {
        nombre: '',
        apellido: '',
        especialidad: '',
        ciudad: ''
      };
    }
  }
};
</script>

<style scoped>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
}

input, button {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input {
  width: calc(100% - 22px);
  max-width: 300px;
  margin: 0 auto 10px auto;
  display: block;
}

button {
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #4CAF50;
  color: white;
}

td {
  background-color: #f9f9f9;
}

td button {
  padding: 6px 12px;
  font-size: 14px;
}

td button.edit {
  background-color: #2196F3;
}

td button.edit:hover {
  background-color: #0b7dda;
}

td button.delete {
  background-color: #f44336;
}

td button.delete:hover {
  background-color: #da190b;
}

form {
  margin-top: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

form h2 {
  margin-bottom: 20px;
  color: #333;
}

form button {
  width: calc(50% - 12px);
  margin: 5px;
}

.search-filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-filters input {
  width: 200px;
}
</style>
