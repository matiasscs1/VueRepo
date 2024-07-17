<template>
  <div id="app">
    <h1>Doctores</h1>
    <input v-model="criterio" @input="buscarDoctores" placeholder="Buscar doctor..." />
    <ul>
      <li v-for="doctor in doctoresFiltrados" :key="doctor._id">{{ doctor.nombre }}</li>
    </ul>
  </div>
</template>

<script>
import { obtenerDoctores } from './controller/Doctor_controller';

export default {
  name: 'App',
  data() {
    return {
      doctores: [],
      criterio: ''
    };
  },
  computed: {
    doctoresFiltrados() {
      if (!this.criterio) {
        return this.doctores;
      }
      const criterioLower = this.criterio.toLowerCase();
      return this.doctores.filter(doctor =>
        doctor.nombre.toLowerCase().includes(criterioLower) ||
        doctor.apellido.toLowerCase().includes(criterioLower) ||
        doctor.especialidad.toLowerCase().includes(criterioLower) ||
        doctor.ciudad.toLowerCase().includes(criterioLower)
      );
    }
  },
  async created() {
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
  methods: {
    buscarDoctores() {
      // Este método se llama cada vez que se cambia el criterio de búsqueda.
      // No es necesario hacer nada aquí ya que el filtro se maneja en la propiedad computada.
    }
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  width: 80%;
  max-width: 300px;
}
</style>
